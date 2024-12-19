import * as utils from "@utils"
import fs from "fs"


export function both(inputFile: string) {
	let [p1, p2] = [0, 0]
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split(" ").map((r) => parseInt(r))
			return row
		})

	rows.map((r, index) => {
		if (isSafe(r)) {
			p1 += 1
			p2 += 1
		}
		else {
			for (let i = 0; i < r.length - 1; i++) {
				r.splice(i, 1)
				if (isSafe(r)) {
					p2 += 1
					return
				}
			}
		}
	})

	return [p1, p2]
}
export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split(" ").map((r) => parseInt(r))
			return row
		})

	rows.map((r, index) => {
		if (isSafe(r)) {
			result += 1
		}
	})

	return result
}

function isSafe(levels: number[]) {
	let increasing
	for (let i = 0; i < levels.length - 1; i++) {
		const a = levels[i]
		const b = levels[i + 1]
		const diff = a - b
		if (Math.abs(diff) === 0 || Math.abs(diff) > 3) {
			return false
		}
		if (increasing === undefined) {
			increasing = diff > 0
		} else if (increasing !== (diff > 0)) {
			return false
		}
	}
	return true
}
export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split(" ").map((r) => parseInt(r))
			return row
		})

	rows.map((r, index) => {
		if (isSafe(r)) { result += 1 }
		else {
			for (let i = 0; i < r.length - 1; i++) {
				const t = r.splice(i, 1)
				if (isSafe(r)) {
					result += 1
					return
				}
			}
		}
	})

	return result
}

export const expectedResult = {
	debug: [],
	input: [483, 528],
}
