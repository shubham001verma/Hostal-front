import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { IoCallOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import moment from 'moment';

const RoomDetail = () => {
    const { roomId } = useParams(); // Get the room number from the URL
    const [students, setStudents] = useState([]); // State to hold the students
    const [feeData, setFeeData] = useState({});
    
    useEffect(() => {
        // Fetch students assigned to the room when the component mounts
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`https://hostel-repo.onrender.com/student/studentsInRoom/${roomId}`);
                setStudents(response.data); // Assuming response.data contains an array of students
            } catch (error) {
                console.error("Error fetching students", error);
            }
        };
        fetchStudents();

        // Fetch fee data for all students
        axios
            .get('https://hostel-repo.onrender.com/student/getstudentfee')
            .then((res) => {
                const feeMap = {};
                res.data.forEach(fee => {
                    feeMap[fee.studentId] = fee; // Map studentId to fee details
                });
                setFeeData(feeMap);
            })
            .catch((err) => console.log(err));
    }, [roomId]);

    // Function to calculate the remaining time until fee expiration
    const getRemainingTime = (expirationDate) => {
        const now = moment();
        const expiration = moment(expirationDate);
        const duration = moment.duration(expiration.diff(now));
        const days = Math.floor(duration.asDays());
        const hours = Math.floor(duration.asHours() % 24);
        const minutes = Math.floor(duration.asMinutes() % 60);
        return { days, hours, minutes };
    };

    return (
        <>
            <Navbar />
            <div className='room-detail container'>
                {/* <h2>Students in Room {roomId}</h2> */}
                <div className='row p-1'>
                    {students.length > 0 ? (
                        students.map(student => {
                            const feeInfo = feeData[student._id]; // Fetch the fee info based on student ID
                            let countdown = { days: 0, hours: 0, minutes: 0 };
                            let showAlert = false;

                            // Only show countdown and alert for unpaid students
                            if (feeInfo && feeInfo.paymentStatus == 'Paid' && feeInfo.expirationDate) {
                                countdown = getRemainingTime(feeInfo.expirationDate);
                                // Show alert if the fee expiration is within 3 days
                                if (countdown.days <= 3) {
                                    showAlert = true;
                                }
                            }

                            return (
                                <div className='col-12 col-lg-4 mt-3 mb-2' key={student._id}>
                                    <Link className='card'to={`/studentDetails/${student._id}`}>
                                        <div className="card-body d-flex gap-4">
                                            <img 
                                                src={`https://hostel-repo.onrender.com/${student.uploadimage}`} 
                                                style={{ width: "50px", height: "50px" }} 
                                                className='card-img' 
                                                alt='student' 
                                            />
                                            <div>
                                                <div className='d-flex justify-content-between'>
                                                    <h5>{student.name}</h5>
                                                    <div>
                                                        {/* Show due amount only if there is a due */}
                                                        {feeInfo && feeInfo.dueAmount > 0 ? (
                                                            <h6 className='text-danger'>{feeInfo.dueAmount}/- due</h6>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='d-flex flex-column gap-1'>
                                                    <div className='d-flex gap-2'>
                                                        <h6>Age-{student.age}</h6>
                                                    </div>
                                                    <div className='d-flex gap-2'>
                                                        <h6>Email-{student.email}</h6>
                                                    </div>
                                                    <div className='d-flex gap-2'>
                                                        <h6>Address-{student.parmanentaddress}</h6>
                                                    </div>
                                                    <div className='d-flex gap-2'>
                                                        <IoCallOutline size={15} color='black' />
                                                        <h6>MobileNo-{student.studentmobileno}</h6>
                                                    </div>

                                                    {/* Countdown Timer */}
                                                    {feeInfo && feeInfo.paymentStatus == 'Paid' && feeInfo.expirationDate && (
                                                        <div className="d-flex flex-column ">
                                                            <p className="text-danger">
                                                                Fee expires in {countdown.days}d {countdown.hours}h {countdown.minutes}m
                                                            </p>
                                                            {showAlert && (
                                                                <div className="alert alert-warning" role="alert">
                                                                    Fee expiration in {countdown.days} days!
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })
                    ) : (
                        <p>No students assigned to this room.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default RoomDetail;

