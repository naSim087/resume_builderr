import React from "react";
import axios from "axios";
import API from "../../api/CountRequest"
import getUser from "../../api/UserRequests"
const FriendRequest = ({ request, userId }) => {
  
  const handleAccept = async () => {
    try {
      console.log(request,userId);

      const response = await API.put(
        `/${request.sender._id}/accept/${request._id}`
      );
      console.log(response.data.message); // Display success message
      alert("Friend request accepted!");
    } catch (error) {
      console.error(error.response?.data?.message || "An error occurred");
      alert("Failed to accept friend request.");
    }
  };

  const handleIgnore = async () => {
    try {
      const response = await API.delete(
        `/${request.sender._id}/ignore/${request._id}`
      );
      console.log(response.data.message); // Display success message
      alert("Friend request ignored!");
    } catch (error) {
      console.error(error.response?.data?.message || "An error occurred");
      alert("Failed to ignore friend request.");
    }
  };

  return (
    <div className="friend-request">
      <img
        src={`${process.env.REACT_APP_PUBLIC_FOLDER}${request.sender.profilePicture}`}
        alt={`${request.sender.username}'s profile`}
      />
      <div className="friend-request-info">
        <h3>{request.sender.username}</h3>
        <p>{request.sender.email}</p>
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleIgnore}>Ignore</button>
      </div>
    </div>
  );
};

export default FriendRequest;
