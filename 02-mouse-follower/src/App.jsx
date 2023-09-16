import { useEffect, useState } from 'react'
export default function App() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  return (
    <main className='contenedor'>
      <div
        className='follower'
        style={{
          position: 'absolute',
          background: 'orange',
          width: '40px',
          height: '40px',
          top: '-20px',
          pointerEvents: 'none',
          left: '-20px',
          borderRadius: '50%',
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      <h1>Mouse Follower</h1>
      <button onClick={() => setEnabled(!enabled)}> {enabled ? 'Desactivar' : 'Activar'} Mouse Follower </button>
    </main>
  )
}
