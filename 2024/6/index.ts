import * as utils from "@utils"
import fs from "fs"

const dirs = {
	v: [1, 0],
	"<": [0, -1],
	">": [0, 1],
	"^": [-1, 0]
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

	let pos = [0, 0]
	let dir = "^"
	loop1: for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[y].length; x++) {
			if (rows[y][x] !== "." && rows[y][x] !== "#") {
				pos = [y, x]
				dir = rows[y][x]
				break loop1
			}
		}
	}

	const path = getPath(rows, pos, dir)

	result = path.size

	return result
}

function getPath(map: string[][], startPos: number[], startDir: string) {
	let pos = startPos
	let dir = startDir
	let nextPos = [pos[0] + dirs[dir][0], pos[1] + dirs[dir][1]]
	let V = new Set<string>()
	V.add(`${pos[0]},${pos[1]}`)
	while (map[nextPos[0]]?.[nextPos[1]]) {
		if (map[nextPos[0]][nextPos[1]] === "#") {
			if (dir === "^") dir = ">"
			else if (dir === ">") dir = "v"
			else if (dir === "v") dir = "<"
			else if (dir === "<") dir = "^"
		} else {
			pos = nextPos
		}
		nextPos = [pos[0] + dirs[dir][0], pos[1] + dirs[dir][1]]

		V.add(`${pos[0]},${pos[1]}`)
	}
	return V
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

	let pos = [0, 0]
	let dir = "^"
	loop1: for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[y].length; x++) {
			if (rows[y][x] !== "." && rows[y][x] !== "#") {
				pos = [y, x]
				dir = rows[y][x]
				break loop1
			}
		}
	}

	const path = getPath(rows, pos, dir)

	for (const p of path) {
		const [y, x] = p.split(",").map((s) => parseInt(s))
		if (rows[y][x] !== ".") continue
		let map: string[][] = JSON.parse(JSON.stringify(rows))
		map[y][x] = "#"
		if (isLoop(map, pos, dir)) result += 1
	}

	return result
}

function isLoop(map: string[][], startPos: number[], startDir: string) {
	let pos = startPos
	let dir = startDir
	let nextPos = [pos[0] + dirs[dir][0], pos[1] + dirs[dir][1]]
	let V = new Set()
	V.add(`${pos[0]},${pos[1]},${dir}`)
	while (map[nextPos[0]]?.[nextPos[1]]) {
		if (V.has(`${nextPos[0]},${nextPos[1]},${dir}`)) return true
		if (map[nextPos[0]][nextPos[1]] === "#") {
			if (dir === "^") dir = ">"
			else if (dir === ">") dir = "v"
			else if (dir === "v") dir = "<"
			else if (dir === "<") dir = "^"
		} else {
			pos = nextPos
		}
		nextPos = [pos[0] + dirs[dir][0], pos[1] + dirs[dir][1]]

		V.add(`${pos[0]},${pos[1]},${dir}`)
	}
	return false
}


export const expectedResult = {
	debug: [41, 6],
	input: [],
}
