import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidHide } from "react-icons/bi";
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://hostel-repo.onrender.com/admin/login', { email, password });
            // Ensure the response has a valid structure
            if (response.data.token) {
                // Optionally save the token in localStorage or context
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            } else {
                console.error("Login failed:", response.data.error);
                alert(response.data.error); // Provide feedback to the user
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred while logging in.");
        }
    };

    return (
        <section className='login' id='login'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 p-4'>
                        <div className='login-container text-center'>
                            <form onSubmit={handleSubmit}>
                                <img src='login.jpg' className='avtar img-fluid' alt="Login" />
                                <h2 className='text-center'>Welcome Back!</h2>
                                <h6 className='text-center'>Please enter your details.</h6>

                                <div className='input-box'>
                                    <div className='text-start p-1'>
                                        <label>Email</label>
                                    </div>
                                    <div className='input-div'>
                                        <input
                                            type='email'
                                            required
                                            placeholder='Email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className='text-start p-1'>
                                        <label>Password</label>
                                    </div>
                                    <div className='input-div'>
                                        <input
                                            type='password'
                                            required
                                            placeholder='Password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <BiSolidHide className='icon' size={26} color='#56535e' />
                                    </div>
                                </div>

                                <div className='text-end mt-1'>
                                    <a href='#' className='text-decoration-none' id='forget'>
                                        Recovery Password
                                    </a>
                                </div>

                                <button className='btns mt-3'>Login</button>
                                <div className='container'>
                                    <hr className='line' />
                                </div>

                                <h6>Not a member? <span>Register now</span></h6>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
