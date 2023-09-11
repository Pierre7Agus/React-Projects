/* eslint-disable space-before-function-paren */
import { useState } from 'react'
import './style.css'
const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

export function App() {
  const [board, setBoard] = useState(new Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)

  const updateBoard = (index) => {
    if (board[index]) return
    const newBoard = structuredClone(board)
    newBoard[index] = turn
    setBoard(newBoard)
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
                <Square key={index} updateBoard={updateBoard} index={index}>
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
