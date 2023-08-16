import React, { useState } from "react";
import styles from "./JourneyPage.css";
import EcoFriendlySuggestions from "../../components/JourneyComponents/EcoFriendlySuggestions";
import DonateModal from "../../components/JourneyComponents/DonateModal";

const JourneyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='background' data-testid = "background">
    <div className={styles.containerWrapper}>
      <h2 className="journey-intro" data-testid = "journey_title">Plan your eco-friendly journey now!</h2>
      <div className="jp-container-wrapper">
        <div className="jp-top">
          <div className="jp-logo"></div>
          <button onClick={openModal} className="btn btn-success donate-button" data-testid = "donate_button">
            Donate to offset your carbon footprint
          </button>
        </div>
        <div className="jp-journey-form">
          <EcoFriendlySuggestions />
        </div>
      </div>
      <DonateModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
    </div>
  );
};

export default JourneyPage;
