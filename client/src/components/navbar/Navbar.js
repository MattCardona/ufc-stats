import React from 'react'
import { Link } from 'react-router-dom';
import "./navbar.styles.scss"


const Navbar = () => {
  return (
    <div>
      <ul id="nav">
        <li><Link to="/">Best UFC Site</Link></li>
        {/* <li><Link to="/"></Link></li> */}
      </ul>
    </div>
  )
}
export default Navbar;
