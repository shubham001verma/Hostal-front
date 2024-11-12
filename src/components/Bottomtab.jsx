import React from "react";
import { NavLink,Link } from "react-router-dom";
import { FaHome, FaUsers, FaFileInvoice, FaUser, FaPlus } from "react-icons/fa";


const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <Link to="/dashboard" className="nav-item" activeClassName="active">
        <FaHome size={24} />
        <span>Dashboard</span>
      </Link>

      <Link to="/studentManagement" className="nav-item" activeClassName="active">
        <FaUsers size={24} />
        <span>Tenants</span>
      </Link>

      {/* Plus Button in the center */}
      <div className="plus-tab">
        <Link to="/addStudent" className="plus-button">
          <FaPlus size={24} />
        </Link>
      </div>

      <Link to="/transection" className="nav-item" activeClassName="active">
        <FaFileInvoice size={24} />
        <span>Transactions</span>
      </Link>

      <Link to="/profile" className="nav-item" activeClassName="active">
        <FaUser size={24} />
        <span>Profile</span>
      </Link>
    </div>
  );
};

export default BottomNav;
