/* eslint-disable space-before-function-paren */
import './style.css'
const TURNS = {
  X: 'x',
  O: 'o'
}

export function App() {
  const board = new Array(9).fill('a')
  return (
    <>

      <main className='board'>
        <h1>Tic Tac Toe</h1>
        <div className='game'>
          {
            board.map((_, index) => {
              return (
                <div className='square' key={index}>
                  {board[index]}
                </div>
              )
            })
          }
        </div>
      </main>
    </>
  )
}
