import { useState, useEffect } from 'react'
import { MouseTrail } from '@stichiboi/react-elegant-mouse-trail'

function App () {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState(null)
  const [pointerColor, setPointerColor] = useState('#FFFFFF')

  useEffect(() => {
    const handlePointerMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handlePointerMove)
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      setPosition(null)
    }
  }, [enabled])

  const buttonText = enabled ? 'Disable' : 'Enable'

  const handleButtonClick = () => {
    setEnabled(!enabled)
  }

  const handleColorPick = (event) => {
    setPointerColor(event.target.value)
  }

  return (
    <main>
      {
        position && <MouseTrail strokeColor={pointerColor} lag='0.2' lineWidthStart='15' />
      }
      <div className='container'>
        <h1>REACT MOUSE FOLLOWER</h1>
        <button onClick={handleButtonClick}>{buttonText} follow mouse</button>
        <div className='color-picker'>
          <span>Choose color</span>
          <input type='color' value={pointerColor} onChange={handleColorPick}/>
        </div>
      </div>
    </main>
  )
}

export default App
