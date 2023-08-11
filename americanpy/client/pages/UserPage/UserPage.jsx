import React, { useState } from 'react';
import './UserPage.css';

const UserPage = () => {
  const username = "example name";
  const email = "@example.com";
  const [points, setPoints] = useState(100);

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

  const shopItems = [
    { name: 'Item 1', cost: 50 },
    { name: 'Item 2', cost: 75 },
    { name: 'Item 3', cost: 100},
    // Add more items here
  ];

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
          <div className="shop-items">
            <h3 className='rewards'>Rewards </h3>
            <p className='points'>Points available: {points}</p>
            <div className="shop-items-grid">
              {shopItems.map((item, index) => (
                <div key={index} className='shop-item'>
                  <h4>{item.name}</h4>
                  <p>Cost: {item.cost} points</p>
                  <button className='purchase' onClick={() => handlePurchase(item.cost)}>Purchase</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserPage;
