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

  const values = rows.map((r) => {
    const row = r.split(" | ").map((r) => r.split(" "));
    return [row[0], row[1]];
  });

  for (const v of values) {
    for (const o of v[1]) if ([2, 3, 4, 7].includes(o.length)) result++;
  }

  console.log(result);
}

main();
