import React, { useState } from 'react';
import styles from './JourneyPage.css';


const JourneyPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [startDestination, setStartDestination] = useState('');
  const [endDestination, setEndDestination] = useState('');

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleStartDestinationChange = (event) => {
    setStartDestination(event.target.value);
  };

  const handleEndDestinationChange = (event) => {
    setEndDestination(event.target.value);
  };

  const handleJourneySubmit = (event) => {
    event.preventDefault();
    // Implement journey planning logic here
    console.log('Start:', startDestination);
    console.log('End:', endDestination);
  };

  return (
    <div className={styles.containerWrapper}>
      <div className="jp-container-wrapper">
        <div className="jp-top">
          <div className="jp-logo"></div>
        </div>
        <form id="journey-form" className="jp-journey-form" onSubmit={handleJourneySubmit}>
          <div className="jp-container journey">
            <h1>Plan Your Journey</h1>
            <p>Enter your journey details below.</p>
            <label htmlFor="startDestination">Start Destination</label>
            <input
              id="startDestination"
              className="jp-text-box"
              type="text"
              placeholder="Enter Start Destination"
              value={startDestination}
              onChange={handleStartDestinationChange}
              required
            />
            <label htmlFor="endDestination">End Destination</label>
            <input
              id="endDestination"
              className="jp-text-box"
              type="text"
              placeholder="Enter End Destination"
              value={endDestination}
              onChange={handleEndDestinationChange}
              required
            />
            <button type="submit" className="jp-planBtn">Plan Journey</button>
          </div>
        </form>
       
      </div>
    </div>
  );
};

export default JourneyPage;
