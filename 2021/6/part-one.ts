import { readFileSync } from "fs";
import { sum } from "../../utils";

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

  let fish = new Array<number>(9);
  fish.fill(0);

  rows.forEach((r) => (fish[r] += 1));

  for (let i = 0; i < 256; i++) {
    let zeros = fish.shift();

    fish[6] += zeros;
    fish.push(zeros);
  }

  result = sum(fish);
  console.log(result);
}

main();
