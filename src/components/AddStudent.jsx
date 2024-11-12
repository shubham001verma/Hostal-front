import React, { useState, useEffect } from 'react'; // Added useEffect to handle fetching occupied beds
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { MdOutlineNoteAlt } from "react-icons/md";

const AddStudent = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    // Form data state
    const [value, setValue] = useState({
        name: "",
        dateofbirth: "",
        email: '',
        age: '',
        studentmobileno: "",
        city: "",
        district: "",
        parmanentaddress: "",
        fathername: "",
        mothername: "",
        parentsmobileno: "",
        aadharno: "",
        uploadimage: null,
        uploadaadhar: [],
        roomnumber: "",
        bednumber: "",
        floornumber: "",
        totalFee: '',
        paidAmount: '',
        registrationDate: "",
    });

    // State to hold occupied beds for the selected room
    const [occupiedBeds, setOccupiedBeds] = useState([]);

    // Fetch occupied beds whenever room number changes
    useEffect(() => {
        if (value.roomnumber) {
            fetchOccupiedBeds(value.roomnumber);
        }
    }, [value.roomnumber]);

    //Function to fetch occupied beds for a specific room
    const fetchOccupiedBeds = (roomNumber) => {
        axios.get(`https://hostel-repo.onrender.com/students/occupiedBeds?room=${roomNumber}`)
            .then(res => {
                setOccupiedBeds(res.data); // Assume res.data is an array of occupied bed numbers
            })
            .catch(err => console.log(err));
    };

    // Handle next step
    const handleNext = () => {
        if (currentStep < 5) {  // Adjusted to allow up to step 4
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

        // Validate room number
        const roomNumber = parseInt(value.roomnumber, 10);
        if (isNaN(roomNumber) || roomNumber < 1 || roomNumber > 100) {
            alert('Room number must be between 1 and 100.');
            return;
        }

        // Validate bed number
        const bedNumber = parseInt(value.bednumber, 10);
        if (isNaN(bedNumber) || bedNumber < 1 || bedNumber > 4) {
            alert('Bed number must be between 1 and 4.');
            return;
        }
        // Validate floor number
        const validFloors = ['G', '1', '2', '3'];
        if (!validFloors.includes(value.floornumber)) {
            alert('Floor number must be G, 1, 2, or 3.');
            return;
        }

        // Check if bed number is already occupied
        if (occupiedBeds.includes(bedNumber)) {
            alert('This bed is already filled.');
            return;
        }

        const formdata = new FormData();
        formdata.append("name", value.name);
        formdata.append("dateofbirth", value.dateofbirth);
        formdata.append("email", value.email);
        formdata.append("age", value.age);
        formdata.append("studentmobileno", value.studentmobileno);
        formdata.append("city", value.city);
        formdata.append("district", value.district);
        formdata.append("parmanentaddress", value.parmanentaddress);
        formdata.append("fathername", value.fathername);
        formdata.append("mothername", value.mothername);
        formdata.append("parentsmobileno", value.parentsmobileno);
        formdata.append("aadharno", value.aadharno);
        formdata.append('image1', value.uploadimage);
        // Append multiple Aadhaar images
        for (let i = 0; i < value.uploadaadhar.length; i++) {
            formdata.append('image2', value.uploadaadhar[i]);
        }
        formdata.append("roomnumber", value.roomnumber);
        formdata.append("bednumber", value.bednumber);
        formdata.append("floornumber", value.floornumber);  // Assuming floor number is provided in the form data

        formdata.append('totalFee', value.totalFee);
        formdata.append('paidAmount', value.paidAmount);
        formdata.append('registrationDate', value.registrationDate);

        axios.post('https://hostel-repo.onrender.com/student/addstudent', formdata)
            .then(res => {
                if (res.data.error) {
                    alert(res.data.error); // Show the error message from the backend
                } else {
                    navigate('/roomAllocation');
                }
            })
            .catch(err => {
                // If the error is due to the room being full, show a specific message
                if (err.response && err.response.data && err.response.data.error) {
                    alert(err.response.data.error);
                } else {
                    console.log(err);
                }
            });
    };
    // Handle multiple Aadhaar file selection
    const handleAadharFileChange = (e) => {
        setValue({ ...value, uploadaadhar: e.target.files });
    };

    return (
        <>
            <Navbar />
            <div className='student-form container '>
                <form onSubmit={handleSubmit}>
                    {currentStep === 1 && (
                        <div className="row g-3 mt-1  form-step">
                            <h2>Student Details</h2>
                            <div className="col-12 col-md-3 col-lg-3">
                                <label className="form-label">Student Name</label>
                                <input type="text" placeholder="Student Name" value={value.name} onChange={e => setValue({ ...value, name: e.target.value })} required />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3">
                                <label className="form-label">Date Of Birth</label>
                                <input type="date" value={value.dateofbirth} onChange={e => setValue({ ...value, dateofbirth: e.target.value })} required/>
                            </div>
                            <div className="col-12 col-md-3 col-lg-3">
                                <label className="form-label">Email</label>
                                <input type="text" placeholder="Email" value={value.email} onChange={e => setValue({ ...value, email: e.target.value })} required/>
                            </div>
                            <div className="col-12 col-md-3 col-lg-3">
                                <label className="form-label">Age</label>
                                <input type="text" placeholder="Age" value={value.age} onChange={e => setValue({ ...value, age: e.target.value })} />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3">
                                <label className="form-label">Student Mobile No.</label>
                                <input type="text" placeholder="Mobile No" value={value.studentmobileno} onChange={e => setValue({ ...value, studentmobileno: e.target.value })} required/>
                            </div>
                            <div className="col-12 col-md-3 col-lg-3">
                                <label className="form-label">City</label>
                                <select value={value.city} onChange={e => setValue({ ...value, city: e.target.value })}>
                                    <option value="">Select City</option>
                                    <option>Raipur</option>
                                    <option>Bilashpur</option>
                                    <option>Durg</option>
                                    <option>Dantevada</option>
                                    <option>Bhilai</option>
                                </select>
                            </div>
                            <div className="col-12 col-md-3 col-lg-6">
                                <label className="form-label">District</label>
                                <input type="text" placeholder='District' value={value.district} onChange={e => setValue({ ...value, district: e.target.value })} required/>
                            </div>
                            <div className="col-12 col-md-6">
                                <label htmlFor="inputZip" className="form-label">Permanent Address</label>
                                <input type="text" placeholder='Permanent Address' value={value.parmanentaddress} onChange={e => setValue({ ...value, parmanentaddress: e.target.value })} />
                            </div>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div className="row g-3 mt-1 form-step">
                            <h2>Parents Details</h2>
                            <div className="col-12 col-md-4 col-lg-4">
                                <label className="form-label">Father's Name</label>
                                <input type="text" placeholder="Father's Name" value={value.fathername} onChange={e => setValue({ ...value, fathername: e.target.value })} />
                            </div>
                            <div className="col-12 col-md-4 col-lg-4">
                                <label className="form-label">Mother's Name</label>
                                <input type="text" placeholder='Mothers Name' value={value.mothername} onChange={e => setValue({ ...value, mothername: e.target.value })} />
                            </div>
                            <div className="col-12 col-md-4 col-lg-4">
                                <label className="form-label">Parents Mobile No.</label>
                                <input type="text" placeholder="Mobile No." value={value.parentsmobileno} onChange={e => setValue({ ...value, parentsmobileno: e.target.value })} />
                            </div>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div className="row g-3 mt-2 form-step">
                            <h2>Documentation</h2>
                            <div className="col-12 col-md-4 col-lg-4">
                                <label className="form-label">Aadhar No.</label>
                                <input type="text" placeholder="Enter Aadhar No." value={value.aadharno} onChange={e => setValue({ ...value, aadharno: e.target.value })} />
                            </div>
                            <div className="col-12 col-md-4 col-lg-4">
                                <label className="form-label">Upload Image</label>
                                <input type="file" onChange={e => setValue({ ...value, uploadimage: e.target.files[0] })} />
                            </div>
                            <div className="col-12 col-md-4 col-lg-4">
                                <label className="form-label">Upload Aadhar</label>
                                <input type="file" onChange={handleAadharFileChange} multiple />
                            </div>
                        </div>
                    )}
                    {currentStep === 4 && (
                        <div className="row g-3 mt-2 form-step">
                            <h2>Room Allotment</h2>
                            <div className="col-12 col-md-4 col-lg-4">
                                <label className="form-label">Room Number</label>
                                <input type="text" placeholder="Enter Room Number" value={value.roomnumber} onChange={e => setValue({ ...value, roomnumber: e.target.value })} required/>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4">
                                <label className="form-label">Floor Number</label>
                                <select value={value.floornumber} onChange={e => setValue({ ...value, floornumber: e.target.value })}>
                                    <option value="">Select Floor</option>
                                    <option>G</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4">
                                <label className="form-label">Bed Number</label>
                                <input type="text" placeholder="Bed Number" value={value.bednumber} onChange={e => setValue({ ...value, bednumber: e.target.value })} required />

                            </div>
                        </div>
                    )}
                    {currentStep === 5 && (
                        <div className="row g-3 mt-2 form-step">
                            <h2>Fee Details</h2>
                            <div className="col-12 col-md-4">
                                <label className="form-label">Total Fee</label>
                                <input
                                    type="number"
                                    placeholder="Enter Total Fee"
                                    value={value.totalFee}
                                    onChange={(e) => setValue({ ...value, totalFee: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-12 col-md-4">
                                <label className="form-label">Paid Amount</label>
                                <input
                                    type="number"
                                    placeholder="Enter Paid Amount"
                                    value={value.paidAmount}
                                    onChange={(e) => setValue({ ...value, paidAmount: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-12 col-md-4 ">
                                <label className="form-label">Registration Date</label>
                                <input type="date" value={value.registrationDate} onChange={e => setValue({ ...value, registrationDate: e.target.value })} />
                            </div>
                        </div>
                    )}
                    <div className="form-navigation text-center">
                        {currentStep > 1 && (
                            <button type="button" className='btn2' onClick={handlePrev}>
                                Previous
                            </button>
                        )}
                        {currentStep < 5 && (
                            <button type="button" className='btn2' onClick={handleNext}>
                                Next
                            </button>
                        )}
                        {currentStep === 5 && <button type="submit" className='btn2'>Submit</button>}
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddStudent;
