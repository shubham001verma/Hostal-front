import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbHomeStats } from "react-icons/tb";

const Welcome = () => {
  const navigation = useNavigate();
  
  useEffect(() => {
    setTimeout(() => {
       navigation('/slider')
    }, 4000);
  }, []);

  return (
    <>
     <section className='welcome' id='welcome'>
      <div className='container'>
        <div className='row'>
          <div className='col-12  text-center'>
          <img src='welcome.jpg'  className=' img-fluid'/>
      <h1 className='title text-center'>Trinity Hostel</h1>
      <p className='text-center'>Join our hostel</p>
          </div>
        </div>
     
      </div>
    
     </section>
    </>
  );
};

export default Welcome;
