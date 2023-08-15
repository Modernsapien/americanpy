import React, { useState } from 'react';
import styles from './JourneyPage.css';
import EcoFriendlySuggestions from '../../components/JourneyComponents/EcoFriendlySuggestions';

const JourneyPage = () => {
  return (
    <div className={styles.containerWrapper}>
      <h2 className='journey-intro'> Plan your eco-friendly journey now!</h2>
      <div className="jp-container-wrapper">
        <div className="jp-top">
          <div className="jp-logo"></div>
        </div>
        <div className="jp-journey-form">
          <EcoFriendlySuggestions />
        </div>
      </div>
    </div>
  );
};

export default JourneyPage;
