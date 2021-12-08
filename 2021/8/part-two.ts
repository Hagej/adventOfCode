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

  let output = [];

  const values = rows.map((r) => {
    const row = r.split(" | ").map((r) => r.split(" "));

    return [row[0], row[1]];
  });
  const mapping: Array<Array<string>> = Array<Array<string>>(values.length);

  for (let i = 0; i < values.length; i += 1) {
    const m: string[] = Array(10);
    let v = values[i][0];
    let index;
    for (const val of v) {
      if (val.length === 2) {
        m[1] = val;
      }
      if (val.length === 3) {
        m[7] = val;
      }
      if (val.length === 4) {
        m[4] = val;
      }
      if (val.length === 7) {
        m[8] = val;
      }
    }
    v = v.filter(
      (val) => val !== m[1] && val !== m[4] && val !== m[7] && val !== m[8]
    );

    m[9] = v.find((val, ind) => {
      const overlap = stringOverlap(m[4], val);
      if (overlap.length === 4) {
        index = ind;
        return true;
      }
    });

    v.splice(index, 1);

    m[6] = v.find((val, ind) => {
      const sub = stringSubtract(m[8], val);
      if (sub.length === 1 && stringOverlap(sub[0], m[1]).length === 1) {
        index = ind;
        return true;
      }
    });
    v.splice(index, 1);
    m[0] = v.find((val, ind) => {
      const s = stringSubtract(m[8], val);
      if (s.length == 1) {
        index = ind;
        return true;
      }
    });

    v.splice(index, 1);

    m[5] = v.find((val, ind) => {
      const s = stringSubtract(m[6], val);
      if (s.length === 1) {
        index = ind;
        return true;
      }
    });
    v.splice(index, 1);

    m[3] = v.find((val, ind) => {
      const s = stringOverlap(m[1], val);
      if (s.length === 2) {
        index = ind;
        return true;
      }
    });

    v.splice(index, 1);
    m[2] = v[0];
    mapping[i] = m;
  }

  output = values.map((v, index) => {
    const r = v[1].reduce((prev, cur) => {
      const num = mapping[index].findIndex((m) => stringLetterCompare(m, cur));
      return `${prev}${num}`;
    }, "");

    return parseInt(r);
  });

  result = utils.sum(output);

  console.log(result);
}

function stringSubtract(a: string, b: string) {
  const avals = a.split("");
  const bvals = b.split("");
  const result = avals.filter((c) => !bvals.includes(c));
  return result.join("");
}

function stringLetterCompare(a: string, b: string) {
  if (a.length != b.length) return false;
  const result = a.split("").every((v) => b.split("").includes(v));
  return result;
}

function stringOverlap(a: string, b: string) {
  let result = [];
  const avals = a.split("");
  const bvals = b.split("");
  for (const c of avals) {
    if (bvals.includes(c)) result.push(c);
  }
  return result.join("");
}

main();
