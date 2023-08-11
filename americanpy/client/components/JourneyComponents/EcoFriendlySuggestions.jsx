import React, { useState } from 'react';
import OpenAI from 'openai-api';

const EcoFriendlySuggestions = () => {
  const [startDestination, setStartDestination] = useState('');
  const [endDestination, setEndDestination] = useState('');
  const [ecoFriendlySuggestions, setEcoFriendlySuggestions] = useState([]);
  const OPENAI_API_KEY = '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';

  const handleJourneySubmit = async (event) => {
    event.preventDefault();

    try {
      const suggestions = await generateEcoFriendlySuggestions(startDestination, endDestination);
      setEcoFriendlySuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setEcoFriendlySuggestions(['An error occurred while fetching suggestions.']);
    }
  };

  const generateEcoFriendlySuggestions = async (start, end) => {
    const openai = new OpenAI({ key: OPENAI_API_KEY });

    try {
      const prompt = `Given the start destination "${start}" and end destination "${end}", provide detailed recommendations for eco-friendly travel options with low carbon emissions. For each mode of travel (walking, biking, public transportation, carpooling), please include the following information:
      1. Explain the specific conditions under which this mode of travel is more or less applicable.
      2. Compare the typical travel times between this mode of travel and others.
      3. Provide recommendations for activities during cruising on the river while using this mode of travel.
      
      Additionally, discuss how each mode of travel can be made more sustainable and highlight any extra environmental benefits.
      
      Your insights will be used to create research papers focused on practical options for maximizing carbon savings while traveling between these destinations.`;

      const gptResponse = await openai.complete({
        engine: 'davinci',
        prompt: prompt,
        maxTokens: 150, // Adjust the token limit based on your needs
      });

      const suggestionText = gptResponse.choices[0].text;
      return [suggestionText];
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="eco-friendly-suggestions">
      <h2>Eco-Friendly Travel Suggestions:</h2>
      <form onSubmit={handleJourneySubmit}>
        <label htmlFor="startDestination">Start Destination</label>
        <input
          id="startDestination"
          type="text"
          value={startDestination}
          onChange={(event) => setStartDestination(event.target.value)}
          required
        />
        <label htmlFor="endDestination">End Destination</label>
        <input
          id="endDestination"
          type="text"
          value={endDestination}
          onChange={(event) => setEndDestination(event.target.value)}
          required
        />
        <button type="submit">Get Suggestions</button>
      </form>
      <ul>
        {ecoFriendlySuggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default EcoFriendlySuggestions;
