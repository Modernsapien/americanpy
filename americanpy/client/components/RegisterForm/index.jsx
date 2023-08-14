import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from '../../pages/LoginPage/LoginPage.css'; 
import { useCredentials } from '../../contexts';

export default function RegisterForm(props) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

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
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    };
    const resp = await fetch('https://travel-wise-api.onrender.com/users/register', options);
    const data = await resp.json();
    if (resp.ok) {
      console.log(data);
      window.location.href = '/login';
    } else {
      console.log(data);
      alert('Username already exists');
    }
  };

  return (
    <div className={styles.containerWrapper}>
      <div className="auth-form-container" data-testid="formContainer">
        <h2 className="form-title">Register</h2>
        <form className="auth-form-register" onSubmit={handleSubmit} data-testid="loginForm">
          <input
            placeholder="Username"
            type="text"
            id="username"
            data-testid="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            id="password"
            data-testid="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder="First Name"
            type="text"
            id="firstName"
            data-testid="firstName"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="Last Name"
            type="text"
            id="lastName"
            data-testid="lastName"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            placeholder="Email"
            type="text"
            id="email"
            data-testid="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
           <div className="submit">
          <button type="submit" className="signinBtn">
            Register
          </button>
          </div>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('LoginForm')}>
          Have an account? Log in here.
        </button>
      </div>
    </div>
  );
}
