import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useCredentials } from '../../contexts';
import styles from '../../pages/LoginPage/LoginPage';
import blob from '../../pages/LoginPage/blob.png';

export default function LoginForm(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { token, setToken } = useCredentials();
  const [userId, setUserId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    const resp = await fetch('http://localhost:3000/users/login', options);
    const data = await resp.json();
    console.log(data)
  if (resp.ok) {
    
    localStorage.setItem('token', data.token);
    localStorage.setItem('user_id', data.id); 
    setToken(data.token);
    setUserId(data.user_id)
    navigate('/');
    window.location.reload();
  } else {
    console.log(data);
    alert('Incorrect username or password');
  }
};

  return (
    <div className={styles.containerWrapper} data-testid="login_form">
      <div className="container-wrapper">
        <div className="top">
          <div className="logo"></div>
        </div>
        <div className="background-login">
      <img className='blob' src={blob} alt="Waves" />
    </div>
        <form id="signin-form" className="signin-form" action="" onSubmit={handleSubmit}>
          <div className="container sign">
            <h1 data-testid="login_title">Login</h1>
            <p data-testid="login_subtitle">
              Please fill in this form to log in.
            </p>
            <br />
            <label htmlFor="username" data-testid="username_label">User Name</label>
            <input
              data-testid="username_input"
              id="username"
              className="text-box"
              type="text"
              placeholder="Enter User Name"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password" data-testid="password_label">Password</label>
            <input
              data-testid="password_input"
              id="password"
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>
              <input data-testid="check_box" type="checkbox" checked="checked" name="remember" /> Remember me
            </label>
            <div className="submit">
              <button type="submit" className="signinBtn" data-testid="login_button">
                Log in
              </button>
            </div>
          </div>
          <p className="inline-p">
            Not a member?{" "}
            <span className="signup"  onClick={() => props.onFormSwitch('registerForm')} data-testid="switch_to_register">
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
 }