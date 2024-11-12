import React,{useEffect,useState} from 'react';
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { IoMdArrowRoundBack, IoMdAdd } from "react-icons/io";
import { Link, useLocation, matchPath } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const location = useLocation();
    const { roomId } = useParams();

    const renderNavbarContent = () => {
        if (matchPath('/studentDetails/:id', location.pathname)) {
            return (
                <>
                    <Link to='/studentManagement'>
                        <IoMdArrowRoundBack size={25} color='white' />
                    </Link>
                    <h5 className='fs-5 pt-1 text-white mx-auto'>Student Details</h5>
                </>
            );
        }
        if (matchPath('/updateStudent/:id', location.pathname)) {
            return (
                <>
                    <Link to='/studentManagement'>
                        <IoMdArrowRoundBack size={25} color='white' />
                    </Link>
                    <h5 className='fs-5 pt-1 text-white mx-auto'>Update Student Details</h5>
                </>
            );
        }
        if (matchPath('/updateStaff/:id', location.pathname)) {
            return (
                <>
                    <Link to='/staffManagement'>
                        <IoMdArrowRoundBack size={25} color='white' />
                    </Link>
                    <h5 className='fs-5 pt-1 text-white mx-auto'>Update Staff Details</h5>
                </>
            );
        }
        if (matchPath('/staffDetails/:id', location.pathname)) {
            return (
                <>
                    <Link to='/staffManagement'>
                        <IoMdArrowRoundBack size={25} color='white' />
                    </Link>
                    <h5 className='fs-5 pt-1 text-white mx-auto'>Staff Details</h5>
                </>
            );
        }
        if (matchPath('/roomDetail/:roomId', location.pathname)) {
            return (
                <>
                    <Link to='/roomAllocation'>
                        <IoMdArrowRoundBack size={25} color='white' />
                    </Link>
                    <h5 className='fs-5 pt-1 text-white mx-auto'>Room {roomId}</h5>
                </>
            );
        }
        if (matchPath('/profileUpdate/:id', location.pathname)) {
            return (
                <>
                    <Link to='/profile'>
                        <IoMdArrowRoundBack size={25} color='white' />
                    </Link>
                    <h5 className='fs-5 pt-1 text-white mx-auto'>Update Profile</h5>
                </>
            );
        }

        switch (location.pathname) {
            case '/addStudent':
                return (
                    <>
                        <Link to='/studentManagement'>
                            <IoMdArrowRoundBack size={25} color='white' />
                        </Link>
                        <h5 className='fs-5 pt-1 text-white mx-auto'>Add Student</h5>
                    </>
                );
            case '/staffManagement':
                return (
                    <>
                        <Link to='/dashboard'>
                            <IoMdArrowRoundBack size={25} color='white' />
                        </Link>
                        <h5 className='fs-5 pt-1 text-white'>Staff Management</h5>
                        <Link to='/addStaff'>
                            <IoMdAdd size={25} color='white' />
                        </Link>
                    </>
                );
            case '/addStaff':
                return (
                    <>
                        <Link to='/staffManagement'>
                            <IoMdArrowRoundBack size={25} color='white' />
                        </Link>
                        <h5 className='fs-5 pt-1 text-white mx-auto'>Add Staff</h5>
                    </>
                );
               
            case '/roomAllocation':
                return (
                    <>
                        <Link to='/dashboard'>
                            <IoMdArrowRoundBack size={25} color='white' />
                        </Link>
                        <h5 className='fs-5 pt-1 mx-auto text-white'>Room Allocation</h5>
                    </>
                );
            default:
                return (
                    <>
                        <h5 className='fs-4'>Trinity Hostel</h5>
                        <MdOutlineQrCodeScanner size={25} color='white' className=' ms-auto'  />
                        
                    </>
                );
        }
    };

    return (
        <nav className='navbar col-12 fixed-top px-3' id='navbar'>
            {renderNavbarContent()}
        </nav>
    );
};

export default Navbar;

