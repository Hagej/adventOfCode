import * as utils from "@utils"
import fs from "fs"

const dirs = {
	v: [1, 0],
	"<": [0, -1],
	">": [0, 1],
	"^": [-1, 0]
}


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

	let pos: [number, number] = [0, 0]
	let dir = "^"
	const obstacles = new Set<string>()
	for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[y].length; x++) {
			if (rows[y][x] !== ".") {
				if (rows[y][x] === "#") {
					obstacles.add(`${y},${x}`)
				} else {
					pos = [y, x]
					dir = rows[y][x]
				}
			}
		}
	}

	console.log(obstacles)

	const dimensions: [number, number] = [rows.length, rows[0].length]
	const path = getPath(obstacles, dimensions, pos, dir)
	p1 = path.size

	p2 = getLoops(obstacles, dimensions, pos, dir, new Set(), false)

	// for (const p of path) {
	// 	const [y, x] = p.split(",").map((s) => parseInt(s))
	// 	if (rows[y][x] !== ".") continue
	// 	const map = rows.map((r, yy) => r.map((rr, xx) => xx === x && yy === y ? "#" : rr))

	// 	if (getLoops(map, pos, dir, new Set(), false)) p2 += 1
	// }

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

function getPath(obstacles: Set<string>, dimensions: [number, number], startPos: number[], startDir: string) {
	let pos = startPos
	let dir = startDir
	let nextPos = getNextPos(pos, dir)
	let V = new Set<string>()
	V.add(`${pos[0]},${pos[1]}`)
	while (nextPos[0] > 0 && nextPos[1] > 0 && nextPos[0] < dimensions[0] && nextPos[1] < dimensions[1]) {
		if (obstacles.has(`${nextPos[0]},${nextPos[1]}`)) {
			dir = getNewDir(dir)
		} else {
			pos = nextPos
		}
		nextPos = getNextPos(pos, dir)

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

function getNewDir(dir: string) {
	if (dir === "^") return ">"
	else if (dir === ">") return "v"
	else if (dir === "v") return "<"
	else if (dir === "<") return "^"
}

function getNextPos(pos: number[], dir: string): [number, number] {
	return [pos[0] + dirs[dir][0], pos[1] + dirs[dir][1]]
}

function getLoops(obstacles: Set<string>, dimensions: [number, number], pos: [number, number], dir: string, visited: Set<string>, hasObstacle: boolean) {
	let nextPos = getNextPos(pos, dir)

	visited.add(`${pos[0]},${pos[1]},${dir}`)
	if (nextPos[0] < 0 || nextPos[1] < 0 || nextPos[0] > dimensions[0] || nextPos[1] > dimensions[1]) return 0
	if (visited.has(`${nextPos[0]},${nextPos[1]},${dir}`)) return 1

	let sum = 0
	if (obstacles.has(`${nextPos[0]},${nextPos[1]}`)) {
		dir = getNewDir(dir)
	} else if (!hasObstacle) {
		sum = getLoops(obstacles, dimensions, nextPos, dir, visited, false)

		const obs = `${nextPos[0]},${nextPos[1]}`
		dir = getNewDir(dir)
		nextPos = getNextPos(pos, dir)
		sum += getLoops(new Set([...obstacles, obs]), dimensions, nextPos, dir, visited, true)
		return sum
	}
	return getLoops(obstacles, dimensions, nextPos, dir, visited, true)
}


export const expectedResult = {
	debug: [41, 6],
	input: [5086, 1770],
}
