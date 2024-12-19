import * as utils from "@utils"
import fs from "fs"

const mv = {
	"<": [-1, 0],
	">": [1, 0],
	"^": [0, -1],
	"v": [0, 1]
}
export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((r) => r.split("\n"))


	const map = rows[0].map((r) => r.split(""))
	const moves = rows[1].flatMap((r) => r.split(""))

	let [xPos, yPos] = [0, 0]

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[0].length; x++) {
			if (map[y][x] === "@") {
				xPos = x
				yPos = y
				map[y][x] = "."
				y = map.length
				break
			}
		}
	}

	for (const move of moves) {
		const [dx, dy] = mv[move]
		const [nx, ny] = [xPos + dx, yPos + dy]

		if (map[ny][nx] === "#") continue
		if (map[ny][nx] === ".") {
			xPos = nx
			yPos = ny
			continue
		}

		// Box found
		let [bx, by] = [nx + dx, ny + dy]
		while (map[by][bx] === "O") {
			[bx, by] = [bx + dx, by + dy]
		}
		if (map[by][bx] === "#") continue

		xPos = nx
		yPos = ny
		map[ny][nx] = "."
		map[by][bx] = "O"
	}

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[0].length; x++) {
			if (map[y][x] === "O") {
				result += y * 100 + x
			}
		}
	}

	return result
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((r) => r.split("\n"))


	const map = rows[0].map((r) => r.replaceAll("#", "##").replaceAll("O", "[]").replaceAll(".", "..").replace("@", "@.").split(""))
	const moves = rows[1].flatMap((r) => r.split(""))

	let [xPos, yPos] = [0, 0]

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[0].length; x++) {
			if (map[y][x] === "@") {
				xPos = x
				yPos = y
				map[y][x] = "."
				y = map.length
				break
			}
		}
	}

	for (const move of moves) {
		const [dx, dy] = mv[move]
		const [nx, ny] = [xPos + dx, yPos + dy]

		if (map[ny][nx] === "#") continue
		if (map[ny][nx] === ".") {
			xPos = nx
			yPos = ny
			continue
		}


		const boxesMoved = moveBoxes(map, [nx, ny], move)
		if (boxesMoved) {
			xPos = nx
			yPos = ny
			const bm = [...new Set([...boxesMoved.map((v) => `${v[0]},${v[1]}`)])].map((s) => [parseInt(s.split(",")[0]), parseInt(s.split(",")[1])])
			for (const [bx, by] of bm as [number, number][]) {
				map[by + dy][bx + dx] = map[by][bx]
				map[by][bx] = "."
			}
		}
	}

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[0].length; x++) {
			if (map[y][x] === "[") {
				result += y * 100 + x
			}
		}
	}

	return result
}

function moveBoxes(map: string[][], pos: [number, number], dir: string): [number, number][] | false {
	const cur = map[pos[1]][pos[0]]
	if (cur === ".") return []
	if (cur === "#") return false

	const [dx, dy] = mv[dir]

	const fw = map[pos[1] + dy][pos[0] + dx]
	if (fw === "#") return false
	const fwRes = moveBoxes(map, [pos[0] + dx, pos[1] + dy], dir)
	if (!fwRes) return false
	if (dir === "^" || dir === "v") {
		if (cur === "]") {
			const leftRes = moveBoxes(map, [pos[0] - 1, pos[1] + dy], dir)
			if (leftRes) {
				return [...leftRes, ...fwRes, [pos[0], pos[1]], [pos[0] - 1, pos[1]]]
			}
			return false
		}

		if (cur === "[") {
			const rightRes = moveBoxes(map, [pos[0] + 1, pos[1] + dy], dir)
			if (rightRes) {
				return [...rightRes, ...fwRes, [pos[0], pos[1]], [pos[0] + 1, pos[1]]]
			}
			return false
		}
	} else {
		if (fw === ".") return [[pos[0], pos[1]]]

		return [...fwRes, [pos[0], pos[1]]]
	}
}

export const expectedResult = {
	debug: [10092, 9021],
	input: [],
}
