import React, { useState, useEffect } from 'react';

import Navbar from './Navbar';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { IoBagOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const StaffManagement = () => {
  const [data, setData] = useState([]); // Initializing as an array
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://hostel-repo.onrender.com/staff/getallstaff')
      .then((res) => {
        // Access the array inside res.data.data
        if (Array.isArray(res.data.data)) {
          setData(res.data.data);
        } else {
          console.error('Expected an array but got:', res.data);
          setData([]); // Fallback to an empty array if response is not an array
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Filtering based on search input
  const filteredData = Array.isArray(data)
    ? data.filter((staff) =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <Navbar />
      <section className="staffmanagement" id="staffmanagement">
        <div className="container">
          <div className="search-div">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch size={25} color="#ff725c" className="icon" />
          </div>
          <div className="row">
            {filteredData.length > 0 ? (
              filteredData.map((staff,i) => (
                <div className="col-12 col-lg-4 p-3" key={i}>
                  <Link className="card" to={`/staffDetails/${staff._id}`}>
                    <div className="card-body d-flex gap-5">
                      <img
                        src={`https://hostel-repo.onrender.com/${staff.uploadimage}`}
                        style={{ width: '50px', height: '50px' }}
                        className="card-img"
                        alt={staff.name}
                      />
                      <div>
                        <div className="d-flex flex-column gap-1">
                          <h5>{staff.name}</h5>
                          <div className='d-flex gap-2'>
                          <IoBagOutline color='black' size={20}/>
                          <h6>post-{staff.post}</h6>
                          </div>
                          <div className='d-flex gap-2'>
                        <IoCallOutline  size={20} color='black' />
                        <h6>MobileNo-{staff.staffmobileno}</h6>
                        </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No staff found</p>
            )}
          </div>
        </div>
      </section>
     
    </>
  );
};

export default StaffManagement;





