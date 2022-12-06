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
		for (let i = 0; i < r.length; i++) {
			const s = new Set([...r.slice(i, i + 4)])

			if (s.size === 4) {
				result = i + 4
				break
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
			const row = r
			return row
		})

	rows.map((r, index) => {
		for (let i = 0; i < r.length; i++) {
			const s = new Set([...r.slice(i, i + 14)])

			if (s.size === 14) {
				result = i + 14
				break
			}
		}
	})

	return result
}

export const expectedResult = {
	debug: [26],
	input: [],
}
