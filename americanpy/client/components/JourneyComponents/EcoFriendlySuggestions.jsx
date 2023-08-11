import React, { useState, useEffect } from 'react';
import OpenAI from 'openai-api';

const EcoFriendlySuggestions = () => {
  const [startDestination, setStartDestination] = useState('');
  const [endDestination, setEndDestination] = useState('');
  const [ecoFriendlySuggestions, setEcoFriendlySuggestions] = useState([]);

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
    const OPENAI_API_KEY = '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';
    const openai = new OpenAI(OPENAI_API_KEY);

    try {
      const prompt = `User: I want to make a sustainable travel choice for my journey. Please recommend three specific ways to travel considering the environmental issues of global warming and the process of burning. My journey involves the options of riding a bike, taking public transportation (bus, train, metro), and driving.

      AI: Based on your preferences and the environmental concerns you mentioned, here are three recommended ways to make your journey more sustainable:
      
      1. Riding a Bike: Biking is an eco-friendly option that produces zero emissions and helps reduce your carbon footprint. It's a great choice for short distances and promotes a healthier lifestyle.
      
      2. Taking Public Transportation: Opting for public transportation, such as buses, trains, or the metro, can significantly lower carbon emissions compared to private driving. It also helps alleviate traffic congestion and supports public infrastructure.
      
      3. Carpooling: If driving is necessary, consider carpooling with others to share the environmental impact. Carpooling reduces the number of vehicles on the road and decreases emissions per person, making your journey more sustainable.
      
      These recommendations take into account the environmental issues you mentioned and provide practical options for a greener travel experience. Have a safe and eco-friendly journey!`;
      
        

      const gptResponse = await openai.complete({
  engine: 'davinci', 
  prompt: prompt,
  maxTokens: 150,  // Adjust the token limit based on your needs
});


      const suggestionText = gptResponse.data.choices[0].text;
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








