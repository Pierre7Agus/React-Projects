/* eslint-disable space-before-function-paren */
import { useState } from 'react'
import './style.css'
const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({ children, isSelected, updateBoard }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard()
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

export function App() {
  const board = new Array(9).fill('a')
  const [turn, setTurn] = useState(TURNS.X)

  const updateBoard = () => {
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }

  return (
    <>
      <main className='board'>
        <h1>Tic Tac Toe</h1>
        <div className='game'>
          {
            board.map((_, index) => {
              return (
                <Square key={index} updateBoard={updateBoard}>
                  {board[index]}
                </Square>
              )
            })
          }
        </div>
        <section className='turn'>
          <Square isSelected={TURNS.X === turn}>
            {TURNS.X}
          </Square>
          <Square isSelected={TURNS.O === turn}>
            {TURNS.O}
          </Square>
        </section>
      </main>
    </>
  )
}
