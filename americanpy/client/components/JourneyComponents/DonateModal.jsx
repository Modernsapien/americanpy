// DonateModal.js

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from '../../pages/JourneyPage/JourneyPage.css';

Modal.setAppElement('#root');

const DonateModal = ({ isOpen, onRequestClose }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  const handleDonation = (e) => {
    e.preventDefault();
    // Handle the donation submission here
    // You can use an API call or any other method to process the donation

    // For demonstration purposes, we'll simulate the donation processing
    // and show a thank-you alert using the browser's built-in alert function
    setTimeout(() => {
      const formattedAmount = parseFloat(donationAmount).toFixed(2);
      const thankYouMessage = `Thank you for donating £${formattedAmount}!`;
      alert(thankYouMessage);

      // Clear the form fields and close the modal
      setDonationAmount('');
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
      onRequestClose();
    }, 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      <h2>Make a Donation</h2>
      <button className="close-button" onClick={onRequestClose}>
        X
      </button>
      {isLoading ? (
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" /> {/* Spinning loading icon from Font Awesome */}
        </div>
      ) : (
        <form onSubmit={handleDonation}>
          <div className="input-container">
            <label className="input-label">Donation Amount in £:</label>
            <input
              type="number"
              placeholder='The recommended donation amount is £1 for every kg CO2e. This can be found on the selected mode of travel card.'
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="input border"
            />
          </div>
          <div className="card-input-container">
            <div className="input-container">
              <label className="input-label">Card Number:</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="card-input border"
              />
            </div>
            <div className="input-container">
              <label className="input-label">Expiry Date:</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="card-input border"
              />
            </div>
            <div className="input-container">
              <label className="input-label">CVV:</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="cvv-input border"
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="submitButton">
              Donate
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default DonateModal;
