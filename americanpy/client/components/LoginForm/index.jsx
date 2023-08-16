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
    const resp = await fetch('http://localhost:3000/users/login', options);
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
    <div className={styles.containerWrapper} data-testid="login_form">
      <div className="container-wrapper">
        <div className="top">
          <div className="logo"></div>
        </div>
        <form id="signin-form" className="signin-form" action="" onSubmit={handleSubmit}>
          <div className="container sign">
            <h1>Login</h1>
            <p>
              Please fill in this form to log in.
            </p>
            <br />
            <label htmlFor="username">User Name</label>
            <input
              id="username"
              className="text-box"
              type="text"
              placeholder="Enter User Name"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>
              <input type="checkbox" checked="checked" name="remember" /> Remember me
            </label>
            <div className="submit">
              <button type="submit" className="signinBtn">
                Log in
              </button>
            </div>
          </div>
          <p className="inline-p">
            Not a member?{" "}
            <span data-testid="switch_to_register" className="signup"  onClick={() => props.onFormSwitch('registerForm')}>
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
 }