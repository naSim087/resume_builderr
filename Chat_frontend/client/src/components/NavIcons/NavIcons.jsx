import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UilSetting } from "@iconscout/react-unicons";
import API from "../../api/CountRequest"
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import axios from "axios";

const NavIcons = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Fetch notification count from the backend
    const fetchNotifications = async () => {
      try {
        const response = await API.post("http://localhost:3003/api/friend-requests/count"); // Replace with your actual API endpoint
        setNotificationCount(response.data.count); // Assuming the response contains the count
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    // Optional: Poll for new notifications every 10 seconds
    const interval = setInterval(fetchNotifications, 100000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="navIcons">
      {/* Home link */}
      <Link to="../home">
        <img src={Home} alt="Home" />
      </Link>

      {/* Settings icon */}
      <UilSetting />

      {/* Notifications link with count */}
      <Link to="../friend-requests">
        <div className="notification-icon">
          <img src={Noti} alt="Notifications" className="nav-icon"/>
          {notificationCount > 0 && (
            <div className="notification-count">{notificationCount}</div>
          )}
        </div>
      </Link>

      {/* Chat link */}
      <Link to="../chat">
        <img src={Comment} alt="Chat" />
      </Link>
    </div>
  );
};

export default NavIcons;
