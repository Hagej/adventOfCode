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

	const spaceX = []
	const spaceY = []

	const rocks = []

	rows.forEach((r, index) => {
		if (r.split("").every((s) => s === ".")) {
			spaceY.push(index)
		}
	})

	for (let i = 0; i < rows[0].length; i++) {
		let hasRock = false
		for (let j = 0; j < rows.length; j++) {
			if (rows[j][i] === "#") {
				hasRock = true
				rocks.push([j, i])
			}
		}
		if (!hasRock) {
			spaceX.push(i)
		}
	}

	console.log(spaceY, spaceX, rocks)

	for (let i = 0; i < rocks.length - 1; i++) {
		const a = rocks[i]
		for (let j = i + 1; j < rocks.length; j++) {
			const b = rocks[j]
			let yd = Math.abs(a[0] - b[0])
			let xd = Math.abs(a[1] - b[1])

			for (const sy of spaceY) {
				if (sy < Math.max(a[0], b[0]) && sy > Math.min(a[0], b[0])) {
					xd += 1
				}
			}

			for (const sx of spaceX) {
				if (sx < Math.max(a[1], b[1]) && sx > Math.min(a[1], b[1])) {
					yd += 1
				}
			}

			console.log(a, b, xd, yd)

			result += yd + xd
		}
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

	const spaceX = []
	const spaceY = []

	const rocks = []

	rows.forEach((r, index) => {
		if (r.split("").every((s) => s === ".")) {
			spaceY.push(index)
		}
	})

	for (let i = 0; i < rows[0].length; i++) {
		let hasRock = false
		for (let j = 0; j < rows.length; j++) {
			if (rows[j][i] === "#") {
				hasRock = true
				rocks.push([j, i])
			}
		}
		if (!hasRock) {
			spaceX.push(i)
		}
	}
	for (let i = 0; i < rocks.length - 1; i++) {
		const a = rocks[i]
		for (let j = i + 1; j < rocks.length; j++) {
			const b = rocks[j]
			let yd = Math.abs(a[0] - b[0])
			let xd = Math.abs(a[1] - b[1])

			for (const sy of spaceY) {
				if (sy < Math.max(a[0], b[0]) && sy > Math.min(a[0], b[0])) {
					xd += 999999
				}
			}

			for (const sx of spaceX) {
				if (sx < Math.max(a[1], b[1]) && sx > Math.min(a[1], b[1])) {
					yd += 999999
				}
			}

			result += yd + xd
		}
	}

	return result
}

export const expectedResult = {
	debug: [374, 82000210],
	input: [],
}
