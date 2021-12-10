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
  const points = [1, 2, 3, 4];

  let endings: string[][] = rows.map((r) => []);
  let index = 0;
  outer: for (const r of rows) {
    const queue: string[] = [];
    for (const c of r) {
      if (open.find((o) => o === c)) {
        queue.push(c);
      } else {
        for (let i = 0; i < close.length; i++) {
          const cl = close[i];
          if (c === cl) {
            const q = queue[queue.length - 1];
            if (q !== open[i]) {
              index++;
              continue outer;
            }
            queue.pop();
          }
        }
      }
    }
    queue.forEach((q) => {
      endings[index].push(close[open.findIndex((o) => q === o)]);
    });
    index++;
  }
  endings = endings.map((e) => e.reverse());
  let results = endings.map((e) =>
    e.reduce((sum, i) => sum * 5 + points[close.findIndex((c) => c === i)], 0)
  );

  results = results.filter((r) => r !== 0).sort((a, b) => a - b);
  result = results[Math.floor(results.length / 2)];

  console.log(result);
}

main();
