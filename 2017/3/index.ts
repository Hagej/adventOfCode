import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const number = parseInt(fs.readFileSync(inputFile, "utf-8"))

	let side = 3
	while (Math.pow(side, 2) < number) {
		side += 2
	}

	const diff = Math.pow(side, 2) - number
	result = side - (diff % ((side - 1) / 2)) - 1

	return result
}

export function two(inputFile: string) {
	let result = 0
	const number = parseInt(fs.readFileSync(inputFile, "utf-8"))

	let side = 3
	while (Math.pow(side, 2) < number) {
		side += 2
	}

	const diff = Math.pow(side, 2) - number
	result = side - (diff % ((side - 1) / 2)) - 1

	return result
}

export const expectedResult = {
	debug: [31],
	input: [],
}
