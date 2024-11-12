import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const ProfileUpdate = () => {
    const { id } = useParams();
  const [value, setValue] = useState({
    name: '',
    email: '',
    dateofbirth: '',
    mobilenumber: '',
    uploadimage: null,
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://hostel-repo.onrender.com/admin/getadmin/${id}`)
    .then(res => setValue(res.data))
    .catch(err => console.log(err))
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData = new FormData();
    updateData.append('name', value.name);
    updateData.append('email', value.email);
    updateData.append('dateofbirth', value.dateofbirth);
    updateData.append('mobilenumber', value.mobilenumber);
    if (value.uploadimage) {
      updateData.append('uploadimage', value.uploadimage);
    }

    axios.put(`http://localhost:4000/admin/updateadmin/${id}`, updateData)
      .then(() => {
        navigate('/profile');
      })
      .catch(err => console.log(err));
  };

  return (
    <>
    <Navbar/>
    <div className="profile-update">
        <div className='container'>
        <h2>Update Details</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className='row g-3 mt-1'>
      <div  className="col-12 col-md-3 col-lg-3">
          <label>Name</label>
          <input type="text"  placeholder='Name' value={value.name} onChange={e => setValue({ ...value, name: e.target.value })} />
        </div>
        <div  className="col-12 col-md-3 col-lg-3">
          <label>Email</label>
          <input type="email"  placeholder='Email'value={value.email} onChange={e => setValue({ ...value, email: e.target.value })} />
        </div>

        <div  className="col-12 col-md-3 col-lg-3">
          <label>Date of Birth</label>
          <input type="date"  placeholder='Date of Birth'value={value.dateofbirth} onChange={e => setValue({ ...value, dateofbirth: e.target.value })} />
        </div>
        <div  className="col-12 col-md-3 col-lg-3">
          <label>Mobile No.</label>
          <input type="text"  placeholder='Mobile No.'value={value.mobilenumber} onChange={e => setValue({ ...value, mobilenumber: e.target.value })} />
        </div>
        <div  className="col-12 col-md-3 col-lg-3">
          <label>Upload Image</label>
          <input type="file" onChange={e => setValue({ ...value, uploadimage: e.target.files[0] })}/>
        </div>
        <div className='mt-5 text-center'>
        <button type="submit" className='btn2'>Update</button>
        </div>
        
      </div>
       
      </form>
        </div>
      
    </div></>
    
  );
};

export default ProfileUpdate;
