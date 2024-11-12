import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import axios from 'axios'
import Navbar from './Navbar';
import { LuClipboardEdit } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

import { Link, useNavigate } from 'react-router-dom'
const StudentDetails = () => {
    const [data, setData] = useState([])
    const [feeData, setFeeData] = useState({});
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate()
    useEffect(() => {

        axios.get(`https://hostel-repo.onrender.com/student/getsinglestudent/${id}`)

            .then(res => {
                console.log(res.data); setData(res.data)
            })
            .catch(err => console.log(err))

        axios
            .get(`https://hostel-repo.onrender.com/student/getstudentfees/${id}`)
            .then((res) => {
                setFeeData(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);
    const handleDelete = (id) => {
        const confirm = window.confirm("Would you like to delete user details")
        if (confirm) {
            axios.delete(`https://hostel-repo.onrender.com/student/deletestudent/${id}`)
                .then(res => {
                    navigate('/studentManagement')
                })
                .catch(err => console.log(err))
        }
    }
    return (
        <>
            <Navbar />
            <div className='student-details'>
                <div className='container'>
                    {/* <h2 >Student Details</h2> */}
                    <div className='row'>
                        <div className='col-12 col-lg-12 mt-3'>
                            <div className='card p-2 mb-5'>
                                <div className='row'>

                                    <div className='col-12 col-lg-3 text-center mb-2'>
                                        <img src={`https://hostel-repo.onrender.com/${data.uploadimage}`} style={{ width: "110px", height: "110px" }} className='img2 img-fluid rounded-circle' />
                                    </div>
                                    <div className='col-12 col-lg-9'>
                                        <table className=' table table-bordered ' >
                                            <thead>
                                                <tr>
                                                    <th>Student Name</th>
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
                                                    <th>Student No</th>
                                                    <td>
                                                        {data.studentmobileno}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Father Name</th>
                                                    <td>
                                                        {data.fathername}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Mother Name</th>
                                                    <td>
                                                        {data.mothername}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Parents No.</th>
                                                    <td>
                                                        {data.parentsmobileno}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Aadhar No.</th>
                                                    <td>
                                                        {data.aadharno}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Room No.</th>
                                                    <td>
                                                        {data.roomnumber}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Bed No.</th>
                                                    <td>
                                                        {data.bednumber}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Floor No.</th>
                                                    <td>
                                                        {data.floornumber}
                                                    </td>
                                                </tr>

                                                {/* Fee details */}
                                                <tr>
                                                    <th>Total Fee</th>
                                                    <td>{feeData.totalFee || 'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <th>Paid Amount</th>
                                                    <td>{feeData.paidAmount || 'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <th>Due Amount</th>
                                                    <td>{feeData.dueAmount || 'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <th>Pay Status</th>
                                                    <td>{feeData.paymentStatus || 'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <th>Pay Date</th>
                                                    <td>
                                                        {feeData.paymentDate
                                                            ? new Date(feeData.paymentDate).toLocaleDateString()
                                                            : 'N/A'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Exp Date</th>
                                                    <td>
                                                        {feeData.expirationDate
                                                            ? new Date(feeData.expirationDate).toLocaleDateString()
                                                            : 'N/A'}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th>Register Date</th>
                                                    <td>
                                                        {data.registrationDate}
                                                    </td>
                                                </tr>


                                            </thead>

                                        </table>
                                        <div className=' card2'>
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

                                            <Link to={`/updateStudent/${data._id}`} className='mt-4 me-2' style={{ border: 'none' }}><LuClipboardEdit size={30} color='#fada5e' /></Link>
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

export default StudentDetails