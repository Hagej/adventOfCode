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

		const AA = []
		const BB = []
	rows.map((r, index) => {
		const [a, b] = r.split("   ")
		AA.push(a)
		BB.push(b)
	})

	AA.sort()
	BB.sort()

	for (let i = 0; i < AA.length; i++) {
		result += Math.abs(AA[i] - BB[i])
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

		const AA = []
		const BB = []
	rows.map((r, index) => {
		const [a, b] = r.split("   ")
		AA.push(a)
		BB.push(b)
	})

	for(const a of AA) {
		let c = 0
		for(const b of BB) {
			if(b === a) c++
		}
		result += c * parseInt(a)
	}
	return result
}

export const expectedResult = {
	debug: [],
	input: [],
}
