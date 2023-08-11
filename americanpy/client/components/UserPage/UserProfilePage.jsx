import React, { useState } from 'react';
import './UserPage.css';

const UserPage = () => {
  const username = "example name";
  const email = "@example.com";
  const [points, setPoints] = useState(100); // Example initial points

  const handlePurchase = (cost) => {
    if (points >= cost) {
      setPoints(points - cost);
      alert('Purchase successful!');
    } else {
      alert('Insufficient points');
    }
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    if (selectedPhoto) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Handle the loaded photo data if needed
      };
      reader.readAsDataURL(selectedPhoto);
    }
  };

  return (
    <div className="user-container">
      <h1 className="user">Welcome to your user page, {username}!</h1>
      <div className="user-info">
        <div className="user-photo">
          {/* Add your user photo rendering logic here */}
          {/* <img src={userPhoto} alt="User" /> */}
          {/* <input type="file" accept="image/*" onChange={handlePhotoChange} /> */}
        </div>
        <div className="user-details">
          <h1>User Information</h1>
          <p className='username'>Username: {username}</p>
          <p className='email'>Email: {email}</p>
          <div>
            <h3>Mini Shop / Rewards</h3>
            <div>
              <div>
                <h4>Item 1</h4>
                <p>Cost: 50 points</p>
                <button onClick={() => handlePurchase(50)}>Purchase</button>
              </div>
              <div>
                <h4>Item 2</h4>
                <p>Cost: 75 points</p>
                <button onClick={() => handlePurchase(75)}>Purchase</button>
              </div>
              {/* Add more items here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
