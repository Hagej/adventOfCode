import { readFileSync } from "fs";

async function main() {
  let result = 0;
  const file = readFileSync(process.argv[2], "utf-8");
  const rows = file.split("\n").map((r) => {
    const row = r;
    return r;
  });

  let oxygenGenRating = [...rows];
  let waterRating = [...rows];

  const l = rows[0].length;

  for (let i = 0; i < l; i++) {
    let oones = 0;
    let ozeros = 0;
    let wones = 0;
    let wzeros = 0;
    oxygenGenRating.forEach((r, index) => {
      if (parseInt(r.charAt(i)) === 1) {
        oones++;
      } else {
        ozeros++;
      }
    });
    waterRating.forEach((r, index) => {
      if (parseInt(r.charAt(i)) === 1) {
        wones++;
      } else {
        wzeros++;
      }
    });
    if (oxygenGenRating.length > 1) {
      if (oones >= ozeros) {
        oxygenGenRating = oxygenGenRating.filter(
          (r) => parseInt(r.charAt(i)) === 1
        );
      } else if (oones < ozeros) {
        oxygenGenRating = oxygenGenRating.filter(
          (r) => parseInt(r.charAt(i)) === 0
        );
      }
    }
    if (waterRating.length > 1) {
      if (wones >= wzeros) {
        waterRating = waterRating.filter((r) => parseInt(r.charAt(i)) === 0);
      } else if (wones < wzeros) {
        waterRating = waterRating.filter((r) => parseInt(r.charAt(i)) === 1);
      }
    }
  }

  result = parseInt(oxygenGenRating[0], 2) * parseInt(waterRating[0], 2);

  console.log(result);
}

main();
