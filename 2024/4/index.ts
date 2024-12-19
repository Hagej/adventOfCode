import * as utils from "@utils"
import { ordinals } from "@utils/constants"
import fs from "fs"


export function both(inputFile: string) {
	let [p1, p2] = [0, 0]
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
			p1 += findXMAS(rows, x, y)
			p2 += findMAS(rows, x, y) ? 1 : 0
		}
	}

	return [p1, p2]


}
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

const xmas = "XMAS"
function findXMAS(words: string[], x: number, y: number) {
	if (words[y][x] !== "X") return 0
	let xmases = 0

	for (const [dx, dy] of ordinals) {
		let t = true
		for (let i = 0; i < 4 && t; i++) {
			if (words[y + dy * i]?.[x + dx * i] !== xmas[i]) {
				t = false
			}
		}
		if (t) xmases++
	}
	return xmases
}


const dirs = [[1, 1], [-1, 1], [1, -1], [-1, -1]]
function findMAS(words: string[], x: number, y: number) {
	if (words[y][x] !== "A") return 0
	let mases = 0

	for (const [dx, dy] of dirs) {
		if (words[y + dy]?.[x + dx] === "M" &&
			words[y + dy * -1]?.[x + dx * -1] === "S") {
			mases += 1
			if (mases === 2) return true
		}
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
	input: [2557, 1854],
}
