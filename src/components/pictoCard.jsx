import React from 'react'
import img from '../assets/pictoimg.png'

function PictoCard({ name, found}) {
  const bg = found === 'FOUND!' ? '#28cb6c' : '#1a1a1a'
  return (
    <div className="card" style={{ backgroundColor: '#252525', borderColor: bg, boxShadow: `0px 1px 5px ${bg}` }}>
      <img src={img} className="pictoimg" alt="picto" style={{marginTop:'15px'}} />
      <hr style={{ width: '60%', margin: '8px auto', borderColor: '#a2b8dd', boxShadow: '0px 1px 6px rgba(0,0,0,0.6)' }} />
      <h3 style={{ color: '#dcc6a2' }}>{name}</h3>
      <p style={{ color: '#ffff', fontSize:'18px', fontFamily: 'Bebas Neue' , letterSpacing: '0.05em'}}>{found == "FOUND!" ? "An Advantage!" : "Not Found"}</p>
    </div>
  )
}

export default PictoCard
