import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCredentials } from '../../contexts';
import styles from '../../pages/LoginPage/LoginPage';

export default function LoginForm(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { token, setToken } = useCredentials();

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
    const resp = await fetch('https://travel-wise-api.onrender.com/users/login', options);
    const data = await resp.json();
    if (resp.ok) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      navigate('/');
    } else {
      console.log(data);
      alert('Incorrect username or password');
    }
  };

  return (
    <div className={styles.containerWrapper}>
      <div className="auth-form-container" data-testid="formContainer">
        <h2 className="form-title">Login</h2>

        <form className="auth-form-login" onSubmit={handleSubmit} role="loginForm" data-testid="loginForm">
          <input
            placeholder="Username"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button data-testid="logInLogIn" type="submit" className="signinBtn">
            Log in
          </button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('registerForm')}>
          Don't have an account? Register here.
        </button>
      </div>
    </div>
  );
}
