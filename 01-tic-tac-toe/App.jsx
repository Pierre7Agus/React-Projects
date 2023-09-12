/* eslint-disable space-before-function-paren */
import { useState } from 'react'
import './style.css'
const TURNS = {
  X: 'x',
  O: 'o'
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

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
  const [winner, setWinner] = useState(null) // sea false hay empate y cuando no sea ni false ni null hay ganador

  const checkWinner = (newBoard) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a]
      }
    }
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every(square => square !== null)
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = structuredClone(board)
    newBoard[index] = turn
    setBoard(newBoard)
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
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

      {

        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>{winner ? 'Ganó: ' : 'Empate'}</h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )

      }

    </>
  )
}
