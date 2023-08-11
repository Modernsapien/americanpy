import React from 'react'
import { useState } from 'react'
import 'americanpy/client/pages/LoginPage/LoginPage.css'
import { useNavigate } from 'react-router'

import { useAuth } from '../../contexts'
  
export default function LoginForm(props) {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const {token, setToken } = useAuth()
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      const options = {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      }
      const resp = await fetch('https://travel-wise-api.onrender.com/users/login', options)
      const data = await resp.json()
      if (resp.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token)
        navigate('/')
      } else {
        console.log(data)
        alert('Incorrect username or password')
      }
    }
  
    return (
    <div className={styles.copntainerWrapper}>
    <div className="container-wrapper">
      <div className="top">
        <div className="logo"></div>
      </div>
      <div className='signin-form' data-testid = "formContainer">
        <h2 className='form-title'>Login</h2>
  
      <form className='auth-form-login' onSubmit={handleSubmit} role='loginForm' data-testid="loginForm">
        <input placeholder='username' type="username" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder='password' type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button data-testid = "logInLogIn" type='submit'>Log in</button>
      </form>
       <button className="inline-p" onClick={() => props.onFormSwitch('registerForm')}>Don't have an account? Register here.</button>
      </div>
      </div>
      </div>
    )
  }
