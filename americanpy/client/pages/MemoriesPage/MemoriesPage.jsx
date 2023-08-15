import React, { useEffect, useState } from 'react';
import './MemoriesPage.css';
import countriesData from '../../data/ecoData.json';

const MemoriesPage = () => {
  const [memories, setMemories] = useState([]);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [country, setCountry] = useState("");


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  

  const addMemory = () => {
    if (file && description && location && date) {
      const memory = { file, description, location, date };
      setMemories([...memories, memory]);
      setFile(null);
      setDescription('');
      setLocation('');
      setDate('');
      setShowForm(false);
    }
  };

  return (
    <div className="memories-container">
      <h1 className="intro-memories">Memories are better when they are made guilt free!</h1>
      <button className="create-memory-button" onClick={() => setShowForm(true)}>
        Create a Memory
      </button>

      {showForm && (
        <div className="memory-form">
          <h2 className="myMemories">My Memories</h2>
          <input className="file" type="file" accept="image/*" onChange={handleFileChange} required /> <br />
          <label htmlFor="description">Title</label>
          <input
            className="inputBoxes"
            type="text"
            placeholder="Enter Title"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
          <div className="country-section">
          <label htmlFor="location">Location</label>
          <input
            className="inputBoxes"
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={handleLocationChange}
            required
          />
            <label htmlFor="country">Country</label>
            <select
              className="country"
              id="country"
              name="country"
              value={country}
              onChange={handleCountryChange}
              required
            >
          <option value="" disabled>Select a country</option>
          {countriesData.map((countryData) => (
            <option key={countryData.country} value={countryData.country}>
              {countryData.country}
            </option>
            ))}
            </select>
          </div>
          <label htmlFor="date">Date</label>
          <input
            className="inputBoxes"
            type="date"
            value={date}
            onChange={handleDateChange}
            required
          />
          <button className="button" onClick={addMemory}>
            Add Memory
          </button>
          <button className="button">Save Memories</button>
        </div>
      )}

      <div className="memory-list">
        {memories.map((memory, index) => (
          <div className="memory" key={index}>
            <img src={URL.createObjectURL(memory.file)} alt={`Memory ${index}`} />
            <p>Title: {memory.description}</p>
            <p>Location: {memory.location}</p>
            <p>Date: {memory.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoriesPage;
