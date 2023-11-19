import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="Title">
        <p>Recipe Search</p>
      </div>
      <ul className="menu">
        <li><Link to="/SearchByIng">SearchByIng</Link></li>
        <li><Link to="/SearchByDish">SearchByDish</Link></li>
        <li><Link to="/About">About</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
