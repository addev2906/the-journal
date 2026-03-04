import React from 'react'
import versoimg from '../assets/verso.png'
import './Header.css'

function Header() {
  return (
    <div className="header">
        <img src={versoimg}></img>
        <h1 style={{ color: '#dcc6a2', textShadow: '0px 1px 5px rgba(0,0,0,0.6)' }}><u>The Journal</u></h1>
        {/* <p style={{ color: '#ffff', textShadow: '0px 1px 5px rgba(0,0,0,0.6)' }}>A Picto Tracker for Expedition 33</p> */}
    </div>
  )
}
export default Header