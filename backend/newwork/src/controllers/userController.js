
const UserModel = require("../models/userModel.js");
const ChatModel = require("../models/chatModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get a User
const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all Users
const getAllUsers = async (req, res) => {
  try {
    // Calculate the date 4 years ago from today
    const fourYearsAgo = new Date();
    fourYearsAgo.setFullYear(fourYearsAgo.getFullYear() - 1);

    // Find users whose passoutDate is greater than or equal to 4 years ago
    let users = await UserModel.find({
      passoutDate: { $lte: fourYearsAgo }
    });

    // Exclude the password field from the result
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};



// Update a User
const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, password } = req.body;

  if (id === _id || req.user.id === id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.SECRETKEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! You can update only your own account.");
  }
};

// Delete a User
const deleteUser = async (req, res) => {
  const id = req.params.id;

  if (req.user.id === id || req.user.isAdmin) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User Deleted Successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied!");
  }
};

// Follow a User with Chat Creation
const followUser = async (req, res) => {
  const id = req.params.id; // ID of the user to follow
  const { _id } = req.body; // ID of the current user

  if (_id === id) {
    return res.status(403).json("Action Forbidden");
  }

  try {
   
    const followUser = await UserModel.findById(id);
    const followingUser = await UserModel.findById(_id);

    if (!followUser || !followingUser) {
      return res.status(404).json("User not found");
    }

    // Check if the current user is already following the target user
    if (!followUser.followers.includes(_id)) {
      // Update followers and following lists
      await followUser.updateOne({ $addToSet: { followers: _id } });
      await followingUser.updateOne({ $addToSet: { following: id } });
        // console.log("hi");
      // Check if mutual follow exists
      const isMutualFollow =
        followUser.followers.includes(_id) &&
        followingUser.followers.includes(id);
        // console.log(isMutualFollow);
      if (1) {
        // Check if a chat already exists between the users
        const existingChat = await ChatModel.findOne({
          members: { $all: [_id, id] },
        });

        if (!existingChat) {
          // Create a new chat if it doesn't exist
          const newChat = new ChatModel({
            members: [_id, id],
          });

          const savedChat = await newChat.save();
          console.log("New chat created:", savedChat);
        }
      }

      return res.status(200).json("User followed!");
    } else {
      return res.status(403).json("You are already following this user.");
    }
  } catch (error) {
    console.error("Error in followUser:", error);
    res.status(500).json(error);
  }
};


// Unfollow a User
const unfollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    return res.status(403).json("Action Forbidden");
  }

  try {
    const unFollowUser = await UserModel.findById(id);
    const unFollowingUser = await UserModel.findById(_id);

    if (unFollowUser.followers.includes(_id)) {
      await unFollowUser.updateOne({ $pull: { followers: _id } });
      await unFollowingUser.updateOne({ $pull: { following: id } });
      res.status(200).json("Unfollowed Successfully!");
    } else {
      res.status(403).json("You are not following this user.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getUser, getAllUsers, updateUser, unfollowUser, followUser, deleteUser };
