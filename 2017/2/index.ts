import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	const nums = rows.map((r, index) => {
		return r.split("\t").map((num) => parseInt(num))
	})

	nums.map((n) => (result += Math.max(...n) - Math.min(...n)))

	return result
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	const nums = rows.map((r, index) => {
		return r.split("\t").map((num) => parseInt(num))
	})

	loop: for (const row of nums) {
		for (let i = 0; i < row.length; i++) {
			for (let j = i + 1; j < row.length; j++) {
				if (row[i] % row[j] === 0) {
					result += row[i] / row[j]
					continue loop
				}
				if (row[j] % row[i] === 0) {
					result += row[j] / row[i]
					continue loop
				}
			}
		}
	}

	return result
}

export const expectedResult = {
	debug: [],
	input: [],
}
