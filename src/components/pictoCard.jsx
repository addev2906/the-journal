import React from 'react'
import img from '../assets/pictoimg.png'

function PictoCard({ name, found}) {
  const bg = found === 'FOUND!' ? '#4caf4f51' : '#f443364a'
  return (
    <div className="card" style={{ backgroundColor: bg }}>
      <img src={img} className="pictoimg" alt="picto" />
      <hr style={{ width: '60%', margin: '8px auto', borderColor: '#dcc6a2', boxShadow: '0px 1px 5px rgba(0,0,0,0.6)' }} />
      <h3 style={{ color: '#dcc6a2' }}>{name}</h3>
      <p style={{ color: '#ffff'}}>{found}</p>
    </div>
  )
}

export default PictoCard
