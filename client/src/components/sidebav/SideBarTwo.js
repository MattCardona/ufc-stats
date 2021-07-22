import React, { Component } from 'react'
import './sidebartwo.styles.scss'
import { Link } from 'react-router-dom'

const SideBarTwo = ({ toggle }) => {
  return (
    <div className="area" id="side_bar">
      <nav className="main-menu">
        <ul>
          <li>
            <Link to="/">
              <i className="fa fa-home fa-2x"></i>
              <span className="nav-text">
                Home
              </span>
              {/* </a> */}
            </Link>

          </li>

          <li onClick={() => toggle("all_stats")} >
            <i className="fa fa-chart-bar fa-3x"></i>
            <span className="nav-text">
              All Statistics
            </span>
          </li>
          <li onClick={() => toggle("strikes")} >
            <i className="fa fa-hand-rock fa-2x"></i>
            <span className="nav-text">
              Strike Stats
            </span>
          </li>
          <li onClick={() => toggle("defense")}  >
            <i className="fa fa-shield-alt fa-2x"></i>
            <span className="nav-text">
              Takedown Stats
            </span>
          </li>
          <li onClick={() => toggle("bio")} >
            <i className="fa fa-user fa-2x"></i>
            <span className="nav-text">
              Fighter Bio
            </span>
          </li>
        </ul>
      </nav>
    </div >
  )
};

export default SideBarTwo;