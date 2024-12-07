const UserModel = require("../models/userModel");
const chatModel = require("../models/chatModel");
// Send a connection request
const sendConnectionRequest = async (req, res) => {
  try {
    const { id } = req.params; // Target user ID
    const { currentUser } = req.body; // Current user's information

    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if a request already exists
    const existingRequest = user.friendRequests.find(
      (request) => request.sender.toString() === currentUser._id
    );
    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "Connection request already sent" });
    }

    // Add new connection request
    user.friendRequests.push({
      sender: currentUser._id,
      status: "pending",
    });

    await user.save();
    res.status(200).json({ message: "Connection request sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel a connection request
const cancelConnectionRequest = async (req, res) => {
  try {
    const { id } = req.params; // Target user ID
    const { currentUser } = req.body; // Current user's information

    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Remove the connection request
    user.friendRequests = user.friendRequests.filter(
      (request) => request.sender.toString() !== currentUser._id
    );

    await user.save();
    res.status(200).json({ message: "Connection request canceled" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const initializeChat = async (userId1, userId2) => {
  try {
    // Check if a chat already exists between the users
    const existingChat = await chatModel.findOne({
      members: { $all: [userId1, userId2] },
    });

    if (!existingChat) {
      // Create a new chat if it doesn't exist
      const newChat = new chatModel({
        members: [userId1, userId2],
      });

      const savedChat = await newChat.save();
      console.log("New chat created:", savedChat);
    }
  } catch (error) {
    console.error("Error in initializeChat:", error);
    throw error; // Rethrow error to handle it in the calling function
  }
};
// Accept a friend request
const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params; 
    const userId = req._id; 

    
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    
    const friendRequest = user.friendRequests.find(
      (request) => request._id.toString() === requestId
    );
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    
    if (friendRequest.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Friend request already processed" });
    }

    
    friendRequest.status = "accepted";

   
    const sender = await UserModel.findById(friendRequest.sender);
    if (!sender) return res.status(404).json({ message: "Sender not found" });

    
    user.followers.push(sender._id);
    user.following.push(sender._id);
    sender.following.push(user._id);
    sender.followers.push(user._id);
    
    initializeChat(sender._id,user._id);
    
    await user.save();
    await sender.save();


    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const ignoreFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params; 

    
    const user = await UserModel.findById(req._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    
    const friendRequest = user.friendRequests.find(
      (request) => request._id.toString() === requestId
    );
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    
    if (friendRequest.status === "pending") {
      friendRequest.status = "rejected";
      await user.save();
      return res.status(200).json({ message: "Friend request marked as rejected" });
    } else {
      return res
        .status(400)
        .json({ message: "Friend request has already been processed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  sendConnectionRequest,
  cancelConnectionRequest,
  acceptFriendRequest,
  ignoreFriendRequest
};
