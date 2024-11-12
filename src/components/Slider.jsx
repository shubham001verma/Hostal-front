import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

const Slider1 = () => {
    const [currentBanner, setCurrentBanner] = useState(1);
    const navigate = useNavigate(); // React Router hook for navigation

    const handleNext = (e) => {
        e.preventDefault(); // Prevent any default button behavior
        if (currentBanner < 3) {
            setCurrentBanner(currentBanner + 1);
        } else {
            navigate('/login'); // Navigate to login when "Get Started" is clicked
        }
    };

    const handleIndicatorClick = (bannerNumber) => {
        setCurrentBanner(bannerNumber);
    };

    return (
        <>
            <section className='slider' id='slider'>
                <div className='container'>
                    <div className='row'>
                        {/* Banner 1 */}
                        {currentBanner === 1 && (
                            <div className='col-12 col-lg-12 text-center'>
                                <img src='banner1.jpg' className=' img-fluid' alt="Banner 1" />
                                <h1 className='title text-center mt-5'>Banner 1</h1>
                                <p className='content text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, praesentium.</p>
                            </div>
                        )}

                        {/* Banner 2 */}
                        {currentBanner === 2 && (
                            <div className='col-12 col-lg-12 text-center'>
                                <img src='banner2.jpg' className=' img-fluid' alt="Banner 2" />
                                <h1 className='title text-center mt-5'>Banner 2</h1>
                                <p className='content text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, praesentium.</p>
                            </div>
                        )}

                        {/* Banner 3 */}
                        {currentBanner === 3 && (
                            <div className='col-12 col-lg-12 text-center'>
                                <img src='banner3.jpg' className=' img-fluid' alt="Banner 3" />
                                <h1 className='title text-center mt-5'>Banner 3</h1>
                                <p className='content text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, praesentium.</p>
                            </div>
                        )}

                        {/* Carousel Indicators */}
                        <div className='d-flex justify-content-center mt-4'>
                            <span
                                className={`indicator ${currentBanner === 1 ? 'active' : ''}`}
                                onClick={() => handleIndicatorClick(1)}
                                style={currentBanner === 1 ? activeIndicatorStyle : indicatorStyle}
                            ></span>
                            <span
                                className={`indicator ${currentBanner === 2 ? 'active' : ''}`}
                                onClick={() => handleIndicatorClick(2)}
                                style={currentBanner === 2 ? activeIndicatorStyle : indicatorStyle}
                            ></span>
                            <span
                                className={`indicator ${currentBanner === 3 ? 'active' : ''}`}
                                onClick={() => handleIndicatorClick(3)}
                                style={currentBanner === 3 ? activeIndicatorStyle : indicatorStyle}
                            ></span>
                        </div>

                        {/* Navigation buttons */}
                        <div className='container'>
                            <div className='d-flex justify-content-between pt-4 mt-4 px-4'>
                                {/* Change "Next" button to "Get Started" on the third banner */}
                                <button 
                                    className="nav-link text-center w-100" 
                                    onClick={handleNext} 
                                    style={{ border: 'none', cursor: 'pointer' }} // Custom button styles
                                >
                                    {currentBanner === 3 ? 'Get Started' : 'Next'}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

// Styles for the carousel indicators
const indicatorStyle = {
    display: 'inline-block',
    width: '13px',
    height: '13px', 
    margin: '0 5px',
    backgroundColor: '#ccc', // Default color for inactive indicators
    borderRadius: '50%',
    cursor: 'pointer',
};

const activeIndicatorStyle = {
    ...indicatorStyle, // Copy the common styles
    backgroundColor: '#ff725c', // Active indicator color
};

export default Slider1;


