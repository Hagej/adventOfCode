import * as utils from "@utils"
import fs from "fs"

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

	for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[0].length; x++) {
			result += findXMAS(rows, x, y)
		}
	}


	return result
}

const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]]
function findXMAS(words: string[], x: number, y: number) {
	let xmases = 0
	if (words[y][x] !== "X") return 0

	for (const [dx, dy] of dirs) {
		let w = ""
		for (let i = 0; i < 4; i++) {
			w = `${w}${(words[y + dy * i] || "")[x + dx * i] || ""}`
		}
		if (w === "XMAS") {
			xmases++
		}
	}
	return xmases
}


const dirs2 = [[1, 1], [-1, 1], [1, -1], [-1, -1]]
function findMAS(words: string[], x: number, y: number) {
	let mases = 0
	if (words[y][x] !== "A") return 0

	for (const [dx, dy] of dirs2) {
		if (((words[y + dy] || "")[x + dx] || "") === "M" &&
			((words[y + dy * -1] || "")[x + dx * -1] || "") === "S") mases += 1
	}

	return mases === 2



}
export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[0].length; x++) {
			result += findMAS(rows, x, y) ? 1 : 0
		}
	}


	return result
}

export const expectedResult = {
	debug: [18, 9],
	input: [],
}
