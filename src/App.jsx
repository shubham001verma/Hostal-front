import React from 'react';
import './App.css';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import StudentManagement from './components/StudentManagement';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StaffManagement from './components/StaffManagement';
import RoomAllocation from './components/RoomAllocation';
import Slider from './components/Slider';
import AddStudent from './components/AddStudent';
import Transection from './components/Transection';
import Profile from './components/Profile';
import AddStaff from './components/AddStaff';
import Enventory from './components/Enventory';
import StudentDetails from './components/StudentDetails';
import StaffDetails from './components/StaffDetails';
import RoomDetail from './components/RoomDetail';
import UpdateStudent from './components/UpdateStudent';
import UpdateStaff from './components/UpdateStaff';
import ProfileUpdate from './components/profileUpdate';
import AuthRoute from './components/AuthRoute'; // Import AuthRoute

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path='/slider' element={<Slider />} />
                <Route path='/login' element={<Login />} />

                {/* Protected Routes */}
                <Route path='/dashboard' element={<AuthRoute><Dashboard /></AuthRoute>} />
                <Route path='/studentManagement' element={<AuthRoute><StudentManagement /></AuthRoute>} />
                <Route path='/staffManagement' element={<AuthRoute><StaffManagement /></AuthRoute>} />
                <Route path='/roomAllocation' element={<AuthRoute><RoomAllocation /></AuthRoute>} />
                <Route path='/addStudent' element={<AuthRoute><AddStudent /></AuthRoute>} />
                <Route path='/transection' element={<AuthRoute><Transection /></AuthRoute>} />
                <Route path='/profile' element={<AuthRoute><Profile /></AuthRoute>} />
                <Route path='/addStaff' element={<AuthRoute><AddStaff /></AuthRoute>} />
                <Route path='/enventory' element={<AuthRoute><Enventory /></AuthRoute>} />
                <Route path='/studentDetails/:id' element={<AuthRoute><StudentDetails /></AuthRoute>} />
                <Route path='/staffDetails/:id' element={<AuthRoute><StaffDetails /></AuthRoute>} />
                <Route path="/roomDetail/:roomId" element={<AuthRoute><RoomDetail /></AuthRoute>} />
                <Route path='updateStudent/:id' element={<AuthRoute><UpdateStudent /></AuthRoute>} />
                <Route path='/updateStaff/:id' element={<AuthRoute><UpdateStaff /></AuthRoute>} />
                <Route path='/profileUpdate/:id' element={<AuthRoute><ProfileUpdate /></AuthRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
