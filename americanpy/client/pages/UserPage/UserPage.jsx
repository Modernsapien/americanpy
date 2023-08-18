import React, { useEffect, useState } from 'react';
import './UserPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import defaultUserPhoto from './user-photo.png';
import waves from './waves.png';
import { usePoints } from '../../components/MemoriesComponents/PointsContext';
import { faTree, faBicycle, faTrain, faFerry } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserPage = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);
  const [editingInfo, setEditingInfo] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const { points, setPoints } = usePoints();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  async function fetchUserData() {
    try {
      const user_id = JSON.parse(localStorage.getItem("user_id"));
      const options = {
        headers:  {
            'Authorization': localStorage.getItem("token")
        }
    }
      const response = await fetch(`http://localhost:3000/users/user/${user_id}`, options);
      const userData = await response.json();
      if(response.ok){
        setUsername(userData.username);
        setEmail(userData.email);
      } else {
        throw new error("user not found")
      }
    } catch (error) {
      console.error(error);
    }
  }
  
 
// useEffect(() => {
//   const fetchedUserInfo = {
//     username: '',
//     email: ''
//   };

//   setUsername(fetchedUserInfo.username);
//   setEmail(fetchedUserInfo.email);
// }, []);


  // const capitaliseWords = (string) => {
  //   return string
  //     .split(' ')
  //     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  //     .join(' ');
  // };

  const confirmPurchase = (item) => {
    const confirmed = window.confirm(`Are you sure you want to purchase this item for ${item.cost} points?`);
    if (confirmed) {
      if (points >= item.cost) {
        setPoints(points - item.cost);
        setPurchasedItems([...purchasedItems, { name: item.name, icon: item.icon }]);
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
    { name: 'Plant a tree', cost: 50, icon: faTree },
    { name: '10% off bike hire voucher', cost: 75, icon: faBicycle },
    { name: '10% off train tickets', cost: 100, icon: faTrain },
    { name: '20% off ferry tickets', cost: 130, icon: faFerry },
  ];

  return (
    <div className="user-page">
    <div className="background-user" data-testid="user_background">
      <img className='waves' src={waves} alt="Waves" />
    </div>
      <h1 className="user" data-testid="user_title">Welcome to your Passport, {(username)}!</h1>
      <div className="row row-user">
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
                <button className='edit-info-btn' data-testid="edit_button" onClick={() => setEditingInfo(false)}>Save Changes</button>
              </div>
            ) : (
              <div className="display-info">
                <h2 data-testid="user_info_title">User Information</h2>
                <p data-testid="username" className='username'>Username: {(username)}</p>
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
              <FontAwesomeIcon icon={item.icon} />
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
              <li data-testid={`${item.name}_purchased`} key={index}> {item.name} <FontAwesomeIcon icon={item.icon} />
              </li> 
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
