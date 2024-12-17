import * as utils from "@utils"
import fs from "fs"

const mv = {
	"<": [-1, 0],
	">": [1, 0],
	"^": [0, -1],
	"v": [0, 1]
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

	let [xPos, yPos] = [0, 0]
	let [endX, endY] = [0, 0]
	let dir = ">"

	rows.forEach((r, y) => {
		r.forEach((s, x) => {
			if (s === "S") {
				xPos = x
				yPos = y
			}
			if (s === "E") {
				endX = x
				endY = y
			}
		})
	})

	const Q = new utils.PriorityQueue<{ dir: string, pos: [number, number], tiles: string[] }>()
	const V = {}
	let T = new Set<string>()
	Q.enqueue({ dir, pos: [xPos, yPos], tiles: new Set<string>() }, 0)
	let min = Number.MAX_SAFE_INTEGER
	while (!Q.isEmpty()) {
		const { priority, element: { dir, pos: [x, y], tiles } } = Q.dequeue()
		let t = [...tiles]
		t.push(`${x},${y}`)
		const key = `${x},${y},${dir}`
		if (V[key] < priority) continue

		V[key] = priority
		if (x === endX && y === endY) {
			if (priority < min) {
				T = new Set(tiles)
				min = priority
				p1 = priority
			}
			if (priority === min) {
				T = new Set([...T, ...tiles])
			}
			if (priority > min) {
				break
			}
			continue
		}
		const [dx, dy] = mv[dir]
		const [nx, ny] = [x + dx, y + dy]
		if (rows[ny][nx] !== "#") {
			Q.enqueue({ dir, pos: [nx, ny], tiles: t }, priority + 1)
		}
		if (dir === ">" || dir === "<") {
			let [xx, yy] = [x, y - 1]
			if (rows[yy][xx] !== "#") {
				Q.enqueue({ dir: "^", pos: [xx, yy], tiles: t }, priority + 1001)
			}

			[xx, yy] = [x, y + 1]
			if (rows[yy][xx] !== "#") {
				Q.enqueue({ dir: "v", pos: [xx, yy], tiles: t }, priority + 1001)
			}
		} else if (dir === "^" || dir === "v") {
			let [xx, yy] = [x - 1, y]
			if (rows[yy][xx] !== "#") {
				Q.enqueue({ dir: "<", pos: [xx, yy], tiles: t }, priority + 1001)
			}

			[xx, yy] = [x + 1, y]
			if (rows[yy][xx] !== "#") {
				Q.enqueue({ dir: ">", pos: [xx, yy], tiles: t }, priority + 1001)
			}
		}
	}

	p2 = T.size + 1

	return [p1, p2]
}
export function one(inputFile: string) {
	let result = Number.MAX_SAFE_INTEGER
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split("")
			return row
		})

	let [xPos, yPos] = [0, 0]
	let [endX, endY] = [0, 0]
	let dir = ">"

	rows.forEach((r, y) => {
		r.forEach((s, x) => {
			if (s === "S") {
				xPos = x
				yPos = y
			}
			if (s === "E") {
				endX = x
				endY = y
			}
		})
	})

	const Q = new utils.PriorityQueue<{ dir: string, pos: [number, number] }>()
	const V = new Set<string>()
	Q.enqueue({ dir, pos: [xPos, yPos] }, 0)
	while (!Q.isEmpty()) {
		const { priority, element: { dir, pos: [x, y] } } = Q.dequeue()
		const key = `${x},${y},${dir}`
		if (V.has(key)) continue
		V.add(key)
		if (x === endX && y === endY) {
			result = Math.min(priority, result)
			continue
		}
		const [dx, dy] = mv[dir]
		const [nx, ny] = [x + dx, y + dy]
		if (rows[ny][nx] !== "#") {
			Q.enqueue({ dir, pos: [nx, ny] }, priority + 1)

		}
		if (dir === ">" || dir === "<") {
			let [xx, yy] = [x + mv["^"][0], y + mv["^"][1]]
			if (rows[yy][xx] !== "#") {
				Q.enqueue({ dir: "^", pos: [xx, yy] }, priority + 1001)
			}

			[xx, yy] = [x + mv["v"][0], y + mv["v"][1]]
			if (rows[yy][xx] !== "#") {
				Q.enqueue({ dir: "v", pos: [xx, yy] }, priority + 1001)
			}
		}
		if (dir === "^" || dir === "v") {
			let [xx, yy] = [x + mv["<"][0], y + mv["<"][1]]
			if (rows[yy][xx] !== "#") {
				Q.enqueue({ dir: "<", pos: [xx, yy] }, priority + 1001)
			}

			[xx, yy] = [x + mv[">"][0], y + mv[">"][1]]
			if (rows[yy][xx] !== "#") {
				Q.enqueue({ dir: ">", pos: [xx, yy] }, priority + 1001)
			}
		}
	}

	return result
}

export function two(inputFile: string) {
	let result = Number.MAX_SAFE_INTEGER
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split("")
			return row
		})

	let [xPos, yPos] = [0, 0]
	let [endX, endY] = [0, 0]
	let dir = ">"

	rows.forEach((r, y) => {
		r.forEach((s, x) => {
			if (s === "S") {
				xPos = x
				yPos = y
			}
			if (s === "E") {
				endX = x
				endY = y
			}
		})
	})

	const Q = new utils.PriorityQueue<{ dir: string, pos: [number, number], tiles: Set<string> }>()
	const V = {}
	let T = new Set<string>()
	Q.enqueue({ dir, pos: [xPos, yPos], tiles: new Set<string>() }, 0)
	let min = Number.MAX_SAFE_INTEGER
	while (!Q.isEmpty()) {
		const { priority, element: { dir, pos: [x, y], tiles } } = Q.dequeue()
		let t = new Set([...tiles])
		t.add(`${x},${y}`)
		const key = `${x},${y},${dir}`
		if (V[key] < priority) continue
		V[key] = priority
		if (x === endX && y === endY) {
			if (priority < min) {
				T = tiles
				min = priority
			}
			if (priority === min) {
				T = new Set([...T, ...tiles])
			}
			continue
		}
		const [dx, dy] = mv[dir]
		const [nx, ny] = [x + dx, y + dy]
		if (rows[ny][nx] !== "#") {
			Q.enqueue({ dir, pos: [nx, ny], tiles: t }, priority + 1)

		}
		if (dir === ">" || dir === "<") {
			let [xx, yy] = [x + mv["^"][0], y + mv["^"][1]]
			if (rows[yy][xx] !== "#") {
				Q.enqueue({ dir: "^", pos: [xx, yy], tiles: t }, priority + 1001)
			}

			[xx, yy] = [x + mv["v"][0], y + mv["v"][1]]
			if (rows[yy][xx] !== "#") {
				Q.enqueue({ dir: "v", pos: [xx, yy], tiles: t }, priority + 1001)
			}
		}
		if (dir === "^" || dir === "v") {
			let [xx, yy] = [x + mv["<"][0], y + mv["<"][1]]
			if (rows[yy][xx] !== "#") {
				Q.enqueue({ dir: "<", pos: [xx, yy], tiles: t }, priority + 1001)
			}

			[xx, yy] = [x + mv[">"][0], y + mv[">"][1]]
			if (rows[yy][xx] !== "#") {
				Q.enqueue({ dir: ">", pos: [xx, yy], tiles: t }, priority + 1001)
			}
		}
	}

	result = T.size + 1

	return result
}

export const expectedResult = {
	debug: [11048, 64],
	input: [83444, 483],
}
