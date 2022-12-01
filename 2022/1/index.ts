import * as utils from "@utils"
import { sum } from "@utils"
import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((elf) => {
			const rows = elf.split("\n").map((r) => parseInt(r))
			return rows
		})

	rows.map((r, index) => {
		result = Math.max(sum(r), result)
	})

	return result
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((elf) => {
			const rows = elf.split("\n").map((r) => parseInt(r))
			return rows
		})

	const elfs = rows.map((r, index) => {
		return sum(r)
	})

	elfs.sort((a, b) => b - a)

	result = elfs[0] + elfs[1] + elfs[2]

	return result
}

export const expectedResult = {
	debug: [24000, 45000],
	input: [],
}
