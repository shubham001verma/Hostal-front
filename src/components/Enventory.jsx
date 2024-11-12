import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Enventory = () => {
  // New Room Form States
  const [newRoomNumber, setNewRoomNumber] = useState('');
  const [newFloor, setNewFloor] = useState('');
  const [newBeds, setNewBeds] = useState([false, false, false, false]); // 4 beds by default
  const navigate = useNavigate();

  // Handle form submission for adding a new room
  const handleAddRoom = (e) => {
    e.preventDefault();

    // Creating bed occupancy structure
    const beds = newBeds.map(isOccupied => ({ isOccupied }));

    const newRoom = {
      roomnumber: parseInt(newRoomNumber),
      floor: parseInt(newFloor),
      beds
    };

    // Send POST request to server to add the new room
    axios.post('https://hostel-repo.onrender.com/rooms', newRoom)
      .then(res => {
        // Room added successfully, reset form fields
        setNewRoomNumber(''); 
        setNewFloor('');
        setNewBeds([false, false, false, false]); // Reset bed occupancy

        // Navigate to the room listing page after successful addition (update route as necessary)
        navigate('/roomAllocation');
      })
      .catch(err => {
        // Handle errors here (for example, show an error message)
        console.log(err);
      });
  };

  // Toggle bed occupancy for the form
  const toggleBedOccupancy = (index) => {
    const updatedBeds = [...newBeds];
    updatedBeds[index] = !updatedBeds[index];
    setNewBeds(updatedBeds);
  };

  return (
    <>
      <Navbar />

      {/* Add New Room Form */}
      <div className="container add-room-form mb-4">
        <h4>Add New Room</h4>
        <form onSubmit={handleAddRoom}>
          <div className="form-group">
            <label>Room Number:</label>
            <input
              type="number"
              value={newRoomNumber}
              onChange={(e) => setNewRoomNumber(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Floor:</label>
            <select
              value={newFloor}
              onChange={(e) => setNewFloor(e.target.value)}
              required
              className="form-control"
            >
              <option value="">Select Floor</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div className="form-group">
            <label>Beds:</label>
            <div className="beds">
              {newBeds.map((isOccupied, index) => (
                <div key={index} className="bed">
                  <label>Bed {index + 1}</label>
                  <input
                    type="checkbox"
                    checked={isOccupied}
                    onChange={() => toggleBedOccupancy(index)}
                  /> Occupied
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Add Room</button>
        </form>
      </div>
    </>
  );
};

export default Enventory;

