import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
	let result = Infinity
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r.split("\n")
			return row
		})

	const seeds = rows[0][0]
		.split(": ")[1]
		.split(" ")
		.map((s) => parseInt(s))

	const maps = rows.slice(1).map((rs) => rs.map((r) => r.split(" ").map((n) => parseInt(n))).slice(1))

	for (const seed of seeds) {
		let num = seed
		loop1: for (const map of maps) {
			for (const row of map) {
				if (num >= row[1] && num <= row[1] + row[2]) {
					num = num - row[1] + row[0]
					continue loop1
				}
			}
		}

		result = Math.min(result, num)
	}

	return result
}

export function two(inputFile: string) {
	let result = Infinity
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r.split("\n")
			return row
		})

	const seeds = rows[0][0]
		.split(": ")[1]
		.split(" ")
		.map((s) => parseInt(s))

	const maps = rows.slice(1).map((rs) => rs.map((r) => r.split(" ").map((n) => parseInt(n))).slice(1))

	for (let i = 0; i < seeds.length; i += 2) {
		const ranges = [seeds[i], seeds[i + 1]]
		for (const map of maps) {
			loop1: for (let j = 0; j < ranges.length; j += 2) {
				for (const row of map) {
					const low = ranges[j]
					const high = low + ranges[j + 1]
					if (low >= row[1] && high < row[1] + row[2]) {
						ranges[j] = ranges[j] - row[1] + row[0]
						continue loop1
					} else if (low >= row[1] && low < row[1] + row[2]) {
						const newMin = row[1] + row[2]
						const newRange = high - (row[1] + row[2])
						ranges[j] = ranges[j] - row[1] + row[0]
						ranges[j + 1] = ranges[j + 1] - newRange
						ranges.push(newMin, newRange)
						continue loop1
					} else if (high >= row[1] && high < row[1] + row[2]) {
						const newMin = low
						const newRange = row[1] - low - 1
						ranges[j] = row[0]
						ranges[j + 1] = high - row[1]
						ranges.push(newMin, newRange)
						continue loop1
					} else if (low <= row[1] && high >= row[1] + row[2]) {
						ranges[j] = row[0]
						ranges[j + 1] = row[2]

						ranges.push(low, row[1] - low - 1)
						ranges.push(row[1] + row[2] + 1, high - (row[1] + row[2] + 1))
						continue loop1
					}
				}
			}
		}

		for (let i = 0; i < ranges.length; i += 2) {
			result = Math.min(result, ranges[i])
		}
	}

	return result
}

export const expectedResult = {
	debug: [35, 46],
	input: [],
}

// 153056352
