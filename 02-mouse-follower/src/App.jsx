import { useState, useEffect } from 'react'
export default function App() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    } else if (!enabled) {
      setPosition({ x: -100, y: -100 })
    }

    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  return (
    <main className='contenedor'>
      <div
        style={{
          position: 'absolute',
          zIndex: '-1',
          width: '40px',
          height: '40px',
          background: 'orange',
          pointerEvents: 'none',
          top: '-25px',
          left: '-25px',
          borderRadius: '50%',
          transform: `translate(${position.x}px,${position.y}px)`
        }}
      />
      <h1>Mouse Follower</h1>
      <button onClick={() => setEnabled(!enabled)}>{enabled ? 'Desactivar' : 'Activar'} Mouse Follower</button>
    </main>
  )
}
