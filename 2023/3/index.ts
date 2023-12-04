import { isNum } from "@utils"
import fs from "fs"

let cache: Set<string>
export function one(inputFile: string) {
	cache = new Set()
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	rows.map((r, y) => {
		for (let x = 0; x < r.length; x++) {
			const pos = `${y}-${x}`
			if (!cache.has(pos)) {
				cache.add(pos)
				const num = parseInt(r.substring(x))
				if (!isNaN(num) && num > 0) {
					if (hasSign(rows, y, x)) {
						result += Math.abs(num)
					}
				}
			}
		}
	})

	return result
}

const yDirs = [-1, 0, 1]
const xDirs = [-1, 0, 1]

function hasSign(rows: string[], y: number, x: number) {
	let result = false
	for (const yd of yDirs) {
		for (const xd of xDirs) {
			const yy = y + yd
			const xx = x + xd
			const pos = `${yy}-${xx}`

			if (yy < 0 || yy > rows.length - 1 || xx < 0 || xx > rows[yy].length - 1) continue

			if (isNaN(parseInt(rows[yy][xx])) && rows[yy][xx] !== ".") {
				result = true
			}

			if (yy === y && xx > x && isNum(rows[yy][xx])) {
				cache.add(pos)
				result = hasSign(rows, yy, xx) || result
			}
		}
	}

	return result
}

export function two(inputFile: string) {
	cache = new Set()
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	rows.map((r, y) => {
		for (let x = 0; x < r.length; x++) {
			if (r[x] === "*") {
				const neighbours = getGearRatio(rows, y, x)
				if (neighbours.length === 2) {
					result += neighbours[0] * neighbours[1]
				}
			}
		}
	})

	return result
}

function getGearRatio(rows: string[], y: number, x: number) {
	let coords = new Set<string>()
	let result = []
	for (const yd of yDirs) {
		for (const xd of xDirs) {
			const yy = y + yd
			const xx = x + xd

			if (yy < 0 || yy > rows.length - 1 || xx < 0 || xx > rows[yy].length - 1) continue

			if (isNum(rows[yy][xx])) {
				let tx = xx
				while (isNum(rows[yy][tx])) {
					tx -= 1
				}
				if (!coords.has(`${yy}-${tx + 1}`)) {
					coords.add(`${yy}-${tx + 1}`)
					result.push(parseInt(rows[yy].substring(tx + 1)))
				}
			}
		}
	}

	return result
}

export const expectedResult = {
	debug: [4361, 467835],
	input: [],
}
