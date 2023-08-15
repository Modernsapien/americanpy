import React, { useState } from 'react';
import './UserPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import defaultUserPhoto from './user-photo.png';
import waves from './waves.png';

const UserPage = () => {
  const [username, setUsername] = useState("Example Name");
  const [email, setEmail] = useState("@example.com");
  const [points, setPoints] = useState(100);
  const [userPhoto, setUserPhoto] = useState(null);
  const [editingInfo, setEditingInfo] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState([]);

  const capitaliseWords = (string) => {
    return string
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const confirmPurchase = (item) => {
    const confirmed = window.confirm(`Are you sure you want to purchase this item for ${item.cost} points?`);
    if (confirmed) {
      if (points >= item.cost) {
        setPoints(points - item.cost);
        setPurchasedItems([...purchasedItems, { name: item.name }]);
        alert('Purchase successful!');
      } else {
        alert('Insufficient points');
      }
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
    { name: 'Hat', cost: 50 },
    { name: 'Socks', cost: 75 },
    { name: 'Jacket', cost: 100 },
  ];

  return (
    <div className="user-page">
    <div className="background-user" data-testid="user_background">
      <img className='waves' src={waves} alt="Waves" />
    </div>
      <h1 className="user" data-testid="user_title">Welcome to your Passport, {capitaliseWords(username)}!</h1>
      <div className="row">
        <div className="col-md-6 edit-section">
          <h2 data-testid="user_photo_title">Profile Photo</h2>
          <div className="profile-photo">
            <img src={userPhoto || defaultUserPhoto} alt="User" data-testid="user_photo"/>
            <input data-testid="user_photo_input" className='file' type="file" accept="image/*" onChange={handlePhotoChange} />
          </div>
        </div>
        <div className="col-md-6 info-section">
            {editingInfo ? (
              <div className="edit-info">
                <input data-testid="username_input" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input data-testid="email_input" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <button data-testid="edit_button" onClick={() => setEditingInfo(false)}>Save Changes</button>
              </div>
            ) : (
              <div className="display-info">
                <h2 data-testid="user_info_title">User Information</h2>
                <p data-testid="username" className='username'>Username: {capitaliseWords(username)}</p>
                <p data-testid="email" className='email'>Email: {email}</p>
                <button data-testid="info_button" onClick={() => setEditingInfo(true)}>Edit Info</button>
              </div>
            )}
        </div>
      </div>
      <div className="shop-section">
        <h3 data-testid="rewards_title" className='rewards'>Rewards</h3>
        <p data-testid="points_available" className='points'>Points available: {points}</p>
        <div data-testid="shop_items" className="shop-items-grid">
          {shopItems.map((item, index) => (
            <div key={index} className='shop-item'>
              <h4 data-testid={`${item.name}_title`}>{item.name}</h4>
              <p data-testid={`${item.name}_cost`}>Cost: {item.cost} points</p>
              <button data-testid={`${item.name}_button`} className='purchase' onClick={() => confirmPurchase(item)}>Purchase</button>
            </div>
          ))}
        </div>
        <div className="purchased-rewards">
        <h3 className='purchased-item' data-testid="purchased_title">Purchased Items</h3>
        {purchasedItems.length > 0 ? (
          <ul>
            {purchasedItems.map((item, index) => (
              <li data-testid={`${item.name}_purchased`} key={index}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p data-testid="no_purchases" >No items purchased</p>
        )}
      </div>
        </div>
      </div>
  );
};

export default UserPage;
