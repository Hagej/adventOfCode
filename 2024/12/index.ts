import * as utils from "@utils"
import { cardinals } from "@utils/constants"
import fs from "fs"


export function both(inputFile: string) {
	let [p1, p2] = [0, 0]
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split("")
			return row
		})


	let V = new Set<string>()

	for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[y].length; x++) {
			let positions = new Set<string>()
			if (V.has(`${x},${y}`)) continue
			const [area, p] = calcArea(rows, positions, x, y)
			p1 += area * p
			V = new Set([...V, ...positions])
			const pos = [...positions].map((p) => p.split(",").map((n) => parseInt(n)) as [number, number])
			const sides = calcSides(rows, pos)
			p2 += area * sides
		}
	}

	return [p1, p2]
}
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

	let V = new Set<string>()

	for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[y].length; x++) {
			const res = calcArea(rows, V, x, y)
			result += res[0] * res[1]
		}
	}

	return result
}

function calcArea(map: string[][], visited: Set<string>, x: number, y: number) {
	const key = `${x},${y}`

	if (visited.has(key)) return [0, 0]
	visited.add(key)
	const cur = map[y][x]
	let area = 1
	let perimeter = 0
	for (const [dx, dy] of cardinals) {
		if (map[y + dy]?.[x + dx] === cur) {
			const res = calcArea(map, visited, x + dx, y + dy)
			area += res[0]
			perimeter += res[1]
		} else {
			perimeter += 1
		}
	}
	return [area, perimeter]
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


	let V = new Set<string>()

	for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[y].length; x++) {
			let positions = new Set<string>()
			if (V.has(`${x},${y}`)) continue
			const [area, p] = calcArea(rows, positions, x, y)
			V = new Set([...V, ...positions])
			const pos = [...positions].map((p) => p.split(",").map((n) => parseInt(n)) as [number, number])
			const sides = calcSides(rows, pos)
			result += area * sides
		}
	}

	return result
}

function calcSides(map: string[][], positions: [number, number][]) {
	let vSides = 0
	let hSides = 0

	for (let yy = 0; yy < map.length; yy++) {
		const pos = positions.filter((p) => p[1] === yy).sort((a, b) => a[0] - b[0])
		if (pos.length === 0) continue
		let up = false
		let down = false

		for (const [x, y] of pos) {
			const cur = map[y][x]
			if (map[y - 1]?.[x] !== cur) {
				if (!up) {
					hSides++
					up = true
				}
			} else {
				up = false
			}
			if (map[y + 1]?.[x] !== cur) {
				if (!down) {
					hSides++
					down = true
				}
			} else {
				down = false
			}
			if (map[y]?.[x + 1] !== cur) {
				up = false
				down = false
			}
		}
	}

	for (let xx = 0; xx < map[0].length; xx++) {
		const pos = positions.filter((p) => p[0] === xx).sort((a, b) => a[1] - b[1])
		if (pos.length === 0) continue
		let left = false
		let right = false
		for (const [x, y] of pos) {
			const cur = map[y][x]
			if (map[y]?.[x - 1] !== cur) {
				if (!left) {
					vSides++
					left = true
				}
			} else {
				left = false
			}
			if (map[y]?.[x + 1] !== cur) {
				if (!right) {
					hSides++
					right = true
				}
			} else {
				right = false
			}
			if (map[y + 1]?.[x] !== cur) {
				right = false
				left = false
			}
		}
	}

	return vSides + hSides
}

export const expectedResult = {
	debug: [1930, 1206],
	input: [1370100, 818286],
}
