import { useState } from "react";
import "./Board.css";

let winLine = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

function fillArray() {
  let arr = [];
  for (let i = 0; i < 9; i++) arr.push({ id: i, value: " "});
  return arr;
}

function checkWin(tiles) {
  for (let i = 0; i < winLine.length; i++) {
    let stringX = "XXX";
    let stringY = "OOO";

    let positions = winLine[i].map((position) => tiles.at(position).value);
    let line = positions.join("");

    if (line === stringX) return winLine[i];
    if (line === stringY) return winLine[i];
  }

  return null;
}

function Board() {
  const [move, setMove] = useState(true);
  const [tiles, setTiles] = useState(fillArray);

  const winLine = checkWin(tiles);
  console.log(tiles);
  console.log(winLine);

  function handleDefault() {
    setTiles(fillArray());
    setMove(true);
  }


  function updateTile(index, changeMove) {
    let val = changeMove ? "X" : "O";

    if (winLine) return; 

    let newTiles = tiles.map(Tile => {
      if (Tile.id === index && Tile.value === " ") {
          setMove(prevMove => !prevMove);
          return { ...Tile, value: val };
      }
      return Tile;
    });

    setTiles(newTiles);
  }
  

  return (
    <div className="main-board">

      <div className="Tiles-grid">
        {tiles.map((Tile) => (
          <div
            className={winLine?.includes(Tile.id) ? "Tile TileWin" : "Tile"}
            key={Tile.id}
            onClick={() => {
              updateTile(Tile.id, move);
            }}
          >
            {Tile.value}
          </div>
        ))}
      </div>

      <button className="reset-button" onClick={() => handleDefault()}>
        <span>Restart</span>
        <i></i>
      </button>

    </div>
  );
}

export default Board;
