import React, { useEffect, useState } from 'react';
import './UserPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import defaultUserPhoto from './user-photo.png';
import waves from './waves.png';
import { usePoints } from '../../components/MemoriesComponents/PointsContext';

const UserPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);
  const [editingInfo, setEditingInfo] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const { points, setPoints } = usePoints();


useEffect(() => {
  const fetchedUserInfo = {
    username: '',
    email: ''
  };

  setUsername(fetchedUserInfo.username);
  setEmail(fetchedUserInfo.email);
}, []);


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
    { name: 'Plant a tree', cost: 50 },
    { name: 'Plant 10 trees', cost: 75 },
    { name: '10% off zero carbon travel', cost: 100 },
  ];

  return (
    <div className="user-page">
    <div className="background-user">
      <img className='waves' src={waves} alt="Waves" />
    </div>
      <h1 className="user">Welcome to your Passport, {capitaliseWords(username)}!</h1>
      <div className="row">
        <div className="col-md-6 edit-section">
          <h2>Profile Photo</h2>
          <div className="profile-photo">
            <img src={userPhoto || defaultUserPhoto} alt="User" />
            <input className='file' type="file" accept="image/*" onChange={handlePhotoChange} />
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
                <p className='username'>Username: {capitaliseWords(username)}</p>
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
              <button className='purchase' onClick={() => confirmPurchase(item)}>Purchase</button>
            </div>
          ))}
        </div>
        <div className="purchased-rewards">
        <h3 className='purchased-item'>Purchased Items</h3>
        {purchasedItems.length > 0 ? (
          <ul>
            {purchasedItems.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p>No items purchased</p>
        )}
      </div>
        </div>
      </div>
  );
};



export default UserPage;
