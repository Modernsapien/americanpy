import React, { useState } from 'react';
import axios from 'axios';
import { faTrain, faBus, faBicycle, faShip, faTram, faCar, faWalking, faPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../pages/JourneyPage/JourneyPage.css';

const EcoFriendlySuggestions = () => {
  const [startDestination, setStartDestination] = useState('');
  const [endDestination, setEndDestination] = useState('');
  const [ecoFriendlySuggestions, setEcoFriendlySuggestions] = useState([]);
  const [totalCarbonEmission, setTotalCarbonEmission] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  const handleJourneySubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful assistant that provides travel suggestions and carbon emissions calculations.',
            },
            {
              role: 'user',
              content: `Suggest eco-friendly travel options from ${startDestination} to ${endDestination}.`,
            },
          ],
        },
        {
          headers: {
            Authorization: 'Bearer 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',
          },
        }
      );

      const suggestions = [];
      let currentSuggestion = '';
      let suggestionNumber = 1;

      response.data.choices[0].message.content.split(/\d+\./).forEach((text) => {
        if (text.trim() !== '') {
          currentSuggestion = text.trim();
          if (!currentSuggestion.startsWith('There are several eco-friendly travel options')) {
            suggestions.push({
              number: suggestionNumber,
              content: currentSuggestion,
            });
            suggestionNumber++;
          }
        }
      });

      setEcoFriendlySuggestions(suggestions);
      setTotalCarbonEmission('Estimated carbon emissions: ...');
      setSubmitted(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setEcoFriendlySuggestions([
        { number: 1, content: 'An error occurred while fetching suggestions.' },
      ]);
      setTotalCarbonEmission('An error occurred while fetching emissions.');
    }
  };

  return (
    <div className="eco-friendly-suggestions">
      <h2>Eco-Friendly Travel Suggestions:</h2>
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
          {/* "Get Suggestions" Button */}
          <button className="get-suggestions-button" type="submit">
            Get Suggestions
          </button>
        </form>
      ) : (
        <div className="response-container">
          {ecoFriendlySuggestions.slice(1).map((suggestion, index) => (
            <div
              key={suggestion.number}
              className={`suggestion-card ${expandedCardIndex === index ? 'expanded' : ''}`}
            >
              <h3>
                {suggestion.content.includes('Train')
                  ? <FontAwesomeIcon icon={faTrain} />
                  : suggestion.content.includes('Bus')
                  ? <FontAwesomeIcon icon={faBus} />
                  : suggestion.content.includes('Bike') || suggestion.content.includes('Cycling')
                  ? <FontAwesomeIcon icon={faBicycle} />
                  : suggestion.content.includes('Ferry')
                  ? <FontAwesomeIcon icon={faShip} />
                  : suggestion.content.includes('Tram')
                  ? <FontAwesomeIcon icon={faTram} />
                  : suggestion.content.includes('Car')
                  ? <FontAwesomeIcon icon={faCar} />
                  : suggestion.content.includes('Walk')
                  ? <FontAwesomeIcon icon={faWalking} />
                  : suggestion.content.includes('Flight')
                  ? <FontAwesomeIcon icon={faPlane} />
                  : null}
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
      {/* Total Carbon Emission */}
      <p className="total-carbon-emission">{totalCarbonEmission}</p>
    </div>
  );
};

export default EcoFriendlySuggestions;
