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

	for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[0].length; x++) {
			if (rows[y][x] === "O") {
				moveRock(rows, x, y, 0, -1)
			}
		}
	}

	for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[0].length; x++) {
			result += rows[y][x] === "O" ? rows.length - y : 0
		}
	}

	return result
}

function moveRock(map: string[][], x: number, y: number, xDir: number, yDir: number) {
	if (map[y + yDir]?.[x + xDir] === ".") {
		map[y][x] = "."
		map[y + yDir][x + xDir] = "O"
		moveRock(map, x + xDir, y + yDir, xDir, yDir)
	}
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

	const dirs = [
		[0, -1],
		[-1, 0],
		[0, 1],
		[1, 0],
	]

	let cache = new Map<string, number>()
	let foundCycle = false

	for (let c = 1000000000; c > 0; c--) {
		const key = rows.map((r) => r.join("")).join("")

		if (!foundCycle && cache.has(key)) {
			console.log("Hello there")
			const diff = cache.get(key) - c
			utils.logImage(rows)
			console.log(c, diff)
			while (c - diff > 0) {
				c -= diff
			}
			console.log(c)
			foundCycle = true
		}
		for (const [i, dir] of dirs.entries()) {
			if (i < 2) {
				for (let y = 0; y < rows.length; y++) {
					for (let x = 0; x < rows[0].length; x++) {
						if (rows[y][x] === "O") {
							moveRock(rows, x, y, dir[0], dir[1])
						}
					}
				}
			} else {
				for (let y = rows.length - 1; y >= 0; y--) {
					for (let x = rows[0].length - 1; x >= 0; x--) {
						if (rows[y][x] === "O") {
							moveRock(rows, x, y, dir[0], dir[1])
						}
					}
				}
			}
		}

		cache.set(key, c)
	}

	for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[0].length; x++) {
			result += rows[y][x] === "O" ? rows.length - y : 0
		}
	}

	return result
}

export const expectedResult = {
	debug: [136, 64],
	input: [],
}
