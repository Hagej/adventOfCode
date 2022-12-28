import * as utils from "@utils"
import fs from "fs"
import { createBuilderStatusReporter, idText } from "typescript"

let columns: Map<number, [number, string][]>
let rows: Map<number, [number, string][]>
let map: string[][] = []

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

function findNextTwo(pos: [number, number], dir: number, side: Side): [number, [number, number] | number] {
	let [x, y] = pos
	let [dx, dy] = [Math.round(Math.cos(dir)), -Math.round(Math.sin(dir))]
	const [nx, ny] = [x + dx, y + dy]

	if (ny >= 0 && ny <= map.length - 1 && nx >= 0 && nx <= map[0].length - 1 && map[ny][nx] !== " ") {
		return map[ny][nx] === "." ? [dir, [nx, ny]] : [dir, 0]
	}

	let dl = 0
	const [rx, ry] = [x % sideLength, y % sideLength]
	let index: number
	if (dx === 1) {
		dl = ry
		index = 1
	}
	if (dx === -1) {
		index = 3
		dl = ry
	}
	if (dy === 1) {
		index = 2
		dl = rx
	}
	if (dy === -1) {
		index = 0
		dl = rx
	}
	let [nextSide, edge, inverted] = sideMap[side][index]
	const next = sides[nextSide]

	if (inverted) {
		dl = sideLength - dl - 1
	}

	let n: [number, number] | number
	let newDir = dir
	if (edge === 0) {
		n = [next[0] * sideLength + dl, next[1] * sideLength]
		if (map[n[1]][n[0]] === "#") n = 0
		else newDir = -Math.PI / 2
	}
	if (edge === 2) {
		n = [next[0] * sideLength + dl, next[1] * sideLength + sideLength - 1]
		if (map[n[1]][n[0]] === "#") n = 0
		else newDir = Math.PI / 2
	}
	if (edge === 1) {
		n = [next[0] * sideLength + sideLength - 1, next[1] * sideLength + dl]
		if (map[n[1]][n[0]] === "#") n = 0
		else newDir = Math.PI
	}
	if (edge === 3) {
		n = [next[0] * sideLength, next[1] * sideLength + dl]
		if (map[n[1]][n[0]] === "#") n = 0
		else newDir = 0
	}
	return [newDir, n]
}

function isSide(x: number, y: number) {
	return !!map[y][x] && map[y][x] !== " "
}

type Side = "u" | "d" | "r" | "l" | "b" | "f"
let sideLength: number

const sides: Partial<Record<Side, [number, number]>> = {}

const getSide = (x: number, y: number) => {
	return Object.entries(sides)
		.filter(([k, v]) => v[0] === Math.floor(x / sideLength) && v[1] === Math.floor(y / sideLength))
		.map(([k, v]) => k)[0] as Side
}

const sideMap: Record<Side, [[Side, number, boolean], [Side, number, boolean], [Side, number, boolean], [Side, number, boolean]]> = {
	b: [
		["u", 3, false],
		["r", 3, false],
		["d", 0, false],
		["l", 3, true],
	],
	d: [
		["b", 2, false],
		["r", 2, false],
		["f", 0, false],
		["l", 0, false],
	],
	f: [
		["d", 2, false],
		["r", 1, true],
		["u", 1, false],
		["l", 1, false],
	],
	u: [
		["l", 2, false],
		["f", 2, false],
		["r", 0, false],
		["b", 0, false],
	],
	r: [
		["u", 2, false],
		["f", 1, true],
		["d", 1, false],
		["b", 1, false],
	],
	l: [
		["d", 3, false],
		["f", 3, false],
		["u", 0, false],
		["b", 3, true],
	],
}

function findSides(cur: string, sx: number, sy: number) {
	if ((sx + 1) * sideLength < map[0].length && isSide((sx + 1) * sideLength, sy * sideLength)) {
		if (!sides[sideMap[cur][1][0]]) {
			sides[sideMap[cur][1][0]] = [sx + 1, sy]
			findSides(sideMap[cur][1][0], sx + 1, sy)
		}
	}

	if (sx - 1 >= 0 && isSide((sx - 1) * sideLength, sy * sideLength)) {
		if (!sides[sideMap[cur][3][0]]) {
			sides[sideMap[cur][3][0]] = [sx - 1, sy]
			findSides(sideMap[cur][3][0], sx - 1, sy)
		}
	}

	if ((sy + 1) * sideLength < map.length && isSide(sx * sideLength, (sy + 1) * sideLength)) {
		if (!sides[sideMap[cur][2][0]]) {
			sides[sideMap[cur][2][0]] = [sx, sy + 1]
			findSides(sideMap[cur][2][0], sx, sy + 1)
		}
	}

	if (sy - 1 >= 0 && isSide(sx * sideLength, (sy - 1) * sideLength)) {
		if (!sides[sideMap[cur][0][0]]) {
			sides[sideMap[cur][0][0]] = [sx, sy - 1]
			findSides(sideMap[cur][0][0], sx, sy - 1)
		}
	}
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")

	columns = new Map<number, [number, string][]>()
	rows = new Map<number, [number, string][]>()

	let start: [number, number]
	map = file
		.split("\n\n")[0]
		.split("\n")
		.map((l) => l.split(""))
	const [width, height] = [map[0].length, map.length]
	sideLength = width / utils.ratio(width, height)[0]

	let sy = 0
	let sx = 0

	for (let x = 0; x < width / sideLength; x++) {
		if (map[0][x * sideLength] !== " ") {
			start = [x * sideLength, 0]
			sx = x
			break
		}
	}
	sides["b"] = [sx, sy]
	findSides("b", sx, sy)

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

	const V = new Set<string>()

	for (const move of inst) {
		if (typeof move === "number") {
			for (let i = 0; i < move; i++) {
				const [newDir, next] = findNextTwo(pos, dir, getSide(pos[0], pos[1]))
				if (typeof next === "number") break
				dir = newDir
				V.add(`${next[0]},${next[1]}`)
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

	result = 1000 * (pos[1] + 1) + 4 * (pos[0] + 1) + dir

	return result
}

export const expectedResult = {
	debug: [6032, 5031],
	input: [],
}
