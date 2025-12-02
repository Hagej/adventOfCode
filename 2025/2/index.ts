import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
  let result = 0
  const file = fs.readFileSync(inputFile, "utf-8")
  const rows = file
    .trim()
    .split("\n")
    .map((r) => {
      const row = r.split(",").map((v) => v.split("-").map((n) => Number.parseInt(n)) as [number, number])
      return row
    })

  rows[0].map((r, index) => {
    if (r[0].toString().length % 2 !== 0 && r[0].toString().length === r[1].toString().length) return
    for (let i = Math.max(r[0], 10); i <= r[1]; i++) {
      const str = `${i}`
      if (str.length % 2 !== 0) continue
      if (str.slice(0, (str.length / 2)) === str.slice(str.length / 2)) {
        result += i
      }
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
    .map((r) => {
      const row = r.split(",").map((v) => v.split("-").map((n) => Number.parseInt(n)) as [number, number])
      return row
    })

  rows[0].map((r, index) => {
    for (let i = Math.max(r[0], 10); i <= r[1]; i++) {
      const str = `${i}`
      let seqLength = 0
      do {
        seqLength++
        if (str.length % seqLength !== 0) continue
        const seq = str.slice(0, seqLength)
        let j = 1
        while (j * seqLength <= str.length && str.slice(j * seqLength, j * seqLength + seqLength) === seq) {
          j++
        }
        if (j * seqLength === str.length) {
          result += i
          break
        }
      } while (seqLength < str.length / 2)
    }
  })

  return result
}

export const expectedResult = {
  debug: [1227775554, 4174379265],
  input: [17077011375, 36037497037],
}
