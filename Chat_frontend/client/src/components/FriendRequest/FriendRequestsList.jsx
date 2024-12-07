// src/components/FriendRequestsList.jsx
import React, { useEffect, useState } from 'react';
import API from '../../api/CountRequest';  // Import custom axios instance
import FriendRequest from './FriendRequest';  // Assuming you have a FriendRequest component
import './FriendRequestsList.css';  // Your CSS file

const FriendRequestsList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch friend requests from the API with the correct token in the headers
    API.post('/friend-requests/data')  // Adjust endpoint as needed
      .then(response => {
        console.log(response.data);
        setRequests(response.data);  // Assuming response.data contains an array of requests
      })
      .catch(error => {
        console.error('Error fetching friend requests:', error);
      });
  }, []);

  return (
    <div className="friend-requests-list">
      {requests.length > 0 ? (
        requests.map((request) => (
          <FriendRequest key={request._id} request={request} />
        ))
      ) : (
        <p>No pending friend requests</p>  // In case there are no requests
      )}
    </div>
  );
};

export default FriendRequestsList;
