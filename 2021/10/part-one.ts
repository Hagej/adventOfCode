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
    })
    .map((r) => r.split(""));

  const open = ["(", "[", "{", "<"];
  const close = [")", "]", "}", ">"];
  const points = [3, 57, 1197, 25137];

  const queue: string[] = [];

  const illegal = [];

  rows.map((r, index) => {
    loop: for (const c of r) {
      if (open.find((o) => o === c)) {
        queue.push(c);
      } else {
        for (let i = 0; i < close.length; i++) {
          const cl = close[i];
          if (c === cl) {
            const q = queue.pop();
            if (q !== open[i]) {
              illegal.push(c);
              break loop;
            }
          }
        }
      }
    }
  });
  result = illegal.reduce(
    (sum, i) => sum + points[close.findIndex((c) => c === i)],
    0
  );

  console.log(result);
}

main();
