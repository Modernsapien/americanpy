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
  
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  const handleDonation = (e) => {
    e.preventDefault();
   
    setTimeout(() => {
      const formattedAmount = parseFloat(donationAmount).toFixed(2);
      const thankYouMessage = `Thank you for donating £${formattedAmount}!`;
      alert(thankYouMessage);

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
          <p className="donation-description">
  By making a donation, you contribute to our charitable efforts dedicated to environmental sustainability. Your generous contributions play a crucial role in supporting our tree-planting initiatives. These initiatives are designed to mitigate the carbon footprint generated by various modes of travel. We believe in the power of reforestation as a means to offset CO2 emissions and foster a greener future. Every pound you donate contributes to the planting of trees, which act as natural carbon sinks, absorbing CO2 and helping to restore ecological balance. Together, we're making a positive impact on the environment and creating a legacy of cleaner air and healthier ecosystems for generations to come.
</p>

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
