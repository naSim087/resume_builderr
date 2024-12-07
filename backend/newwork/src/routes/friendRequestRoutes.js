const express = require("express");
const { getPendingFriendRequestsCount, getPendingFriendRequestsData } = require("../controllers/friendControllers");
// const { protect } = require("../middleware/authMiddleware"); // Assuming you have an auth middleware for authentication
const authenticate = require('../Middleware/authMiddleware');
const router = express.Router();

// Route to get the count of pending friend requests
router.post("/friend-requests/count",authenticate,
  
 getPendingFriendRequestsCount);

// Route to get the data of pending friend requests along with user images
router.post("/friend-requests/data",authenticate,getPendingFriendRequestsData);

module.exports = router;