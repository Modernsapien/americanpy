import React, { useState, useEffect } from "react";
import "./MemoriesPage.css";
import { useCredentials } from "../../contexts";
import countriesData from "../../data/ecoData.json";
import { usePoints } from "../../components/MemoriesComponents/PointsContext";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MemoriesPage = () => {
  const [memories, setMemories] = useState([]);
  const [drive_link, setLink] = useState(null);
  const [memory_name, setName] = useState("");
  const [memory_description, setDescription] = useState("");
  const [memory_location, setLocation] = useState("");
  const [memory_date, setDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [country, setCountry] = useState("");
  const { points, setPoints } = usePoints();

  const { token } = useCredentials();
  const isLoggedIn = token || localStorage.getItem("token");

  const getUserMemories = async () => {
    const resp = await fetch("http://localhost:3000/memory");
    const data = await resp.json();
    if (resp.ok) {
      setMemories(data);
    } else {
      console.log(data);
    }
  };

  const handleFileChange = (e) => {
    setLink(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
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

  async function addMemory(e) {
    e.preventDefault();

    if (drive_link && memory_description && memory_location && memory_date) {
      const memory = {
        drive_link,
        memory_name,
        memory_description,
        memory_location,
        country,
        memory_date,
      };

      setMemories([...memories, memory]);

      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memory_name,
          memory_date,
          memory_description,
          memory_location,
          country,
          drive_link,
        }),
      };

      const resp = await fetch("http://localhost:3000/memory", options);
      const data = await resp.json();

      if (resp.ok) {
        setPoints(points + 10);
        alert("Memory added successfully, 10 Points added!");
      } else {
        console.log(data);
      }

      setLink(null);
      setName("");
      setDescription("");
      setLocation("");
      setDate("");
      setCountry("");
      setShowForm(false);
    }
    setPoints(points + 10);
    alert("Memory added successfully, 10 Points added!");
  }

  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedCountry, setEditedCountry] = useState("");

  const startEditing = (index, memory) => {
    setEditingIndex(index);
    setEditedDescription(memory.description);
    setEditedLocation(memory.location);
    setEditedDate(memory.date);
    setEditedCountry(country);
  };

  const saveChanges = (index) => {
    const editedMemory = {
      ...memories[index],
      description: editedDescription,
      location: editedLocation,
      date: editedDate,
      country: editedCountry,
    };

    const updatedMemories = memories.map((memory, i) =>
      i === index ? editedMemory : memory
    );

    setMemories(updatedMemories);
    setEditingIndex(-1);
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUserMemories();
    }
  }, []);

  const cancelEditing = () => {
    setEditingIndex(-1);
  };

  return (
    <div className="memories-container" data-testid="memories_container">
      <h1 className="intro-memories" data-testid="memories_title">
        Memories are better when they are made guilt free!
      </h1>
      <button
        className="create-memory-button"
        data-testid="memories_button"
        onClick={() => setShowForm(true)}
      >
        Create a Memory
      </button>

      {showForm && (
        <div className="memory-form" data-testid="memories_form">
          <h2 className="myMemories" data-testid="memories_form_title">
            My Memories
          </h2>
          <input
            className="file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            data-testid="file_input"
            required
          />
          <br />
          <label htmlFor="description" data-testid="memory_title">
            Title
          </label>
          <input
            data-testid="memory_title_input"
            className="inputBoxes"
            type="text"
            placeholder="Enter Title"
            value={memory_name}
            onChange={handleNameChange}
            required
          />
          <label
            htmlFor="memory_description"
            data-testid="memory_description_label"
          >
            Description
          </label>
          <input
            data-testid="memory_description_input"
            className="inputBoxes"
            type="text"
            placeholder="About the memory"
            value={memory_description}
            onChange={handleDescriptionChange}
            required
          />

          <div className="country-section">
            <label htmlFor="location" data-testid="location_label">
              Location
            </label>
            <input
              data-testid="location_input"
              className="inputBoxes"
              type="text"
              placeholder="Enter Location"
              value={memory_location}
              onChange={handleLocationChange}
              required
            />

            <label htmlFor="country" data-testid="country_label">
              Country
            </label>
            <select
              data-testid="country_input"
              className="country"
              id="country"
              name="country"
              value={country}
              onChange={handleCountryChange}
              required
            >
              <option value="" disabled>
                Select a Country
              </option>
              {countriesData.map((countryData) => (
                <option key={countryData.country} value={countryData.country}>
                  {countryData.country}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor="date" data-testid="memory_date">
            Date
          </label>
          <input
            className="inputBoxes"
            data-testid="date_input"
            type="date"
            value={memory_date}
            onChange={handleDateChange}
            required
          />
          <button
            className="button"
            onClick={addMemory}
            data-testid="add_button"
          >
            Add Memory <FontAwesomeIcon icon={faCamera} />
          </button>
          <button className="button" data-testid="save_button">
            Save Memories
          </button>
        </div>
      )}

      <div className="memory-list">
        {memories.map((memory, index) => (
          <div className="memory" key={index} data-testid={`Memory_${index}`}>
            <img
              src={URL.createObjectURL(memory.drive_link)}
              alt={`Memory ${index}`}
              data-testid={`Memory_${index}_image`}
            />
            <p data-testid={`Memory_${index}_title`}>
              Title: {memory.memory_description}
            </p>
            <p data-testid={`Memory_${index}_location`}>
              Location: {memory.memory_location}
            </p>
            <p data-testid={`Memory_${index}_country`}>
              Country: {memory.country || country}
            </p>
            <p data-testid={`Memory_${index}_date`}>
              Date: {memory.memory_date}
            </p>

            {editingIndex === index ? (
              <div className="memory-edit">
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
                <input
                  type="text"
                  value={editedLocation}
                  onChange={(e) => setEditedLocation(e.target.value)}
                />
                <input
                  type="text"
                  value={editedDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                />
                <label htmlFor="editedCountry">Country</label>
                <select
                  id="editedCountry"
                  value={editedCountry}
                  onChange={(e) => setEditedCountry(e.target.value)}
                >
                  <option value="" disabled>
                    Select a Country
                  </option>
                  {countriesData.map((countryData) => (
                    <option
                      key={countryData.country}
                      value={countryData.country}
                    >
                      {countryData.country}
                    </option>
                  ))}
                </select>
                <button className="button" onClick={() => saveChanges(index)}>
                  Save
                </button>
                <button className="button" onClick={cancelEditing}>
                  Cancel
                </button>
              </div>
            ) : (
              <div className="memory-buttons">
                <button
                  className="button"
                  onClick={() => startEditing(index, memory)}
                >
                  Edit
                </button>
                <button
                  className="button"
                  onClick={() =>
                    setMemories(memories.filter((_, i) => i !== index))
                  }
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
        ;
      </div>
    </div>
  );
};

export default MemoriesPage;
