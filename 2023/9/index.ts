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

	const histories = rows.map((r, index) => r.split(" ").map((n) => parseInt(n)))

	for (const h of histories) {
		const S = [[...h]]
		let next = []
		let cur = h
		do {
			next = []
			for (let i = 1; i < cur.length; i++) {
				next.push(cur[i] - cur[i - 1])
			}
			S.push([...next])
			cur = [...next]
		} while (!next.every((n) => n === 0))
		for (let i = S.length - 2; i >= 0; i--) {
			S[i].push(S[i + 1][S[i + 1].length - 1] + S[i][S[i].length - 1])
		}
		result = result + S[0][S[0].length - 1]
	}

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

	const histories = rows.map((r, index) => r.split(" ").map((n) => parseInt(n)))

	for (const h of histories) {
		const S = [[...h]]
		let next = []
		let cur = h
		do {
			next = []
			for (let i = 1; i < cur.length; i++) {
				next.push(cur[i] - cur[i - 1])
			}
			S.push([...next])
			cur = [...next]
		} while (!next.every((n) => n === 0))
		for (let i = S.length - 2; i >= 0; i--) {
			S[i].unshift(S[i][0] - S[i + 1][0])
		}
		result = result + S[0][0]
	}

	return result
}

export const expectedResult = {
	debug: [114, 2],
	input: [],
}
