import * as utils from "@utils"
import { cardinals } from "@utils/constants"
import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split("").map((s) => parseInt(s))
			return row
		})

	const starts: [number, number][] = []

	for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[y].length; x++) {
			if (rows[y][x] === 0) {
				starts.push([y, x])
			}
		}
	}

	for (const [y, x] of starts) {
		result += findTrailheads(rows, new Set(), x, y)
	}


	return result
}


function findTrailheads(map: number[][], visited: Set<string>, x: number, y: number) {
	const cur = map[y][x]
	visited.add(`${x},${y}`)
	if (cur === 9) return 1
	let count = 0
	for (const dir of cardinals) {
		const [nx, ny] = [x + dir[0], y + dir[1]]
		const next = map[ny]?.[nx]
		if (next === cur + 1 && !visited.has(`${nx},${ny}`)) {
			count += findTrailheads(map, visited, nx, ny)
		}
	}
	return count
}

function findTrailheadRatings(map: number[][], x: number, y: number) {
	const cur = map[y][x]
	if (cur === 9) return 1
	let count = 0
	for (const dir of dirs) {
		const [nx, ny] = [x + dir[0], y + dir[1]]
		const next = map[ny]?.[nx]
		if (next === cur + 1) {
			count += findTrailheadRatings(map, nx, ny)
		}
	}
	return count
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split("").map((s) => parseInt(s))
			return row
		})

	const starts: [number, number][] = []

	for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[y].length; x++) {
			if (rows[y][x] === 0) {
				starts.push([y, x])
			}
		}
	}

	for (const [y, x] of starts) {
		result += findTrailheadRatings(rows, x, y)
	}


	return result
}

export const expectedResult = {
	debug: [36],
	input: [],
}
