import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from '../../pages/LoginPage/LoginPage'; 
import blob from '../../pages/LoginPage/blob.png';
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
    const resp = await fetch('http://localhost:3000/users/register', options);
    const data = await resp.json();
    if (resp.ok) {
      console.log(data);
      if (process.env.NODE_ENV === 'test'){
        localStorage.setItem('user_id', data.user_id)
      }
      props.onFormSwitch('LoginForm')
    } else {
      console.log(data);
      alert('Username already exists');
    }
  };

  return (
    <div className={styles.containerWrapper} data-testid="register_form">
      <div className="container-wrapper">
        <div className="top">
          <div className="logo"></div>
        </div>
        <div className="background-login">
      <img className='blob' src={blob} alt="Waves" />
    </div>
        <form id="signin-form" className="signin-form" onSubmit={handleSubmit}>
          <div className="container sign">
            <h1 data-testid="register_title">
              Register
            </h1>
            <br />
            <label htmlFor="username" data-testid="username_label">User Name</label>
            <input
              data-testid="username_input"
              id="username"
              className="text-box"
              type="text"
              placeholder="Username"
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
              placeholder="Password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="firstName" data-testid="firstname_label">First Name</label>
            <input
              data-testid="firstname_input"
              id="firstName"
              type="text"
              placeholder="First Name"
              name="firstName"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName" data-testid="lastname_label">Last Name</label>
            <input
              data-testid="lastname_input"
              id="lastName"
              type="text"
              placeholder="Last Name"
              name="lastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="email" data-testid="email_label">Email</label>
            <input
              data-testid="email_input"
              id="email"
              type="text"
              placeholder="Email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="submit">
              <button data-testid="register_button" type="submit" className="signinBtn">
                Register
              </button>
            </div>
          </div>
        <p className="inline-p">
          Already have an account?{" "}
          <span className="signup" onClick={() => props.onFormSwitch('LoginForm')} data-testid= "switch_to_login">
            Log in here.
          </span>
        </p>
        </form>
      </div>
    </div>
);
  }