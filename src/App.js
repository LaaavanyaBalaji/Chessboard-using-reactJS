import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  const n = 8;
  const m = 8;

  const initialBoard = () => {
    const board = Array.from({ length: n }, () => Array(m).fill(null));
    // Set white pieces
    board[0] = ["R", "N", "B", "Q", "K", "B", "N", "R"];
    board[1] = Array(m).fill("P");
    // Set black pieces
    board[6] = Array(m).fill("p");
    board[7] = ["r", "n", "b", "q", "k", "b", "n", "r"];
    return board;
  };

  const [chessBoard, setChessBoard] = useState([]);

  useEffect(() => {
    setChessBoard(initialBoard());
  }, []);

  const handleClick = (rIndex, cIndex) => {
    const piece = chessBoard[rIndex][cIndex];

    // If there's no piece or it's not a pawn, do nothing
    if (!piece || (piece !== "P" && piece !== "p")) return;

    // Move logic: just move the pawn forward by one square for simplicity
    setChessBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);

      // White pawn move
      if (piece === "P" && rIndex > 0) {
        newBoard[rIndex][cIndex] = null;
        newBoard[rIndex - 1][cIndex] = "P";
      }
      // Black pawn move
      if (piece === "p" && rIndex < n - 1) {
        newBoard[rIndex][cIndex] = null;
        newBoard[rIndex + 1][cIndex] = "p";
      }

      return newBoard;
    });
  };

  return (
    <div className="board">
      {chessBoard.length > 0 &&
        chessBoard.map((row, rIndex) => (
          <div className="row" key={rIndex}>
            {row.map((piece, cIndex) => (
              <div
                className={`box ${(rIndex + cIndex) % 2 === 0 ? "black" : "white"}`}
                key={cIndex}
                onClick={() => handleClick(rIndex, cIndex)}
              >
                {piece && <span className="piece">{piece}</span>}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
