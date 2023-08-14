import React, { useState } from 'react';
import './UserPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import defaultUserPhoto from './user-photo.png';

const UserPage = () => {
  const [username, setUsername] = useState("Example Name");
  const [email, setEmail] = useState("@example.com");
  const [points, setPoints] = useState(100);
  const [userPhoto, setUserPhoto] = useState(null);
  const [editingInfo, setEditingInfo] = useState(false);

  const capitalizeWords = (string) => {
    return string
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

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
        setUserPhoto(e.target.result);
      };
      reader.readAsDataURL(selectedPhoto);
    }
  };

  const shopItems = [
    { name: 'Item 1', cost: 50 },
    { name: 'Item 2', cost: 75 },
    { name: 'Item 3', cost: 100 },
  ];

  return (
    <div className="user-container">
      <h1 className="user">Welcome to your Passport, {capitalizeWords(username)}!</h1>
      <div className="row">
        <div className="col-md-6 edit-section">
          <h2>Profile Photo</h2>
          <div className="profile-photo">
            <img src={userPhoto || defaultUserPhoto} alt="User" />
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </div>
        </div>
        <div className="col-md-6 info-section">
            {editingInfo ? (
              <div className="edit-info">
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <button onClick={() => setEditingInfo(false)}>Save Changes</button>
              </div>
            ) : (
              <div className="display-info">
                <h2>User Information</h2>
                <p className='username'>Username: {capitalizeWords(username)}</p>
                <p className='email'>Email: {email}</p>
                <button onClick={() => setEditingInfo(true)}>Edit Info</button>
              </div>
            )}
        </div>
      </div>
      <div className="shop-section">
        <h3 className='rewards'>Rewards</h3>
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
  );
};

export default UserPage;
