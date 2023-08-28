// index.js (or index.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CredentialsProvider } from '../contexts';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <CredentialsProvider>
      <App />
    </CredentialsProvider>
  </Router>
);
