import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r.split("\n")
			return row
		})

	const locks = []
	const keys = []

	rows.map((r, index) => {
		let pins = [0, 0, 0, 0, 0]
		if (r[0] === "#####") {
			for (let i = 1; i < r.length; i++) {
				for (let x = 0; x < 5; x++) {
					if (r[i][x] === "#") {
						pins[x] += 1
					}
				}
			}
			locks.push(pins)
		} else {
			for (let i = r.length - 2; i > 0; i--) {
				for (let x = 0; x < 5; x++) {
					if (r[i][x] === "#") {
						pins[x] += 1
					}
				}
			}
			keys.push(pins)
		}
	})

	for (const lock of locks) {
		loop: for (const key of keys) {
			for (let i = 0; i < 5; i++) {
				if (lock[i] + key[i] > 5) continue loop
			}
			result += 1
		}
	}

	return result
}

export function two(inputFile: string) {
	throw new Error("Not implemented")
}

export const expectedResult = {
	debug: [3],
	input: [],
}
