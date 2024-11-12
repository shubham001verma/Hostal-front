import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import axios from 'axios'
import Navbar from './Navbar';
import { LuClipboardEdit } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

import { Link, useNavigate } from 'react-router-dom'
const StaffDetails = () => {
    const [data, setData] = useState([])
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate()
    useEffect(() => {

        axios.get(`https://hostel-repo.onrender.com/staff/getsinglestaff/${id}`)

            .then(res => {
                console.log(res.data); setData(res.data)
            })
            .catch(err => console.log(err))
    }, []);
    const handleDelete = (id) => {
        const confirm = window.confirm("Would you like to delete user details")
        if (confirm) {
            axios.delete(`https://hostel-repo.onrender.com/staff/deletestaff/${id}`)
                .then(res => {
                    navigate('/staffManagement')
                })
                .catch(err => console.log(err))
        }
    }
    return (
        <>
            <Navbar />
            <div className='student-details'>
                <div className='container'>
                    {/* <h2 >Staff Details</h2> */}
                    <div className='row'>
                        <div className='col-12 col-lg-12 mt-3'>
                            <div className='card p-2 mb-5'>
                                <div className='row'>

                                    <div className='col-12 col-lg-3 text-center mb-2'>
                                        <img src={`https://hostel-repo.onrender.com/${data.uploadimage}`} style={{ width: "100px", height: "100px" }} className='img2 img-fluid rounded-circle' />
                                    </div>
                                    <div className='col-12 col-lg-9'>
                                        <table className=' table table-bordered ' >
                                            <thead>
                                                <tr>
                                                    <th>Staff Name</th>
                                                    <td>
                                                        {data.name}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Dob</th>
                                                    <td>
                                                        {data.dateofbirth}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>City</th>
                                                    <td>
                                                        {data.city}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>District</th>
                                                    <td>
                                                        {data.district}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Email</th>
                                                    <td>
                                                        {data.email}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Age</th>
                                                    <td>
                                                        {data.age}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Address</th>
                                                    <td>
                                                        {data.parmanentaddress}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Mobile No</th>
                                                    <td>
                                                        {data.staffmobileno}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Post</th>
                                                    <td>
                                                        {data.post}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Resume</th>
                                                    <td>
                                                        {data.resume}
                                                    </td>
                                                </tr>


                                                <tr>
                                                    <th>Aadhar No.</th>
                                                    <td>
                                                        {data.aadharno}
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                        <div className=' card2 '>
                                            <h5 className='fs-6 fw-bold'>AadharImages:</h5>
                                            <div className='d-flex gap-2'>
                                                {data.uploadaadhar && Array.isArray(data.uploadaadhar) ? (
                                                    data.uploadaadhar.map((image, index) => (
                                                        <img key={index} src={`https://hostel-repo.onrender.com/${image}`} alt={`Aadhaar ${index + 1}`} style={{ width: "70px", height: "70px" }} className='img-fluid' />
                                                    ))
                                                ) : (
                                                    <span>No Aadhaar images available.</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className='text-center'>

                                            <Link to={`/updateStaff/${data._id}`} className='mt-4 me-2' style={{ border: 'none' }}><LuClipboardEdit size={30} color='#fada5e' /></Link>
                                            <button onClick={e => handleDelete(data._id)} className='me-3' style={{ border: 'none' }}><RiDeleteBin6Line size={30} color='red' /></button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StaffDetails