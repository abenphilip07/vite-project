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
        <li><Link to="/SearchByIng">Search By Ingredients</Link></li>
        <li><Link to="/SearchByDish">Search By Dish</Link></li>
        <li><Link to="/About">About</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
