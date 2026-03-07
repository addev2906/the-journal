import React, { useLayoutEffect, useRef, useState } from 'react'
import img from '../assets/pictoimg.png'

function PictoCard({ name, found}) {
  const nameRef = useRef(null)
  const [nameFontSize, setNameFontSize] = useState(20)

  // Keep the font size as small as needed to keep the name on one line.
  useLayoutEffect(() => {
    const el = nameRef.current
    if (!el) return

    const MIN_FONT_SIZE = 12
    let nextSize = nameFontSize

    // Apply the current font size, then check if the text would wrap
    el.style.fontSize = `${nextSize}px`

    // If it already fits, nothing to do.
    if (el.scrollWidth <= el.clientWidth) return

    while (nextSize > MIN_FONT_SIZE && el.scrollWidth > el.clientWidth) {
      nextSize -= 1
      el.style.fontSize = `${nextSize}px`
    }

    if (nextSize !== nameFontSize) setNameFontSize(nextSize)
  }, [name, nameFontSize])

  const bg = found === 'FOUND!' ? '#28cb6c' : '#1a1a1a'
  return (
    <div className="card" style={{ backgroundColor: '#252525', borderColor: bg, boxShadow: `0px 1px 5px ${bg}` }}>
      <img src={img} className="pictoimg" alt="picto" style={{marginTop:'15px'}} />
      <hr style={{ width: '60%', margin: '8px auto', borderColor: '#a2b8dd', boxShadow: '0px 1px 6px rgba(0,0,0,0.6)' }} />
      <h3
        ref={nameRef}
        style={{
          color: '#dcc6a2',
          fontSize: `${nameFontSize}px`,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {name}
      </h3>
      <p style={{ color: '#ffff', fontSize:'18px', fontFamily: 'Bebas Neue' , letterSpacing: '0.05em'}}>{found == "FOUND!" ? "An Advantage!" : "Not Found"}</p>
    </div>
  )
}

export default PictoCard
