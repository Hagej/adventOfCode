import * as utils from "@utils"
import fs from "fs"
import { isNullishCoalesce } from "typescript"

export function one(inputFile: string) {
	let result = 1
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	const times = rows[0]
		.split(" ")
		.filter((n) => utils.isNum(n))
		.map((n) => parseInt(n))
	const distances = rows[1]
		.split(" ")
		.filter((n) => utils.isNum(n))
		.map((n) => parseInt(n))

	for (let i = 0; i < times.length; i++) {
		let records = 0
		for (let j = 0; j <= times[i]; j++) {
			if ((times[i] - j) * j > distances[i]) {
				records += 1
			}
		}
		result *= records
	}

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

	const t = rows[0]
		.split(" ")
		.filter((n) => utils.isNum(n))
		.join("")

	const time = parseInt(t)
	const distance = parseInt(
		rows[1]
			.split(" ")
			.filter((n) => utils.isNum(n))
			.join(""),
	)

	for (let j = 0; j <= time; j++) {
		if ((time - j) * j > distance) {
			result += 1
		}
	}

	return result
}

export const expectedResult = {
	debug: [288, 71503],
	input: [],
}
