import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
  let result = 0
  const file = fs.readFileSync(inputFile, "utf-8")
  const rows = file
    .trim()
    .split("\n")
    .map((r: string) => {
      const row = r
      return row
    })

  let dial = 50

  rows.map((r: string, index) => {
    const dir = r[0]
    const amount = Number.parseInt(r.slice(1))
    if (dir === "R") {
      dial = (dial + amount) % 100
    } else {
      dial -= amount
      while (dial < 0) {
        dial = 100 + dial
      }
    }
    if (dial === 0) {
      result += 1
    }
  })

  return result
}
export function two(inputFile: string) {
  let result = 0
  const file = fs.readFileSync(inputFile, "utf-8")
  const rows = file
    .trim()
    .split("\n")
    .map((r: string) => {
      const row = r
      return row
    })

  let dial = 50

  rows.map((r: string, index) => {
    const dir = r[0]
    const amount = Number.parseInt(r.slice(1))
    if (dir === "R") {
      dial = dial + amount
      while (dial >= 100) {
        dial -= 100
        result += 1
      }
    } else {
      if (dial === 0) {
        result -= 1
      }
      dial -= amount
      while (dial < 0) {
        result += 1
        dial = 100 + dial
      }
      if (dial === 0) {
        result += 1
      }
    }
  })

  return result
}

export const expectedResult = {
  debug: [3, 6],
  input: [],
}
