import "./App.css";

export default function App() {
  let squares = Array(9).fill(null);
  let xIsNext = true;
  let gameOver = false;
  const lines = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6],
  ];

  function handleClick(i) {
    if (gameOver) return;

    const box = document.getElementById(`square-${i}`);
    if (box.innerText === "X" || box.innerText === "O") return;

    const symbol = xIsNext ? "X" : "O";
    box.innerText = symbol;
    squares[i] = symbol;

    const winner = calculateWinner(squares);
    if (winner) {
      document.getElementById("turn").innerText = `WINNER - ${winner}!!!!!`;
      gameOver = true;
      highlightWinner(squares);
      return;
    }

    if (!squares.includes(null)) {
      document.getElementById("turn").innerText = "It's a Draw!";
      gameOver = true;
      return;
    }

    xIsNext = !xIsNext;
    document.getElementById("turn").innerText = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  function calculateWinner(squares) {
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function highlightWinner(squares) {

    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        document.getElementById(`square-${a}`).style.backgroundColor = "#F4C2C2";
        document.getElementById(`square-${b}`).style.backgroundColor = "#F4C2C2";
        document.getElementById(`square-${c}`).style.backgroundColor = "#F4C2C2";
      }
    }
  }

  function resetGame() {
    squares = Array(9).fill(null);
    xIsNext = true;
    gameOver = false;
    document.getElementById("turn").innerText = "Next Player: X";
    for (let i = 0; i < 9; i++) {
      const box = document.getElementById(`square-${i}`);
      box.innerText = "";
      // box.style.backgroundColor = "#d770aee6";
    }
  }

  const board = [];
  for (let i = 0; i < 9; i++) {
    board.push(
      <div
        key={i}
        id={`square-${i}`}
        className="square"
        onClick={() => handleClick(i)}
      ></div>
    );
  }

  return (
    <div>
      <h1 className="title">TIC TAC TOE</h1>
      <div className="board">{board}</div>
      <p id="turn" className="turn">Next Player: X</p>
      <div style={{ textAlign: "center", marginTop: "15px" }}>
      <button className="reset" onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
}
