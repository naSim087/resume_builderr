import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProfileCard.css";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(serverPublic);
  // Default image URLs
  const defaultCover = serverPublic + "defaultCover.jpg";
  const defaultProfile = serverPublic + "defaultProfile.png";

  // Cover and Profile images
  const coverImage = user.coverPicture ? serverPublic + user.coverPicture : defaultCover;
  const profileImage = user.profilePicture ? serverPublic + user.profilePicture : defaultProfile;
  console.log(coverImage);
  console.log(profileImage);
  // Number of posts
  // const userPosts = posts.filter((post) => post.userId === user._id).length;
  const userPosts = null;
  return (
    <div className="ProfileCard">
      {/* Profile Images Section */}
      <div className="ProfileImages">
        <img src={coverImage} alt="CoverImage" />
        <img src={profileImage} alt="ProfileImage" />
      </div>

      {/* Profile Name and Work Section */}
      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt || 'Write about yourself'}</span>
      </div>

      {/* Follow Status Section */}
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>

          {/* Posts count (only for profilePage) */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{userPosts}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {/* Link to Profile (only if not on profile page) */}
      {location !== "profilePage" && (
        <span>
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
