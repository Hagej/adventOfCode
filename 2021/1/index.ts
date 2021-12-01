import { readFileSync } from "fs";

async function main() {
  let result = 0;
  const file = readFileSync(process.argv[2], "utf-8");
  const rows = file.split("\n").map((r) => {
    return parseInt(r);
  });

  let cur;
  let prev;
  for (let i = 0; i < rows.length - 2; i++) {
    cur = rows[i] + rows[i + 1] + rows[i + 2];
    if (prev && cur > prev) {
      result++;
    }
    prev = cur;
  }

  console.log(result);
}

main();
