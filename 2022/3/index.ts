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

	rows.map((r, index) => {
		const first = r.substring(0, r.length / 2)
		const last = r.substring(r.length / 2)
		const unique = new Set<string>()
		for (const char of first) {
			if (!unique.has(char) && last.includes(char)) {
				let val = char.charCodeAt(0) - 96
				if (val < 0) val += 31 + 27
				result += val
			}
			unique.add(char)
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
			const row = r
			return row
		})

	for (let i = 0; i < rows.length; i += 3) {
		for (const char of rows[i]) {
			if (rows[i + 1].includes(char) && rows[i + 2].includes(char)) {
				let val = char.charCodeAt(0) - 96
				if (val < 0) val += 31 + 27
				result += val
				break
			}
		}
	}

	return result
}

export const expectedResult = {
	debug: [157, 70],
	input: [],
}
