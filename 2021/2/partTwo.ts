import { readFileSync } from "fs";

async function main() {
  let result = 0;
  const file = readFileSync(process.argv[2], "utf-8");
  const rows: Array<[string, number]> = file.split("\n").map((r) => {
    const row = r.split(" ");
    return [row[0], parseInt(row[1])]
  });

  let hp = 0
  let vp = 0 
  let aim = 0

  rows.map(([instruction, amount], index) => {
    if(instruction === "forward") {
      hp += amount
      vp += aim * amount
    }
    if(instruction === "down") {
      // vp += amount # part 1
      aim += amount
    }
    if(instruction === "up") {
      // vp -= amount # part 1
      aim -= amount
    }
  });

  result = vp * hp;

  console.log(result);
}

main();