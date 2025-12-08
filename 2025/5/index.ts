import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
  let result = 0
  const file = fs.readFileSync(inputFile, "utf-8")
  const groups = file
    .trim()
    .split("\n\n")
  const fresh = groups[0].split("\n")
    .map((row) => {
      return row.split("-").map((n) => parseInt(n)) as [number, number]
    })
  const spoiled = groups[1].split("\n")
    .map((row) => {
      return parseInt(row)
    })
  loop: for (const ingredient of spoiled) {
    for (const [min, max] of fresh) {
      if (ingredient <= max && ingredient >= min) {
        result += 1
        continue loop
      }
    }
  }

  return result
}

export function two(inputFile: string) {
  let result = 0
  const file = fs.readFileSync(inputFile, "utf-8")
  const groups = file
    .trim()
    .split("\n\n")
  let fresh = groups[0].split("\n")
    .map((row) => {
      return row.split("-").map((n) => parseInt(n)) as [number, number]
    })
  let ranges = []
  while (fresh.length) {
    let [curMin, curMax] = fresh[0]
    for (let i = 1; i < fresh.length; i++) {
      const [min, max] = fresh[i]
      let shouldRemove = false
      if (curMin <= max && curMin >= min) {
        curMin = min
        shouldRemove = true
      }
      if (curMax <= max && curMax >= min) {
        curMax = max
        shouldRemove = true
      }
      if (shouldRemove) {
        fresh.splice(i, 1)
        i = 0
      }
    }
    ranges.push([curMin, curMax])
    fresh.splice(0, 1)
  }
  ranges = ranges.sort((a, b) => a[0] - b[0])
  for (const [min, max] of ranges) {
    result += max - min + 1
  }
  return result
}

export const expectedResult = {
  debug: [3, 14],
  input: [],
}
