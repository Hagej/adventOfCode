import * as utils from "../../utils/index.ts";

function subMat(
  mat: number[][],
  from: [number, number],
  to: [number, number]
): number[][] {
  const sub: number[][] = [];

  const [fromX, fromY] = from;
  const [toX, toY] = to;

  for (let y = fromY; y < toY; y++) {
    sub.push(Array<number>(Math.abs(toX - fromX)).fill(0));
  }

  for (let y = fromY; y < toY; y++) {
    for (let x = fromX; x < toX; x++) {
      sub[y - fromY][x - fromX] = mat[y][x];
    }
  }
  return sub;
}

function reverseMat(mat: number[][], axis: "x" | "y"): number[][] {
  const inv = [];
  if (axis === "y") {
    for (const r of mat) {
      inv.unshift(r);
    }
  }
  if (axis === "x") {
    for (const r of mat) {
      const row = [];
      for (const c of r) {
        row.unshift(c);
      }
      inv.push(row);
    }
  }
  return inv;
}

export async function one(inputFile: string) {
  const file = Deno.readTextFileSync(inputFile);
  const [c, instr] = file.trim().split("\n\n");
  const coords = c
    .trim()
    .split("\n")
    .map((r) => {
      const [x, y] = r.split(",");
      return [parseInt(x), parseInt(y)];
    });

  const folds = instr.split("\n").map((i) => {
    const v = i.split(" ")[2];
    const [axis, value] = v.split("=");
    return [axis, parseInt(value)];
  });

  let result = 0;
  let maxX = 0,
    maxY = 0;

  coords.forEach((v) => {
    if (v[0] > maxX) maxX = v[0];
    if (v[1] > maxY) maxY = v[1];
  });

  let mat: number[][] = [];
  for (let i = 0; i <= maxY; i++) {
    mat.push(Array<number>(maxX + 1).fill(0));
  }
  coords.forEach((c) => {
    mat[c[1]][c[0]] = 1;
  });

  coords.map((r, index) => {});
  const f = folds[0];
  if (f[0] === "x") {
    let sub = subMat(
      mat,
      [(f[1] as number) + 1, 0],
      [mat[0].length, mat.length]
    );
    mat = subMat(mat, [0, 0], [f[1] as number, mat.length]);
    if (sub[0].length < mat[0].length) {
      sub = makeEqualLength(sub, mat, "x");
    } else {
      mat = makeEqualLength(mat, sub, "x");
    }
    const inv: number[][] = reverseMat(sub, "x");

    mat = matAdd(mat, inv);
  } else {
    let sub = subMat(
      mat,
      [0, (f[1] as number) + 1],
      [mat[0].length, mat.length]
    );
    mat = subMat(mat, [0, 0], [mat[0].length, f[1] as number]);
    if (sub.length < mat.length) {
      sub = makeEqualLength(sub, mat, "y");
    } else {
      mat = makeEqualLength(mat, sub, "y");
    }
    const inv: number[][] = reverseMat(sub, "y");
    mat = matAdd(mat, inv);
  }

  for (const r of mat) {
    for (const c of r) {
      if (c > 0) {
        result++;
      }
    }
  }

  return result;
}

export async function two(inputFile: string) {
  const file = Deno.readTextFileSync(inputFile);
  const [c, instr] = file.trim().split("\n\n");
  const coords = c
    .trim()
    .split("\n")
    .map((r) => {
      const [x, y] = r.split(",");
      return [parseInt(x), parseInt(y)];
    });

  const folds = instr.split("\n").map((i) => {
    const v = i.split(" ")[2];
    const [axis, value] = v.split("=");
    return [axis, parseInt(value)];
  });

  let maxX = 0;
  let maxY = 0;

  coords.forEach((v) => {
    if (v[0] > maxX) maxX = v[0];
    if (v[1] > maxY) maxY = v[1];
  });

  let mat: number[][] = [];
  for (let i = 0; i <= maxY; i++) {
    mat.push(Array<number>(maxX + 1).fill(0));
  }
  coords.forEach((c) => {
    mat[c[1]][c[0]] = 1;
  });

  for (const f of folds) {
    if (f[0] === "x") {
      let sub = subMat(
        mat,
        [(f[1] as number) + 1, 0],
        [mat[0].length, mat.length]
      );
      mat = subMat(mat, [0, 0], [f[1] as number, mat.length]);
      if (sub[0].length < mat[0].length) {
        sub = makeEqualLength(sub, mat, "x");
      } else {
        mat = makeEqualLength(mat, sub, "x");
      }
      const inv: number[][] = reverseMat(sub, "x");

      mat = matAdd(mat, inv);
    } else {
      let sub = subMat(
        mat,
        [0, (f[1] as number) + 1],
        [mat[0].length, mat.length]
      );
      mat = subMat(mat, [0, 0], [mat[0].length, f[1] as number]);
      if (sub.length < mat.length) {
        sub = makeEqualLength(sub, mat, "y");
      } else {
        mat = makeEqualLength(mat, sub, "y");
      }
      const inv: number[][] = reverseMat(sub, "y");
      mat = matAdd(mat, inv);
    }
  }

  return matToString(mat);
}

function matToString(mat: number[][]) {
  let result = "";
  for (const r of mat) {
    result += `${r.map((v) => (v > 0 ? "#" : ".")).join("")}\n`;
  }
  return result;
}

function matAdd(a: number[][], b: number[][]) {
  const result = [];
  for (let i = 0; i < a.length; i++) {
    const row = [];
    for (let j = 0; j < a[0].length; j++) {
      row.push(a[i][j] + b[i][j]);
    }
    result.push(row);
  }

  return result;
}

function makeEqualLength(
  a: number[][],
  b: number[][],
  axis: "x" | "y"
): number[][] {
  let result = [...a];
  if (axis === "x") {
    result = result.map((s) => {
      const row = [...s];
      for (let i = 0; i < b[0].length - a[0].length; i++) {
        row.push(0);
      }
      return row;
    });
  } else {
    for (let i = 0; i < b.length - a.length; i++) {
      result.push(Array(b[0].length).fill(0));
    }
  }
  return result;
}

export const expectedResult = {
  debug: [17, "######...##...##...######.........."],
  input: [695],
};
