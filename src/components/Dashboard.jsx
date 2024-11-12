import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar';

import { SlGraduation } from "react-icons/sl";
import { LuUsers } from "react-icons/lu";
import Bottomtab from './Bottomtab';
import { TbReport } from "react-icons/tb";
import { MdPayment } from "react-icons/md";
import { PiGraduationCapFill } from "react-icons/pi";
import { LuBed } from "react-icons/lu";
const Dashboard = () => {
  const navigate = useNavigate()


  return (
    <>
      <Navbar />
      <section className='dashboard' id='dashboard'>
        <div className='container'>
          <h5 className=' fs-4'>User Management</h5>
          {/* <p>{suc}</p> */}
          <div className='row mt-4'>
            <div className='col-4 col-lg-3 text-center mb-3'>
              <Link to='/studentManagement'className='card '>
              <PiGraduationCapFill   size={35} color='#ff725c' className='img'/>
              <h5>Manage Student</h5>
               
              </Link>

            </div>
            <div className='col-4 col-lg-3 text-center mb-3'>
              <Link className='card' to={'/staffManagement'}>
              <LuUsers size={35} color='#ff725c' className='img' />
              <h5>Manage Staff</h5>
              </Link>

            </div>
            <div className='col-4 col-lg-3 text-center mb-3'>
              <Link className='card' to={'/manageAccount'}>
              <TbReport   size={35} color='#ff725c' className='img'/>
              <h5>Report List</h5>
              </Link>
            </div>
            <div className='col-4 col-lg-3 text-center mb-3'>
              <Link className='card' to={'/roomAllocation'}>
              <LuBed size={35} color='#ff725c' className='img'/>
              <h5>Room Allocation</h5>
              </Link>
            </div>
            <div className='col-4 col-lg-3 text-center mb-3'>
              <Link className='card' to={'/roomAllocation'}>
              <MdPayment  size={35} color='#ff725c' className='img'/>
              <h5>Add expense</h5>
              </Link>
            </div>


          </div>

        </div>
      </section>
      <Bottomtab />
    </>


  )
}

export default Dashboard