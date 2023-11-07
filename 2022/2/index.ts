import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split(" ")
			return row as [string, string]
		})

	const opponent = {
		A: 1,
		B: 2,
		C: 3,
	}
	const me = {
		X: 1,
		Y: 2,
		Z: 3,
	}

	rows.map(([o, m], index) => {
		const diff = opponent[o] - me[m]
		if (diff === 0) result += 3 + me[m]
		else if (diff === -1 || diff === 2) result += 6 + me[m]
		else result += me[m]
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
			const row = r.split(" ")
			return row as [string, string]
		})

	const opponent = {
		A: 1,
		B: 2,
		C: 3,
	}

	rows.map(([o, m], index) => {
		if (m === "X") {
			result += ((opponent[o] + 1) % 3) + 1
		}
		if (m === "Y") {
			result += 3 + opponent[o]
		}
		if (m === "Z") {
			result += 6 + (opponent[o] % 3) + 1
		}
	})

	return result
}

export const expectedResult = {
	debug: [15, 12],
	input: [],
}
