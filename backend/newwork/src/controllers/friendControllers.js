// controllers/friendRequestController.js
const UserModel = require("../models/userModel");

// Controller to return the count of pending friend requests
const getPendingFriendRequestsCount = async (req, res) => {
//  console.log(req);
  try {
    const userId = req._id; // Assuming you have user ID in req.user from authentication middleware
    const user = await UserModel.findById(userId).select("friendRequests");
    // console.log(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const pendingRequestsCount = user.friendRequests.filter(
      (request) => request.status === "pending"
    ).length;
      // console.log(pendingRequestsCount);
    res.status(200).json({ count: pendingRequestsCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to return the data of pending friend requests along with user images
const getPendingFriendRequestsData = async (req, res) => {
  // console.log(req);
  try {
    const userId = req._id; // Assuming you have user ID in req.user from authentication middleware
    const user = await UserModel.findById(userId).populate("friendRequests.sender", "username profilePicture");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const pendingRequests = user.friendRequests.filter(
      (request) => request.status === "pending"
    );

    res.status(200).json(pendingRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPendingFriendRequestsCount,
  getPendingFriendRequestsData,
};
