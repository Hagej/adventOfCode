import * as utils from "@utils"
import { cardinals, ordinals } from "@utils/constants"
import fs from "fs"

export function one(inputFile: string) {
  let result = 0
  const file = fs.readFileSync(inputFile, "utf-8")
  const rows = file
    .trim()
    .split("\n")
    .map((r) => {
      return r
    })
  for (let y = 0; y < rows.length; y += 1) {
    for (let x = 0; x < rows[0].length; x += 1) {
      let rolls = 0
      if (rows[y][x] === "@") {
        for (const [xx, yy] of ordinals) {

          if (y + yy >= 0 && x + xx >= 0 && y + yy < rows.length && x + xx < rows[0].length) {
            if (rows[y + yy][x + xx] === "@") {
              rolls += 1
            }
          }
        }
        if (rolls < 4) {
          result += 1
        }
      }
    }
  }

  return result
}

export function two(inputFile: string) {
  let result = 0
  const file = fs.readFileSync(inputFile, "utf-8")
  const rows = file
    .trim()
    .split("\n")
    .map((r) => {
      return r.split("")
    })

  while (true) {
    const rollsToRemove: Array<[number, number]> = []


    for (let y = 0; y < rows.length; y += 1) {
      for (let x = 0; x < rows[0].length; x += 1) {
        let rolls = 0
        if (rows[y][x] === "@") {
          for (const [xx, yy] of ordinals) {
            if (y + yy >= 0 && x + xx >= 0 && y + yy < rows.length && x + xx < rows[0].length) {
              if (rows[y + yy][x + xx] === "@") {
                rolls += 1
              }
            }
          }
          if (rolls < 4) {
            rollsToRemove.push([x, y])
          }
        }
      }
    }
    if (!rollsToRemove.length) break
    result += rollsToRemove.length
    for (const [x, y] of rollsToRemove) {
      rows[y][x] = "."
    }
  }
  return result

}

export const expectedResult = {
  debug: [13, 43],
  input: [],
}
