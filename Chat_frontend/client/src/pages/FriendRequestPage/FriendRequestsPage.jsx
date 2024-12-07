// src/pages/FriendRequestsPage.jsx
import React from 'react';
import NavIcons from '../../components/NavIcons/NavIcons';  // Import NavIcons
import FriendRequestsList from '../../components/FriendRequest/FriendRequestsList';

const FriendRequestsPage = () => {
  return (
    <div className="friend-requests-page">
      {/* Add NavIcons here and position it to the right */}
      <div style={{
        position: 'absolute',
        right: '0',
        top: '1rem',  // Adjust top to control vertical position
        width: '20rem',
      }}>
        <NavIcons />
      </div>

      <h1>Friend Requests</h1>
      <FriendRequestsList />
    </div>
  );
};

export default FriendRequestsPage;
