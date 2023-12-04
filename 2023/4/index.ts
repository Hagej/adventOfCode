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
		let card = 0
		const nums = r.split(": ")[1].split(" | ")

		const win = nums[0]
			.split(" ")
			.filter((n) => utils.isNum(n))
			.map((n) => parseInt(n.trim()))
		const yours = nums[1].split(" ").map((n) => parseInt(n))

		yours.forEach((y) => {
			if (win.includes(y)) {
				card = card ? card * 2 : 1
			}
		})

		result += card
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

	const copies = {}

	let i = 0
	while (rows[i]) {
		const r = rows[i]

		result += 1
		const nums = r.split(": ")[1].split(" | ")

		const win = nums[0]
			.split(" ")
			.filter((n) => utils.isNum(n))
			.map((n) => parseInt(n.trim()))
		const yours = nums[1]
			.split(" ")
			.filter((n) => utils.isNum(n))
			.map((n) => parseInt(n))

		let matching = 0

		yours.forEach((y) => {
			if (win.includes(y)) {
				matching += 1

				copies[i + matching + 1] = copies[i + matching + 1] ? copies[i + matching + 1] + 1 * ((copies[i + 1] ?? 0) + 1) : 1 * ((copies[i + 1] ?? 0) + 1)
			}
		})
		i += 1
	}

	return rows.length + utils.sum(Object.values(copies))
}

export const expectedResult = {
	debug: [13, 30],
	input: [],
}
