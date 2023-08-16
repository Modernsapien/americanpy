import React, { useState, useEffect } from 'react';
import './MemoriesPage.css';
import { useCredentials } from '../../contexts';

const MemoriesPage = () => {
  const [memories, setMemories] = useState([{}]);
  const [drive_link, setLink] = useState(null);
  const [memory_name, setName] = useState('');
  const [memory_description, setDescription] = useState('');
  const [memory_location, setLocation] = useState('');
  const [memory_date, setDate] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { token } = useCredentials()
  const isLoggedIn = token || localStorage.getItem('token')

  const getUserMemories = async() =>{
    const resp = await fetch('http://localhost:3000/memories')
    const data = await resp.json()
    if (resp.ok){
      setMemories(data)
    } else {
      console.log(data)
    }
  }

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

  const addMemory = () => {
    if (drive_link && memory_description && memory_location && memory_date) {
      const memory = { drive_link, memory_name, memory_description, memory_location, memory_date};
      setMemories([...memories, memory]);
      setLink(null);
      setName('');
      setDescription('');
      setLocation('');
      setDate('');
      setShowForm(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        memory_name: memory_name,
        memory_date: memory_date,
        memory_description: memory_description,
        memory_location: memory_location,
        drive_link: drive_link
      }),
    };
  
  };


  useEffect(() => {
    if(isLoggedIn){
      getUserMemories()
    }
  },[])

  return (
    
    
    <div className="memories-container">
      <h1 className="intro-memories">Memories are better when they are made guilt free!</h1>
      {/* <div>
      {memories.map((m,i) => {
        <div key={i}>
          <h2>{m.memory_name}</h2>
          <img
           src={m.drive_link}
           alt={m.memory_name}
         />
         <p>{m.memory_description}</p>
         <p>{m.memory_location}</p>
         <p>{m.memory_date}</p>
        </div>
      })}
     </div>  */}
       
      <button className="create-memory-button" onClick={() => setShowForm(true)}>
        Create a Memory
      </button>

    

      {showForm && (
        <form className="memory-form" onSubmit={handleSubmit}>
          <h2 className="myMemories">My Memories</h2>
          <input className="file" type="file" accept="image/*" onChange={handleFileChange} /> <br />
          <label htmlFor="memory_name">Title</label>
          <input
            className="inputBoxes"
            type="text"
            placeholder="Enter Title"
            value={memory_name}
            onChange={handleNameChange}
            required
          />
          <label htmlFor="memory_description">Description</label>
          <input
            className="inputBoxes"
            type="text"
            placeholder="About the memory"
            value={memory_description}
            onChange={handleDescriptionChange}
            required
          />
          <label htmlFor="memory_location">Location</label>
          <input
            className="inputBoxes"
            type="text"
            placeholder="Enter Location"
            value={memory_location}
            onChange={handleLocationChange}
            required
          />
          <label htmlFor="date">Date</label>
          <input
            className="inputBoxes"
            type="text"
            placeholder='dd/mm/yyyy'
            value={memory_date}
            onChange={handleDateChange}
            required
          />
          <button type='submit' className="button" onClick={addMemory}>
            Add Memory
          </button>
        </form>
      )}

      {/* {/* <div className="memory-list">
        {memories.map((memory, index) => (
          <div className="memory" key={index}>
            <img src={URL.createObjectURL(memory.drive_link)} alt={`Memory ${index}`} />
            <p>Title: {memory.memory_name}</p>
            <p>Description: {memory.memory_description}</p>
            <p>Location: {memory.memory_location}</p>
            <p>Date: {memory.memory_date}</p>
          </div> */}
        
      </div>
    
    
    
  );
};

export default MemoriesPage;
