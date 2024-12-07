const PostModel = require("../models/postModel.js");
const UserModel = require("../models/userModel.js");
const mongoose = require("mongoose");

// creating a post
const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a post
const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post
const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated!");
    } else {
      res.status(403).json("Authentication failed");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete a post
const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted.");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked");
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get timeline posts
// const getTimelinePosts = async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const currentUserPosts = await PostModel.find({ userId: userId });

//     const followingPosts = await UserModel.aggregate([
//       { 
//         $match: {
//           _id: new mongoose.Types.ObjectId(userId),
//         },
//       },
//       {
//         $lookup: {
//           from: "posts",
//           localField: "following",
//           foreignField: "userId",
//           as: "followingPosts",
//         },
//       },
//       {
//         $project: {
//           followingPosts: 1,
//           _id: 0,
//         },
//       },
//     ]);

//     res.status(200).json(
//       currentUserPosts
//         .concat(...followingPosts[0].followingPosts)
//         .sort((a, b) => {
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         })
//     );
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
// import PostModel from "../models/PostModel.js";  // Assuming your Post model is imported
// import UserModel from "../models/UserModel.js";  // Assuming your User model is imported

const getTimelinePosts = async (req, res) => {
  try {
    const userId = req.params.id;  // The current user's ID from params
    const user = await UserModel.findById(userId);  // Get the current user's data

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get all the following user IDs (extract _id from the following array)
    const followingUsers = user.following.map((follow) => follow._id);

    // Query posts from users in the following list, including the current user's posts
    const posts = await PostModel.find({
      userId: { $in: [userId, ...followingUsers] }, // Get posts from the current user and users they follow
    }).sort({ createdAt: -1 }); // Sorting posts by creation date (latest first)

    // Send the posts as response
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getTimelinePosts:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};


module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  getTimelinePosts,
};
