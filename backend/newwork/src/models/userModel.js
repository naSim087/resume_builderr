const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    livesIn: String,
    worksAt: String,
    relationship: String,
    country: String,
    passoutDate: {
      type: Date, // Adding passout date
      required: true, // Make it mandatory if necessary
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId], // Store references to other users
      ref: "Users",
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId], // Store references to other users
      ref: "Users",
    },
    friendRequests: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"], // Status of the friend request
          default: "pending",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// Virtual field to get the count of pending friend requests
UserSchema.virtual("friendRequestsCount").get(function () {
  return this.friendRequests.filter(
    (request) => request.status === "pending"
  ).length;
});

// Method to handle acceptance/rejection of friend requests
UserSchema.methods.updateFriendRequestStatus = function (requestId, newStatus) {
  return this.updateOne(
    { "friendRequests._id": requestId },
    {
      $set: { "friendRequests.$.status": newStatus },
    }
  ).then(() => {
    // Remove the friend request if it is accepted or rejected
    if (newStatus === "accepted" || newStatus === "rejected") {
      this.friendRequests = this.friendRequests.filter(
        (request) => request._id.toString() !== requestId.toString()
      );
      return this.save();
    }
  });
};

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
