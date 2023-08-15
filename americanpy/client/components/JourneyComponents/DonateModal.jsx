// DonateModal.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from '../../pages/JourneyPage/JourneyPage.css';


Modal.setAppElement('#root');

const DonateModal = ({ isOpen, onRequestClose }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleDonation = (e) => {
    e.preventDefault();
    // Handle the donation submission here
    // You can use an API call or any other method to process the donation
    // Don't forget to close the modal after the donation is processed
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      <h2>Make a Donation</h2>
      <form onSubmit={handleDonation}>
        <div className="input-container">
          <label className="input-label">Donation Amount:</label>
          <input
            type="number"
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
    </Modal>
  );
};

export default DonateModal;
