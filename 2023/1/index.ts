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
		let i = 0
		while (isNaN(parseInt(r[i]))) {
			i += 1
			if (i > r.length) {
				console.log(i)
				return
			}
		}
		const f = parseInt(r[i])

		if (isNaN(f)) return

		i = r.length - 1
		while (i >= 0 && isNaN(parseInt(r[i]))) {
			i -= 1
		}

		if (i === -1) console.log(r)
		const l = parseInt(r[i])
		console.log(f, l)

		result += parseInt(`${f}${l}`)
	})

	return result
}

const digits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
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

	rows.map((r, index) => {
		let i = 0

		while (isNaN(parseInt(r[i])) && !isDigit(r.slice(i))) {
			i += 1
			if (i > r.length) {
				console.log(i)
				return
			}
		}
		const f = isDigit(r.slice(i)) ?? parseInt(r[i])

		if (isNaN(f)) return

		i = r.length - 1
		while (i >= 0 && isNaN(parseInt(r[i])) && !isDigit(r.slice(i))) {
			i -= 1
		}

		if (i === -1) console.log(r)
		const l = isDigit(r.slice(i)) ?? parseInt(r[i])
		console.log(f, l)

		result += parseInt(`${f}${l}`)
	})

	return result
}

function isDigit(str: string) {
	for (const [i, d] of digits.entries()) {
		if (str.startsWith(d)) {
			return i + 1
		}
	}
	return
}

export const expectedResult = {
	debug: [142, 281],
	input: [],
}
