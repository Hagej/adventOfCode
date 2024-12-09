import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split("")
			return row
		})


	const antennas: { freq: string, x: number, y: number }[] = []
	rows.map((r, y) => {
		for (const [x, c] of r.entries()) {
			if (c !== ".") {
				antennas.push({ freq: c, x, y })
			}
		}
	})

	const antinodes = new Set()

	for (const [i, a] of antennas.entries()) {
		for (const [j, b] of antennas.entries()) {
			if (i === j || a.freq !== b.freq) continue
			const dx = a.x - b.x
			const dy = a.y - b.y
			const anA = [a.y + dy, a.x + dx]
			const anB = [b.y - dy, b.x - dx]

			if (!!rows[anA[0]]?.[anA[1]]) {
				antinodes.add(`${anA[0]},${anA[1]}`)
			}
			if (!!rows[anB[0]]?.[anB[1]]) {
				antinodes.add(`${anB[0]},${anB[1]}`)
			}
		}
	}

	console.log(antinodes)

	result = antinodes.size

	return result
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split("")
			return row
		})


	const antennas: { freq: string, x: number, y: number }[] = []
	rows.map((r, y) => {
		for (const [x, c] of r.entries()) {
			if (c !== ".") {
				antennas.push({ freq: c, x, y })
			}
		}
	})

	const antinodes = new Set()

	for (const [i, a] of antennas.entries()) {
		for (const [j, b] of antennas.entries()) {
			if (i === j || a.freq !== b.freq) continue
			const dx = a.x - b.x
			const dy = a.y - b.y
			let next = [a.y, a.x]
			while (!!rows[next[0]]?.[next[1]]) {
				antinodes.add(`${next[0]},${next[1]}`)
				next = [next[0] + dy, next[1] + dx]
			}

			next = [b.y, b.x]

			while (!!rows[next[0]]?.[next[1]]) {
				antinodes.add(`${next[0]},${next[1]}`)
				next = [next[0] - dy, next[1] - dx]
			}


		}
	}

	result = antinodes.size

	return result
}

export const expectedResult = {
	debug: [14, 34],
	input: [],
}
