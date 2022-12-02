import * as utils from "@utils"
import { sum } from "@utils"
import fs from "fs"

export function one(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8").trim()

	const numbers = []
	for (let i = 0; i < file.length; i++) {
		if (i === file.length - 1) {
			if (file[i] === file[0]) {
				numbers.push(parseInt(file[i]))
			}
		}
		if (file[i] === file[i + 1]) {
			numbers.push(parseInt(file[i]))
		}
	}

	return sum(numbers)
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8").trim()

	const numbers = []
	const hp = Math.round(file.length / 2)
	for (let i = 0; i < file.length; i++) {
		const index = (i + hp) % file.length
		if (file[i] === file[index]) {
			numbers.push(parseInt(file[i]))
		}
	}

	return sum(numbers)
}

export const expectedResult = {
	debug: [],
	input: [],
}
