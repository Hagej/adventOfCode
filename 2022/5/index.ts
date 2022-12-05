import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
	let result = ""
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r
			return row
		})

	const crates = rows[0].split("\n").map((c) => JSON.parse(c) as string[])

	const instructions = rows[1].split("\n")

	instructions.map((r, index) => {
		const inst = r.split(" ")
		const amount = parseInt(inst[1])
		const from = parseInt(inst[3]) - 1
		const to = parseInt(inst[5]) - 1
		for (let i = amount; i > 0; i--) {
			crates[to].unshift(crates[from].shift())
		}
	})

	result = crates.reduce((prev, c) => prev + c[0], "")

	return result
}

export function two(inputFile: string) {
	let result = ""
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r
			return row
		})

	const crates = rows[0].split("\n").map((c) => JSON.parse(c) as string[])

	const instructions = rows[1].split("\n")

	instructions.map((r, index) => {
		const inst = r.split(" ")
		const amount = parseInt(inst[1])
		const from = parseInt(inst[3]) - 1
		const to = parseInt(inst[5]) - 1
		crates[to].unshift(...crates[from].splice(0, amount))
	})

	result = crates.reduce((prev, c) => prev + c[0], "")

	return result
}

export const expectedResult = {
	debug: ["CMZ", "MCD"],
	input: [],
}
