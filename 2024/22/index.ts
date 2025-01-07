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
		let secret = parseInt(r)
		for (let i = 0; i < 2000; i++) {
			secret = ((secret << 6) ^ secret) & 16777215
			secret = ((secret >> 5) ^ secret) & 16777215
			secret = ((secret << 11) ^ secret) & 16777215
		}
		result += secret
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

	const lastFour = []
	const sequence = "-2,1,-1,3"
	rows.map((r, index) => {
		let secret = parseInt(r)
		let prev = secret % 10
		for (let i = 0; i < 2000; i++) {
			secret = ((secret << 6) ^ secret) & 16777215
			secret = ((secret >> 5) ^ secret) & 16777215
			secret = ((secret << 11) ^ secret) & 16777215
			const next = (secret % 10)
			const diff = prev - next
			prev = next
			lastFour.push(diff)
			if (lastFour.length > 4) {
				lastFour.shift()
				if (lastFour.join(",") === sequence) {
					console.log(lastFour, r, i)
					result += next
				}
			}
		}


	})

	return result
}

export const expectedResult = {
	debug: [37327623, 23],
	input: [],
}
