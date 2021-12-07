import { readFileSync } from "fs";
import * as utils from "../../utils";

async function main() {
  let result = 0;
  const file = readFileSync(process.argv[2], "utf-8");
  const rows = file
    .trim()
    .split(",")
    .map((r) => {
      const row = parseInt(r);
      return row;
    });

  const values = rows.sort((a, b) => a - b);
  const sum = utils.sum(values);

  const avg = Math.round(sum / values.length);
  const median = values[Math.floor(values.length / 2)];

  console.log(avg, median);

  values.map((r, index) => {
    result += Math.abs(r - median);
  });

  console.log(result);
}

main();
