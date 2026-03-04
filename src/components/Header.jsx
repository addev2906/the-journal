import React from 'react'
import versoimg from '../assets/verso.png'
import './Header.css'

function Header() {
  return (
    <div className="header">
        <img src={versoimg}></img>
        <h1 style={{ color: '#9b825a', textShadow: '0px 1px 5px rgba(0,0,0,0.6)' }}><u>The Journal</u></h1>
        <div></div>
        <h2 style={{ color: '#dcc6a2', textShadow: '0px 1px 5px rgba(0,0,0,0.6)' , marginTop: '-50px'}}>A Pictos Tracker for Expedition 33</h2>
    </div>
  )
}
export default Header