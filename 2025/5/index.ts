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

	rows.map((r, index) => {})

	return result
}

export function two(inputFile: string) {
	throw new Error("Not implemented")
}

export const expectedResult = {
	debug: [],
	input: [],
}
