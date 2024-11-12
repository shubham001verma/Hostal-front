import React, { useState, useEffect } from 'react';
import BottomNav from './Bottomtab';
import Navbar from './Navbar';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { MdOutlineBed } from "react-icons/md";
import { LiaDoorOpenSolid } from "react-icons/lia";
import { IoCallOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { MdDateRange } from "react-icons/md";
const StudentManagement = () => {
  const [data, setData] = useState([]);
  const [feeData, setFeeData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://hostel-repo.onrender.com/student/getstudent')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));

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
  }, []);

  // Filtering based on search input
  const filteredData = data.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <section className="studentmanagement mb-5" id="studentmanagement">
        <div className="container">
          <div className="search-div">
            <input
              type="text"
              placeholder="Search name or no.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch size={25} color="#ff725c" className="icon" />
          </div>
          <div className="row">
            {filteredData.length > 0 ? (
              filteredData.map((student, i) => (
                <div className="col-12 col-lg-4 p-3" key={i}>
                  <Link className="card" to={`/studentDetails/${student._id}`}>
                    <div className="card-body d-flex gap-5">
                      <img src={`https://hostel-repo.onrender.com/${student.uploadimage}`} style={{ width: "50px", height: "50px" }} className='card-img' />
                      <div>
                        <div className='d-flex justify-content-between'>

                        <h5>{student.name}</h5>
                        <div>
                         {/* Show due amount only if there is a due */}
                         {feeData[student._id] && feeData[student._id].dueAmount > 0 ? (
                              <h6 className='text-danger'>{feeData[student._id].dueAmount}/- due</h6>
                            ) : (
                              <></> // Hide if there's no fee due
                            )}
                      </div>
                        </div>
                        <div className='d-flex flex-column gap-1'>
                          
                          <div className='d-flex gap-2'>
                            <MdOutlineBed size={20} color='black' />
                            <h6>floor-{student.floornumber}</h6>
                          </div>
                          <div className='d-flex gap-2'>
                            <LiaDoorOpenSolid size={20} color='black' />
                            <h6>Room-{student.roomnumber}</h6>
                          </div>
                          <div className='d-flex gap-2'>
                          <MdDateRange size={20} color='black' />
                            <h6>Joind On:{student.registrationDate}</h6>
                          </div>
                          <div className='d-flex gap-2'>
                            <IoCallOutline size={20} color='black' />
                            <h6>MobileNo-{student.studentmobileno}</h6>
                          </div>
                          
                     
                        </div>

                      </div>
                     
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No students found</p>
            )}
          </div>
        </div>
      </section>
      <BottomNav />
    </>
  );
};

export default StudentManagement;
