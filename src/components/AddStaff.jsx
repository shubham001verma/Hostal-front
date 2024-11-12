import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


const AddStaff = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    
    // Form data state
    const [value, setValue] = useState({
        name: "",
        dateofbirth: "",
        email: "",
        age:"",
        staffmobileno: "",
        city: "",
        district: "",
        parmanentaddress: "",
        post:"",
        resume: null,
        aadharno: "",
        uploadimage: null,
        uploadaadhar: [],
        
       
    });

    // Handle next step
    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    // Handle previous step
    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

       

        const formdata = new FormData();
        formdata.append("name", value.name);
        formdata.append("dateofbirth", value.dateofbirth);
        formdata.append("email", value.email);
        formdata.append("age", value.age);
        formdata.append("staffmobileno", value.staffmobileno);
        formdata.append("city", value.city);
        formdata.append("district", value.district);
        formdata.append("parmanentaddress", value.parmanentaddress);
        formdata.append("post", value.post);
        formdata.append("image3", value.resume);
        formdata.append("aadharno", value.aadharno);
        formdata.append("image1", value.uploadimage);
         // Append multiple Aadhaar images
         for (let i = 0; i < value.uploadaadhar.length; i++) {
            formdata.append('image2', value.uploadaadhar[i]);
        }

     

        // Send form data to the server
        axios.post('https://hostel-repo.onrender.com/staff/addstaff', formdata)
            .then(res => {
                if (res.data.error) {
                    alert(res.data.error); // Handle error (e.g., room number conflict)
                } else {
                    navigate('/staffManagement');
                }
            })
            .catch(err => console.log(err));
    };
   // Handle multiple Aadhaar file selection
   const handleAadharFileChange = (e) => {
    setValue({ ...value, uploadaadhar: e.target.files });
};
    return (
        <>
            <Navbar />
            <div className='staff-form container'>
                <form onSubmit={handleSubmit}>
                    {currentStep === 1 && (
                        <div className="row g-3 mt-1 form-step">
                            <h2>Staff Personal Details</h2>
                            <div className="col-12 col-md-6">
                                <label className="form-label">Full Name</label>
                                <input type="text" placeholder="Full Name" value={value.name} onChange={e => setValue({ ...value, name: e.target.value })} required />
                            </div>
                            <div className="col-12 col-md-6">
                                <label className="form-label">Date of Birth</label>
                                <input type="date" value={value.dateofbirth} onChange={e => setValue({ ...value, dateofbirth: e.target.value })}required />
                            </div>
                            <div className="col-12 col-md-6">
                                <label className="form-label">Email</label>
                                <input type="email" placeholder="Email" value={value.email} onChange={e => setValue({ ...value, email: e.target.value })} />
                            </div>
                            <div className="col-12 col-md-6">
                                <label className="form-label">Age</label>
                                <input type="email" placeholder="Age" value={value.age} onChange={e => setValue({ ...value, age: e.target.value })} />
                            </div>
                            <div className="col-12 col-md-6">
                                <label className="form-label">Mobile No.</label>
                                <input type="text" placeholder="Mobile No." value={value.staffmobileno} onChange={e => setValue({ ...value, staffmobileno: e.target.value })} required />
                            </div>
                            <div className="col-12 col-md-6">
                                <label className="form-label">City</label>
                                <input type="text" placeholder="City" value={value.city} onChange={e => setValue({ ...value, city: e.target.value })} />
                            </div>
                            <div className="col-12 col-md-6">
                                <label className="form-label">District</label>
                                <input type="text" placeholder="District" value={value.district} onChange={e => setValue({ ...value, district: e.target.value })} />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Address</label>
                                <input type="text" placeholder="Address" value={value.parmanentaddress} onChange={e => setValue({ ...value, parmanentaddress: e.target.value })} />
                            </div>
                            
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div className="row g-3 mt-1 form-step">
                            <h2>Job Information</h2>
                            <div className="col-12 col-md-6">
                                <label className="form-label">Post</label>
                                <input type="text" placeholder="Post" value={value.post} onChange={e => setValue({ ...value, post: e.target.value })} required/>
                            </div>
                            <div className="col-12 col-md-6">
                                <label className="form-label">Upload Resume</label>
                                <input type="file" onChange={e => setValue({ ...value, resume: e.target.files[0] })} required/>
                            </div>
                           
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div className="row g-3 mt-2 form-step">
                            <h2>Documentation & Emergency Contact</h2>
                            <div className="col-12 col-md-6">
                                <label className="form-label">Aadhar No.</label>
                                <input type="text" placeholder="Enter Aadhar No." value={value.aadharno} onChange={e => setValue({ ...value, aadharno: e.target.value })} required/>
                            </div>
                           
                            <div className="col-12 col-md-6">
                                <label className="form-label">Upload Profile Image</label>
                                <input type="file" onChange={e => setValue({ ...value, uploadimage: e.target.files[0] })} />
                            </div>
                            <div className="col-12 col-md-6">
                                <label className="form-label">Upload Aadhar</label>
                                <input type="file" onChange={handleAadharFileChange} multiple/>
                            </div>
                        </div>
                    )}

                    <div className="form-navigation text-center">
                        {currentStep > 1 && (
                            <button type="button" className="btn2" onClick={handlePrev}>
                                Previous
                            </button>
                        )}
                        {currentStep < 3 && (
                            <button type="button" className="btn2" onClick={handleNext}>
                                Next
                            </button>
                        )}
                        {currentStep === 3 && (
                            <button type="submit" className="btn2">
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddStaff;