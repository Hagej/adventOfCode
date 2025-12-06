import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
    let result = 0
    const file = fs.readFileSync(inputFile, "utf-8")
    const rows = file
        .trim()
        .split("\n")
        .map((r) => {
            const row = r.split(" ").filter((s) => s !== "")
            return row
        })

    console.log(rows)

    for (let x = 0; rows[0].length > x; x++) {
        const operator = rows[rows.length - 1][x]
        let sum = parseInt(rows[0][x])
        for (let i = 1; rows.length - 1 > i; i++) {
            const num = parseInt(rows[i][x])
            console.log(sum, operator, num)
            sum = operator === "+" ? sum + num : sum * num
        }
        result += sum
    }

    return result
}

export function two(inputFile: string) {
    throw new Error("Not implemented")
}

export const expectedResult = {
    debug: [4277556],
    input: [],
}
