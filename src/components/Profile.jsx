import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdMarkEmailRead } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import Navbar from './Navbar';
import Bottomtab from './Bottomtab';

const Profile = () => {
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await axios.get('https://hostel-repo.onrender.com/admin/getadmins');
        setAdmins(res.data);
      } catch (err) {
        console.error("Failed to fetch admins:", err);
      }
    };

    fetchAdmins();
  }, []);

  // Logout function
  const handleLogout = () => {
    // Clear the token from localStorage or sessionStorage
    localStorage.removeItem('token'); // Assuming token is stored in localStorage

    // Optionally, you can notify the server that the user is logged out
    axios.post('https://hostel-repo.onrender.com/admin/logout')
      .then(() => {
        // Redirect to the login page after logout
        navigate('/login');
      })
      .catch((err) => {
        console.error('Logout failed:', err);
      });
  };

  return (
    <>
      <Navbar  />
      <div className='profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-lg-12'>
              <div className='card'>
                <div className='row mt-3 text-center justify-content-center p-5'>
                  {admins.length > 0 ? (
                    admins.map((admin) => (
                      <div className='col-12 col-lg-3 mb-4 ' key={admin._id}>
                        <div className='admin-card '>
                          <img
                            src={`https://hostel-repo.onrender.com/${admin.uploadimage}`}
                            alt={admin.name}
                            style={{ width: "120px", height: "120px" }}
                            className='img2 img-fluid rounded-circle'
                          />
                          <h5 className='mt-4 fs-2'>{admin.name}</h5>
                          <div className='d-flex gap-2 mt-4 ms-3'>
                            <MdOutlineDateRange size={20} color='black' />
                            <h6 className='fs-6'>Dob:  {admin.dateofbirth}</h6>
                          </div>
                          <div className='d-flex gap-2 mt-2 ms-3'>
                            <MdMarkEmailRead size={20} color='black' />
                            <h6 className='fs-6'>Email:  {admin.email}</h6>
                          </div>
                          <div className='d-flex gap-2 mt-2 ms-3'>
                            <IoCallOutline size={20} color='black' />
                            <h6 className='fs-6'>Mobile No. +91 {admin.mobilenumber}</h6>
                          </div>
                          <div className='admin-actions d-flex justify-content-center mt-4 gap-3'>
                            <Link to={`/profileUpdate/${admin._id}`} className='btn2'>
                              EditProfile
                            </Link>
                            <button onClick={handleLogout} className='btn2'>
                              Logout
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No admins found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Bottomtab />
    </>
  );
};

export default Profile;
