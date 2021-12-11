import { readFileSync } from "fs";
import * as utils from "../../utils";

let width = 0,
  height = 0;

let result = 0;

async function main() {
  const file = readFileSync(process.argv[2], "utf-8");
  const octopi = file
    .trim()
    .split("\n")
    .map((r) => {
      const row = r;
      return row.split("").map((r) => parseInt(r));
    });

  width = octopi[0].length;
  height = octopi.length;

  for (let i = 0; i < 100; i++) {
    flashed = [];
    octopi.forEach((r, ri) => {
      r.forEach((c, ci) => {
        flash(octopi, ri, ci);
      });
    });
  }

  console.log(result);
}

let flashed: Array<[number, number]> = [];

function flash(octopi: number[][], row: number, col: number) {
  if (row < 0 || row >= height || col < 0 || col >= width) return;
  if (flashed.find((f) => f[0] === row && f[1] === col)) return;
  if (octopi[row][col] === 9) {
    octopi[row][col] = 0;
    flashed.push([row, col]);
    result++;
    for (const [r, c] of [
      [row - 1, col - 1],
      [row - 1, col],
      [row - 1, col + 1],
      [row, col - 1],
      [row, col + 1],
      [row + 1, col - 1],
      [row + 1, col],
      [row + 1, col + 1],
    ]) {
      flash(octopi, r, c);
    }
  } else {
    octopi[row][col] += 1;
  }
}

main();
