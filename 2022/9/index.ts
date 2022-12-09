import * as utils from "@utils"
import { randomFillSync } from "crypto"
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

	let hx = 0
	let hy = 0
	let tx = 0
	let ty = 0

	const visited = new Set<string>()

	rows.map((r, index) => {
		const [dir, amount] = r.split(" ")
		for (let i = parseInt(amount); i > 0; i--) {
			if (dir === "U") hy += 1
			else if (dir === "D") hy -= 1
			else if (dir === "L") hx -= 1
			else if (dir === "R") hx += 1
			if (Math.abs(hy - ty) > 1 || Math.abs(hx - tx) > 1) {
				if (dir === "U") {
					if (hx != tx) {
						tx = hx
					}
					ty += 1
				}
				if (dir === "D") {
					if (hx != tx) {
						tx = hx
					}
					ty -= 1
				}
				if (dir === "L") {
					if (hy != ty) {
						ty = hy
					}
					tx -= 1
				}
				if (dir === "R") {
					if (hy != ty) {
						ty = hy
					}
					tx += 1
				}
			}
			visited.add(`(${tx},${ty})`)
		}
	})

	result = visited.size

	return result
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

	const knots: Array<[number, number]> = []

	for (let i = 10; i > 0; i--) {
		knots.push([0, 0])
	}

	const visited = new Set<string>()
	const headPath = new Set<string>()

	rows.map((r, index) => {
		const [dir, amount] = r.split(" ")
		for (let i = parseInt(amount); i > 0; i--) {
			if (dir === "U") knots[0][1] += 1
			else if (dir === "D") knots[0][1] -= 1
			else if (dir === "L") knots[0][0] -= 1
			else if (dir === "R") knots[0][0] += 1
			headPath.add(`(${knots[0][0]},${knots[0][1]})`)
			for (let j = 1; j < 10; j++) {
				const dy = knots[j - 1][1] - knots[j][1]
				const dx = knots[j - 1][0] - knots[j][0]
				if (Math.abs(dx) > 1 && Math.abs(dy) > 1) {
					knots[j][0] += Math.sign(dx)
					knots[j][1] += Math.sign(dy)
				} else if (Math.abs(dx) > 1) {
					knots[j][0] += Math.sign(dx)
					if (knots[j - 1][1] != knots[j][1]) {
						knots[j][1] = knots[j - 1][1]
					}
				} else if (Math.abs(dy) > 1) {
					knots[j][1] += Math.sign(dy)
					if (knots[j - 1][0] != knots[j][0]) {
						knots[j][0] = knots[j - 1][0]
					}
				}
				if (j === 9) {
					const t = `(${knots[j][0]},${knots[j][1]})`
					visited.add(t)
				}
			}
		}
	})

	result = visited.size

	return result
}

export const expectedResult = {
	debug: [13, 36],
	input: [],
}
