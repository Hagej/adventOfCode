import * as utils from "../../utils/index.ts"

export function one(inputFile: string) {
	const file = Deno.readTextFileSync(inputFile)
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split("")
			return row
		})

	let moved = true
	let turns = 0
	height = rows.length
	width = rows[0].length
	while (moved) {
		const m1 = moveCucumbers(rows, "EAST")
		const m2 = moveCucumbers(rows, "SOUTH")
		moved = m1 || m2
		turns++
	}

	return turns
}

let width = 0
let height = 0

function moveCucumbers(board: string[][], face: "EAST" | "SOUTH") {
	let moved = false
	const C = face === "EAST" ? ">" : "v"
	const di = face === "EAST" ? 0 : 1
	const dj = face === "EAST" ? 1 : 0
	const skip = new Set()
	const shouldMove: [number, number][] = []
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			if (skip.has(`(${i},${j})`)) {
				continue
			}
			if (board[i][j] === C && board[(i + di) % height][(j + dj) % width] === ".") {
				skip.add(`(${(i + di) % height},${(j + dj) % width})`)
				shouldMove.push([i, j])
				moved = true
			}
		}
	}
	for (const [i, j] of shouldMove) {
		board[(i + di) % height][(j + dj) % width] = C
	}
	for (const [i, j] of shouldMove) {
		board[i][j] = "."
	}
	return moved
}

export function two(inputFile: string) {
	one(inputFile)
}

export const expectedResult = {
	debug: [],
	input: [],
}
