import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { FaBed } from "react-icons/fa6";
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RoomAllocation = () => {
    const [rooms, setRooms] = useState([]); // State to hold room data
    const [occupiedBeds, setOccupiedBeds] = useState({}); // State to hold occupied beds for each room
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term
    const [selectedFloor, setSelectedFloor] = useState(''); // State for the selected floor

    // Define the floors, with 'G' representing Ground Floor
    const floors = ['G', 1, 2, 3];

    // Fetch all room numbers when component mounts
    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const roomNumbers = Array.from({ length: 100 }, (_, i) => i + 1); // Create an array of room numbers from 1 to 100
            setRooms(roomNumbers);
            // Fetch occupied beds for all rooms at once
            fetchOccupiedBeds(roomNumbers);
        } catch (error) {
            console.error("Error fetching room numbers", error);
        }
    };

    // Function to fetch occupied beds for all rooms
    const fetchOccupiedBeds = async (roomNumbers) => {
        try {
            const responses = await Promise.all(
                roomNumbers.map(roomNumber =>
                    axios.get(`https://hostel-repo.onrender.com/student/occupiedBeds?room=${roomNumber}`)
                )
            );

            const occupiedBedsData = {};
            responses.forEach((response, index) => {
                occupiedBedsData[roomNumbers[index]] = response.data; // Assuming response.data is an array of occupied bed numbers
            });
            setOccupiedBeds(occupiedBedsData);
        } catch (error) {
            console.error("Error fetching occupied beds", error);
        }
    };

    // Map room numbers to their respective floors based on room number
    const getFloorForRoom = (room) => {
        if (room >= 1 && room <= 25) return 'G'; // Ground floor for rooms 1 to 25
        if (room >= 26 && room <= 50) return '1';  // Floor 1 for rooms 26 to 50
        if (room >= 51 && room <= 75) return '2';  // Floor 2 for rooms 51 to 75
        if (room >= 76 && room <= 100) return '3'; // Floor 3 for rooms 76 to 100
        return null;
    };

    // Filtered rooms based on the search term and selected floor
    const filteredRooms = rooms.filter(room => {
        const roomFloor = getFloorForRoom(room); // Get the floor for the room
        const matchesSearchTerm = room.toString().includes(searchTerm); // Match search term
        const matchesFloor = selectedFloor ? roomFloor === selectedFloor : true; // Match selected floor
        return matchesSearchTerm && matchesFloor;
    });

    return (
        <>
            <Navbar />
            <div className='room-allocation container'>
                {/* <h2>Room Allocation</h2> */}
                <div className='row d-flex'>
                    <div className='col-10 col-lg-10'>
                        <div className="search-div">
                            <input 
                                type="text" 
                                placeholder="Search Room Number" 
                                value={searchTerm} 
                                onChange={e => setSearchTerm(e.target.value)} 
                            />
                            <FaSearch size={25} color="#ff725c" className="icon" />
                        </div>
                    </div>
                    <div className='col-2 col-lg-2'>
                        <div className="">
                            <select id="select-floor" value={selectedFloor} onChange={e => setSelectedFloor(e.target.value)}>
                                <option value="" >All Floors</option>
                                {floors.map(floor => (
                                    <option key={floor} value={floor.toString()}>{floor === 'G' ? 'G  Floor' : ` ${floor}Floor`}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {filteredRooms.map(room => {
                    const occupied = occupiedBeds[room] || []; // Get occupied beds for the room or an empty array
                    const occupiedCount = occupied.length; // Count of occupied beds
                    const availableCount = 4 - occupiedCount; // Assuming each room has 4 beds

                    return (
                        <div className='row' key={room}>
                            <div className='col-12 col-lg-4 mt-3 px-3'>
                                <Link className="card p-2 mb-2 " to={`/roomDetail/${room}`}>
                                    <h3 className='text-center title'>Room {room}</h3>
                                    <div className='card-body'>
                                        <div className="bed-icon">
                                            {[1, 2, 3, 4].map(bed => (
                                                <FaBed key={bed} size={30} color={occupied.includes(bed) ? '#ff725c' : 'gray'} />
                                            ))}
                                        </div>
                                        <div className="bed-legend mt-3">
                                            <h6>Occupied Beds: {occupiedCount}</h6>
                                            <h6>Available Beds: {availableCount}</h6>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default RoomAllocation;






