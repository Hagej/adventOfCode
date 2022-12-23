import * as utils from "@utils"
import fs from "fs"
import { createBuilderStatusReporter } from "typescript"

let columns: Map<number, [number, string][]>
let rows: Map<number, [number, string][]>
let map: string[] = []

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")

	columns = new Map<number, [number, string][]>()
	rows = new Map<number, [number, string][]>()

	let start: [number, number]
	const t = file.split("\n\n")[0].split("\n")
	for (const [y, str] of t.entries()) {
		const chars = str.split("")
		for (const [x, ch] of chars.entries()) {
			if (ch !== " ") {
				if (ch !== "#" && ch != ".") console.log(ch)
				if (!start && ch === ".") start = [x + 1, y + 1]

				columns.set(x + 1, [...(columns.get(x + 1) || []), [y + 1, ch]])
				rows.set(y + 1, [...(rows.get(y + 1) || []), [x + 1, ch]])
			}
		}
	}
	const inst = []
	let I = file.split("\n\n")[1].trim()
	while (I.length > 0) {
		const int = parseInt(I)
		if (!isNaN(int)) {
			inst.push(int)
			I = I.slice(`${int}`.length)
		} else {
			inst.push(I[0])
			I = I.slice(1)
		}
	}
	let pos = start
	let dir = 0
	for (const move of inst) {
		console.log(dir / Math.PI)
		if (typeof move === "number") {
			for (let i = 0; i < move; i++) {
				const next = findNext(pos, dir)
				if (!next) break
				pos = next
			}
		} else {
			if (move === "R") dir -= Math.PI / 2
			if (move === "L") dir += Math.PI / 2
		}
	}

	if (Math.round(Math.cos(dir)) === 1) {
		dir = 0
	} else if (Math.round(Math.cos(dir)) === -1) {
		dir = 2
	} else if (Math.round(Math.sin(dir)) === 1) {
		dir = 3
	} else if (Math.round(Math.sin(dir)) === -1) {
		dir = 1
	}

	result = 1000 * pos[1] + 4 * pos[0] + dir

	return result
}

function findNext(pos: [number, number], dir: number): [number, number] {
	const [x, y] = pos
	let [dx, dy] = [Math.round(Math.cos(dir)), Math.round(Math.sin(dir))]
	dy *= -1

	const row = rows.get(y + dy)
	if (row && row.find((r) => r[0] === x + dx)) {
		return row.find((r) => r[0] === x + dx)[1] === "." ? [x + dx, y + dy] : undefined
	}

	if (dx === 1) {
		const row = rows.get(y)
		if (row[0][1] === "#") return
		return [row[0][0], y]
	}
	if (dx === -1) {
		const row = rows.get(y)
		if (row[row.length - 1][1] === "#") return
		return [row[row.length - 1][0], y]
	}
	if (dy === 1) {
		const column = columns.get(x)
		if (column[0][1] === "#") return
		return [x, column[0][0]]
	}
	const column = columns.get(x)
	if (column[column.length - 1][1] === "#") return
	return [x, column[column.length - 1][0]]
}

function findNextTwo(pos: [number, number], dir: number, side: number): [number, number] {
	let [x, y] = pos
	let [dx, dy] = [Math.round(Math.cos(dir)), -Math.round(Math.sin(dir))]

	const row = rows.get(y + dy)
	if (row && row.find((r) => r[0] === x + dx)) {
		return row.find((r) => r[0] === x + dx)[1] === "." ? [x + dx, y + dy] : undefined
	}

	const [sx, sy] = [Math.floor(x / side), Math.floor(y / side)]

	if (dx === 1) {
	}
	if (dx === -1) {
		const row = rows.get(y)
		if (row[row.length - 1][1] === "#") return
		return [row[row.length - 1][0], y]
	}
	if (dy === 1) {
		const column = columns.get(x)
		if (column[0][1] === "#") return
		return [x, column[0][0]]
	}
	const column = columns.get(x)
	if (column[column.length - 1][1] === "#") return
	return [x, column[column.length - 1][0]]
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")

	columns = new Map<number, [number, string][]>()
	rows = new Map<number, [number, string][]>()

	let start: [number, number]
	map = file.split("\n\n")[0].split("\n")
	const [width, height] = [map[0].length, map.length]
	const side = width / utils.ratio(width, height)[0]

	const cube: string[][][] = []

	for (let z = 0; z < side; z++) {
		cube.push(new Array())
		for (let y = 0; y < side; y++) {
			cube[z].push(new Array())
			for (let x = 0; x < side; x++) {
				cube[z][y].push(" ")
			}
		}
	}

	const isSide = (x: number, y: number) => {
		return map[Math.floor(y / side)][Math.floor(x / side)] !== " "
	}

	let sy = 0
	let sx = 0

	const V = new Set<string>()
	const Q: [[number, number], [number, number, number]] = []
	for (let x = 0; x < width / side; x++) {
		if (map[0][x * 50 - 1] !== " ") {
			sx = x
			break
		}
	}
	V.add(`${sx},${sy}`)
	if (isSide((sx + 1) * 50, sy * 50))
		Q.push([
			[sx, sy],
			[4, 0, 0],
		])
	if (isSide(sx * 50, (sy + 1) * 50))
		Q.push([
			[sx, sy],
			[0, 4, 0],
		])

	while (Q.length > 0) {
		const cur = Q.pop()
	}

	for (const [y, str] of map.entries()) {
		const chars = str.split("")
		for (const [x, ch] of chars.entries()) {
			if (ch !== " ") {
				if (!start && ch === ".") start = [x + 1, y + 1]

				columns.set(x + 1, [...(columns.get(x + 1) || []), [y + 1, ch]])
				rows.set(y + 1, [...(rows.get(y + 1) || []), [x + 1, ch]])
			}
		}
	}

	const inst = []
	let I = file.split("\n\n")[1].trim()
	while (I.length > 0) {
		const int = parseInt(I)
		if (!isNaN(int)) {
			inst.push(int)
			I = I.slice(`${int}`.length)
		} else {
			inst.push(I[0])
			I = I.slice(1)
		}
	}
	let pos = start
	let dir = 0

	for (const move of inst) {
		if (typeof move === "number") {
			for (let i = 0; i < move; i++) {
				const next = findNextTwo(pos, dir)
				if (!next) break
				pos = next
			}
		} else {
			if (move === "R") dir -= Math.PI / 2
			if (move === "L") dir += Math.PI / 2
		}
	}

	if (Math.round(Math.cos(dir)) === 1) {
		dir = 0
	} else if (Math.round(Math.cos(dir)) === -1) {
		dir = 2
	} else if (Math.round(Math.sin(dir)) === 1) {
		dir = 3
	} else if (Math.round(Math.sin(dir)) === -1) {
		dir = 1
	}

	result = 1000 * pos[1] + 4 * pos[0] + dir

	return result
}

export const expectedResult = {
	debug: [6032],
	input: [],
}
