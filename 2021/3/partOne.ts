import { readFileSync } from "fs";

async function main() {
  let result = 0;
  const file = readFileSync(process.argv[2], "utf-8");
  const rows = file.split("\n").map((r) => {
    const row = r;
    return r;
  });

  let gammaRate = "";
  let epsilonRate = "";

  const amount = rows.length;
  const l = rows[0].length;

  for (let i = 0; i < l; i++) {
    let sum = 0;
    rows.forEach((r, index) => {
      sum += parseInt(r.charAt(i));
    });

    if (sum > amount / 2) {
      gammaRate = `${gammaRate}1`;
      epsilonRate = `${epsilonRate}0`;
    } else {
      gammaRate = `${gammaRate}0`;
      epsilonRate = `${epsilonRate}1`;
    }
  }

  result = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);

  console.log(result);
}

main();
