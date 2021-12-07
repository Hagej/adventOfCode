import { readFileSync } from "fs";
import { sum } from "../../utils";

async function main() {
  let result = 0;
  const file = readFileSync(process.argv[2], "utf-8");
  const rows = file
    .trim()
    .split("\n\n")
    .map((r) => {
      const row = r;
      return row;
    });

  const numbers = rows
    .splice(0, 1)[0]
    .split(",")
    .map((n) => parseInt(n.trim()));
  let boards = rows.map((r) =>
    r.split("\n").map((row) =>
      row
        .split(" ")
        .filter((num) => !isNaN(parseInt(num)))
        .map((num) => ({
          number: parseInt(num.trim()),
          marked: false,
        }))
    )
  );

  let boardsum = 0,
    finalNumber = 0;

  for (let n of numbers) {
    for (let i = 0; i < boards.length; i++) {
      boards[i] = boards[i].map((r) =>
        r.map((c) => {
          if (c.number === n) {
            return { number: c.number, marked: true };
          }
          return c;
        })
      );
      if (findBingo(boards[i])) {
        finalNumber = n;
        boardsum = sum(
          boards[i].flatMap((r) =>
            r.filter((c) => !c.marked).map((c) => c.number)
          )
        );
        break;
      }
    }
    if (finalNumber !== 0) break;
  }

  result = boardsum * finalNumber;
  console.log(result);
}

function findBingo(
  board: Array<{ number: number; marked: boolean }[]>
): boolean {
  let rows = board.map((r) => 0);
  let columns = board.map((r) => 0);
  if (board.length > 5) console.log(board);
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j].marked) {
        rows[i] += 1;
        columns[j] += 1;
      }
    }
  }
  if (rows.includes(board.length) || columns.includes(board.length)) {
    return true;
  }
}

main();
