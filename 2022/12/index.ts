import * as utils from "@utils"
import { PriorityQueue } from "@utils"
import fs from "fs"
import { getModeForResolutionAtIndex, visitEachChild } from "typescript"

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

	const grid = rows.map((r, index) => r.split(""))

	const w = grid[0].length
	const h = grid.length
	let S: [number, number]
	let E: [number, number]

	for (let i = 0; i < h; i++) {
		for (let j = 0; j < w; j++) {
			if (grid[i][j] === "S") {
				S = [i, j]
				grid[i][j] = "a"
			}
			if (grid[i][j] === "E") {
				E = [i, j]
				grid[i][j] = "z"
			}
		}
	}
	const PQ = new PriorityQueue<[number, number]>()
	const V = new Set<string>()
	const W: Record<string, number> = {}
	const DIR: [number, number][] = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
	]
	PQ.enqueue(S, 0)

	while (!PQ.isEmpty()) {
		const { element, priority } = PQ.dequeue()
		if (element[0] === E[0] && element[1] === E[1]) {
			result = priority
			break
		}
		V.add(`(${element[1]}, ${element[0]})`)
		for (const d of DIR) {
			const y = element[0] + d[0]
			const x = element[1] + d[1]
			if (y >= 0 && y < h && x >= 0 && x < w) {
				const next = grid[y][x]
				const cur = grid[element[0]][element[1]]
				if (!V.has(`(${x}, ${y})`) && next.charCodeAt(0) - cur.charCodeAt(0) <= 1 && (!W[`(${x}, ${y})`] || W[`(${x}, ${y})`] > priority + 1)) {
					W[`(${x}, ${y})`] = priority + 1
					PQ.enqueue([y, x], priority + 1)
				}
			}
		}
	}

	return result
}

export function two(inputFile: string) {
	let result = Infinity
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	const grid = rows.map((r, index) => r.split(""))

	const w = grid[0].length
	const h = grid.length
	let S: [number, number]
	let E: [number, number]

	const SQ: [number, number][] = []
	for (let i = 0; i < h; i++) {
		for (let j = 0; j < w; j++) {
			if (grid[i][j] === "S") {
				S = [i, j]
				grid[i][j] = "a"
			}
			if (grid[i][j] === "a") {
				SQ.push([i, j])
			}
			if (grid[i][j] === "E") {
				E = [i, j]
				grid[i][j] = "z"
			}
		}
	}

	const DIR: [number, number][] = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
	]

	while (SQ.length > 0) {
		const PQ = new PriorityQueue<[number, number]>()
		PQ.enqueue(SQ.pop(), 0)
		const V = new Set<string>()
		const W: Record<string, number> = {}
		while (!PQ.isEmpty()) {
			const { element, priority } = PQ.dequeue()
			if (element[0] === E[0] && element[1] === E[1]) {
				result = Math.min(priority, result)
				break
			}
			V.add(`(${element[1]}, ${element[0]})`)
			for (const d of DIR) {
				const y = element[0] + d[0]
				const x = element[1] + d[1]
				if (y >= 0 && y < h && x >= 0 && x < w) {
					const next = grid[y][x]
					const cur = grid[element[0]][element[1]]
					if (!V.has(`(${x}, ${y})`) && next.charCodeAt(0) - cur.charCodeAt(0) <= 1 && (!W[`(${x}, ${y})`] || W[`(${x}, ${y})`] > priority + 1)) {
						W[`(${x}, ${y})`] = priority + 1
						PQ.enqueue([y, x], priority + 1)
					}
				}
			}
		}
	}

	return result
}

export const expectedResult = {
	debug: [31, 29],
	input: [],
}
