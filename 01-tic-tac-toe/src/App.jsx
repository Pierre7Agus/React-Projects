/* eslint-disable space-before-function-paren */
import { useState } from 'react'
import './style.css'
import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinner, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'

export function App() {
  const [board, setBoard] = useState(() => {
    const boardStorage = window.localStorage.getItem('board')
    return boardStorage ? JSON.parse(boardStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X
  })
  const [winner, setWinner] = useState(null) // sea false hay empate y cuando no sea ni false ni null hay ganador

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = structuredClone(board)
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', JSON.stringify(newTurn))
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
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

        <WinnerModal resetGame={resetGame} winner={winner} />

      </main>
    </>
  )
}
