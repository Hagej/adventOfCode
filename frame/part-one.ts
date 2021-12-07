import { readFileSync } from "fs";
import * as utils from "../utils";

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

  rows.map((r, index) => {});

  console.log(result);
}

main();
