import { readFileSync } from "fs";
import * as utils from "../../utils";

async function main() {
  let result = 0;
  const file = readFileSync(process.argv[2], "utf-8");
  const rows = file
    .trim()
    .split("\n")
    .map((r) => {
      const row = r;
      return row;
    });

  const values = rows.map((r) => r.split("").map((r) => parseInt(r)));

  const height = values.length;
  const width = values[0].length;

  const lows = [];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let isLowest = true;
      if (typeof values[i + 1] === "object" && values[i][j] >= values[i + 1][j])
        isLowest = false;
      if (typeof values[i - 1] === "object" && values[i][j] >= values[i - 1][j])
        isLowest = false;
      if (
        typeof values[i][j + 1] === "number" &&
        values[i][j] >= values[i][j + 1]
      ) {
        isLowest = false;
      }
      if (
        typeof values[i][j - 1] === "number" &&
        values[i][j] >= values[i][j - 1]
      ) {
        isLowest = false;
      }
      if (isLowest) {
        lows.push(values[i][j]);
      }
    }
  }
  result = utils.sum(lows);

  console.log(result + lows.length);
}

main();
