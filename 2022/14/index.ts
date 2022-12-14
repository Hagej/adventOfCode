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

	const map = new Array(200).fill(null).map(() => new Array(600).fill("."))
	let LP = 0
	rows.map((r, index) => {
		const coords = r.split(" -> ").map((c) => c.split(",").map((s) => parseInt(s)))

		for (let i = 0; i < coords.length - 1; i++) {
			if (coords[i][0] != coords[i + 1][0]) {
				for (let x = Math.min(coords[i][0], coords[i + 1][0]); x <= Math.max(coords[i][0], coords[i + 1][0]); x++) {
					map[coords[i][1]][x] = "#"
				}
			} else {
				for (let y = Math.min(coords[i][1], coords[i + 1][1]); y <= Math.max(coords[i][1], coords[i + 1][1]); y++) {
					map[y][coords[i][0]] = "#"
				}
			}
			LP = Math.max(LP, coords[i][1], coords[i + 1][1])
		}
	})

	function moveSand(pos: [number, number]) {
		const [x, y] = pos
		if (y > LP) return [x, y]
		if (map[y + 1][x] === ".") {
			return moveSand([x, y + 1])
		} else if (map[y + 1][x - 1] === ".") {
			return moveSand([x - 1, y + 1])
		} else if (map[y + 1][x + 1] === ".") {
			return moveSand([x + 1, y + 1])
		} else {
			return [x, y]
		}
	}

	const SP: [number, number] = [500, 0]
	while (true) {
		const cur: [number, number] = [SP[0], SP[1]]
		const [x, y] = moveSand(cur)
		if (y > LP) {
			map[y][x] = "~"
			break
		}
		map[y][x] = "o"
		result++
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

	const map = new Array(200).fill(null).map(() => new Array(800).fill("."))
	let LP = 0
	rows.map((r, index) => {
		const coords = r.split(" -> ").map((c) => c.split(",").map((s) => parseInt(s)))

		for (let i = 0; i < coords.length - 1; i++) {
			if (coords[i][0] != coords[i + 1][0]) {
				for (let x = Math.min(coords[i][0], coords[i + 1][0]); x <= Math.max(coords[i][0], coords[i + 1][0]); x++) {
					map[coords[i][1]][x] = "#"
				}
			} else {
				for (let y = Math.min(coords[i][1], coords[i + 1][1]); y <= Math.max(coords[i][1], coords[i + 1][1]); y++) {
					map[y][coords[i][0]] = "#"
				}
			}
			LP = Math.max(LP, coords[i][1], coords[i + 1][1])
		}
	})
	for (let x = 0; x < 800; x++) {
		map[LP + 2][x] = "#"
	}

	function moveSand(pos: [number, number]) {
		const [x, y] = pos
		if (map[y + 1][x] === ".") {
			return moveSand([x, y + 1])
		} else if (map[y + 1][x - 1] === ".") {
			return moveSand([x - 1, y + 1])
		} else if (map[y + 1][x + 1] === ".") {
			return moveSand([x + 1, y + 1])
		} else {
			return [x, y]
		}
	}

	const SP: [number, number] = [500, 0]
	while (true) {
		const cur: [number, number] = [SP[0], SP[1]]
		const [x, y] = moveSand(cur)
		map[y][x] = "o"
		result++
		if (x === 500 && y === 0) {
			break
		}
	}

	utils.logImage(map)

	return result
}

export const expectedResult = {
	debug: [24, 93],
	input: [],
}
