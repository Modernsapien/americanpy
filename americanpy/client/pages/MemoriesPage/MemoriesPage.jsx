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
    <div className="memories-container" data-testid="memories_container">
      <h1 className="intro-memories" data-testid="memories_title">Memories are better when they are made guilt free!</h1>
      <button className="create-memory-button" data-testid="memories_button" onClick={() => setShowForm(true)}>
        Create a Memory
      </button>

      {showForm && (
        <div className="memory-form" data-testid="memories_form">
          <h2 className="myMemories" data-testid="memories_form_title">My Memories</h2>
          <input className="file" type="file" accept="image/*" onChange={handleFileChange} data-testid="file_input" required /> <br />
          <label htmlFor="description" data-testid="memory_title">Title</label>
          <input
            data-testid="memory_title_input"
            className="inputBoxes"
            type="text"
            placeholder="Enter Title"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
          <div className="country-section">
          <label htmlFor="location" data-testid="location_label">Location</label>
          <input
            data-testid="location_input"
            className="inputBoxes"
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={handleLocationChange}
            required
          />
            <label htmlFor="country" data-testid="country_label">Country</label>
            <select
              data-testid="country_input"
              className="country"
              id="country"
              name="country"
              value={country}
              onChange={handleCountryChange}
              required
            >
          <option value="" disabled>Select a Country</option>
          {countriesData.map((countryData) => (
            <option key={countryData.country} value={countryData.country}>
              {countryData.country}
            </option>
            ))}
            </select>
          </div>
          <label htmlFor="date" data-testid="memory_date">Date</label>
          <input
            className="inputBoxes"
            data-testid="date_input"
            type="date"
            value={date}
            onChange={handleDateChange}
            required
          />
          <button className="button" onClick={addMemory} data-testid="add_button">
            Add Memory
          </button>
          <button className="button" data-testid="save_button">Save Memories</button>
        </div>
      )}

      <div className="memory-list">
        {memories.map((memory, index) => (

          <div className="memory" key={index} data-testid = {`Memory_${index}`}>
            <img src={URL.createObjectURL(memory.file)} alt={`Memory ${index}`} data-testid = {`Memory_${index}_image`}/>
            <p data-testid = {`Memory_${index}_title`}>Title: {memory.description}</p>
            <p data-testid = {`Memory_${index}_location`}>Location: {memory.location}</p>
            <p data-testid = {`Memory_${index}_date`}>Date: {memory.date}</p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoriesPage;
