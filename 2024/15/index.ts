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

	utils.logImage(map)

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

export const expectedResult = {
	debug: [10092, 123],
	input: [],
}
