 import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { sendConnectionRequest, cancelConnectionRequest } from "../../actions/ChangeAction";

const User = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  // States to track following and connection status
  const [isFollowing, setIsFollowing] = useState(
    person.followers.includes(user._id)
  );
  const [isConnected, setIsConnected] = useState(
    person.friendRequests.some((request) => request.sender === user._id)
  );

  // Handle Follow/Unfollow
  const handleFollowToggle = () => {
    if (isFollowing) {
      dispatch(unfollowUser(person._id, user));
    } else {
      dispatch(followUser(person._id, user));
    }
    setIsFollowing((prevState) => !prevState);
  };

  // Handle Connect/Disconnect
  const handleConnectionToggle = () => {
    if (isConnected) {
      dispatch(cancelConnectionRequest(person._id, user));
    } else {
      dispatch(sendConnectionRequest(person._id, user));
    }
    setIsConnected((prevState) => !prevState);
  };

  return (
    <div className="follower">
      <div className="follower-content">
        <img
          src={
            person.profilePicture
              ? publicFolder + person.profilePicture
              : publicFolder + "defaultProfile.png"
          }
          alt={`${person.firstname}'s profile`}
          className="followerImage"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <div className="button-group">
        <button
          className={
            isFollowing ? "button fc-button UnfollowButton" : "button fc-button"
          }
          onClick={handleFollowToggle}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
        <button
          className={
            isConnected
              ? "button fc-button UnfollowButton"
              : "button fc-button"
          }
          onClick={handleConnectionToggle}
        >
          {isConnected ? "Disconnect" : "Connect"}
        </button>
      </div>
    </div>
  );
};

export default User;
