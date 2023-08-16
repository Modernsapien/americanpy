import React, { useState } from "react";
import axios from "axios";
import {
  faTrain,
  faBus,
  faBicycle,
  faShip,
  faTram,
  faCar,
  faWalking,
  faPlane,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../pages/JourneyPage/JourneyPage.css";

const EcoFriendlySuggestions = () => {
  const [startDestination, setStartDestination] = useState("");
  const [endDestination, setEndDestination] = useState("");
  const [ecoFriendlySuggestions, setEcoFriendlySuggestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleJourneySubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading state when submitting

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that provides travel suggestions and carbon emissions calculations.",
            },
            {
              role: "user",
              content: `Suggest eco-friendly travel options from ${startDestination} to ${endDestination}.also return the carbon emmisions that would be caused by each mode of transport and an estimated cost for this travel in £.`,
            },
          ],
        },
        {
          headers: {
            Authorization:
              "Bearer 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",
          },
        }
      );

      const suggestions = [];
      let currentSuggestion = "";
      let suggestionNumber = 1;

      response.data.choices[0].message.content
        .split(/\d+\./)
        .forEach((text) => {
          if (text.trim() !== "") {
            currentSuggestion = text.trim();
            if (
              !currentSuggestion.startsWith(
                "There are several eco-friendly travel options"
              )
            ) {
              suggestions.push({
                number: suggestionNumber,
                content: currentSuggestion,
              });
              suggestionNumber++;
            }
          }
        });

      setEcoFriendlySuggestions(suggestions);
      setSubmitted(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setEcoFriendlySuggestions([
        { number: 1, content: "An error occurred while fetching suggestions." },
      ]);
    } finally {
      setIsLoading(false); // Reset loading state when request completes
    }
  };
  const handleCloseModal = () => {
    setIsDonateModalOpen(false);
  };

  

  return (
    <div className="eco-friendly-suggestions" data-testid="eco_suggestions">
      <h2>
        Eco-Friendly Travel Suggestions from{" "}
        {startDestination.charAt(0).toUpperCase() + startDestination.slice(1)}{" "}
        to {endDestination.charAt(0).toUpperCase() + endDestination.slice(1)}
      </h2>
      {!submitted ? (
        <form onSubmit={handleJourneySubmit}>
          {/* Destination Input */}
          <input
            className="destination-input"
            id="startDestination"
            type="text"
            value={startDestination}
            onChange={(event) => setStartDestination(event.target.value)}
            placeholder="Start Destination"
            required
          />
          <input
            className="destination-input"
            id="endDestination"
            type="text"
            value={endDestination}
            onChange={(event) => setEndDestination(event.target.value)}
            placeholder="End Destination"
            required
          />

          <button
            className={`get-suggestions-button ${isLoading ? "loading" : ""}`}
            type="submit"
          >
            {isLoading ? (
              <span>
                <FontAwesomeIcon icon={faGlobe} spin /> Loading
              </span>
            ) : (
              "Get Suggestions"
            )}
          </button>
        </form>
      ) : (
        <div className="response-container">
          {ecoFriendlySuggestions.slice(1).map((suggestion, index) => (
            <div
              key={suggestion.number}
              className={`suggestion-card ${
                expandedCardIndex === index ? "expanded" : ""
              }`}
            >
              <h3>
                {suggestion.content.includes("Train") ? (
                  <FontAwesomeIcon icon={faTrain} />
                ) : suggestion.content.includes("Bus") ? (
                  <FontAwesomeIcon icon={faBus} />
                ) : suggestion.content.includes("Bike") ||
                  suggestion.content.includes("Cycling") ? (
                  <FontAwesomeIcon icon={faBicycle} />
                ) : suggestion.content.includes("Ferry") ? (
                  <FontAwesomeIcon icon={faShip} />
                ) : suggestion.content.includes("Tram") ? (
                  <FontAwesomeIcon icon={faTram} />
                ) : suggestion.content.includes("Car") ? (
                  <FontAwesomeIcon icon={faCar} />
                ) : suggestion.content.includes("Walk") ? (
                  <FontAwesomeIcon icon={faWalking} />
                ) : suggestion.content.includes("Flight") ? (
                  <FontAwesomeIcon icon={faPlane} />
                ) : (
                  <FontAwesomeIcon icon={faGlobe} />
                )}
              </h3>
              <p>
                {expandedCardIndex === index || suggestion.content.length <= 50
                  ? suggestion.content
                  : `${suggestion.content.slice(0, 50)}...`}
              </p>
              {suggestion.content.length > 50 && (
                <button
                  className="read-more-button"
                  onClick={() => setExpandedCardIndex(index)}
                >
                  Read more
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EcoFriendlySuggestions;
