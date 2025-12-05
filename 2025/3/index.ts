import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
  let result = 0
  const file = fs.readFileSync(inputFile, "utf-8")
  const rows = file
    .trim()
    .split("\n")
    .map((r) => {
      const row = r.split("").map((n) => parseInt(n))
      return row
    })

  rows.map((r, index) => {
    let first = 0
    let second = 0
    for (const [index, num] of r.entries()) {
      if (num > first && index < r.length - 1) {
        first = num
        second = 0
      } else if (num > second) {
        second = num
      }
    }
    result += parseInt(`${first}${second}`)
  })

  return result
}

export function two(inputFile: string) {
  let result = 0
  const file = fs.readFileSync(inputFile, "utf-8")
  const rows = file
    .trim()
    .split("\n")
    .map((r) => {
      const row = r.split("").map((n) => parseInt(n))
      return row
    })

  rows.map((r, index) => {
    const digits = Array(12).fill(0)
    for (const [index, num] of r.entries()) {
      for (const [i, d] of digits.entries()) {
        if (num > d && index <= r.length - (12 - i)) {
          digits[i] = num
          for (let j = i + 1; j < 12; j++) {
            digits[j] = 0
          }
          break
        }
      }
    }
    result += parseInt(`${digits.map((d) => `${d}`).join("")}`)
  })

  return result
}

export const expectedResult = {
  debug: [357, 3121910778619],
  input: [],
}
