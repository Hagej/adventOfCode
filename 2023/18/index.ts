import * as utils from "@utils"
import fs from "fs"
import { nextTick } from "process"

const dirs = {
	R: [0, 1],
	D: [1, 0],
	L: [0, -1],
	U: [-1, 0],
}

export async function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	const dug = new Set()
	let x = 0
	let y = 0

	rows.map((r, index) => {
		const [dir, len, col] = r.split(" ")
		const length = parseInt(len)

		for (let i = 0; i < length; i++) {
			const xx = x + dirs[dir][1]
			const yy = y + dirs[dir][0]
			const key = `${yy}|${xx}`
			dug.add(key)

			x = xx
			y = yy
		}
	})

	const S = [[1, 1]]

	while (S.length) {
		const [y, x] = S.pop()
		let key = `${y}|${x}`
		dug.add(key)
		for (const dir of Object.values(dirs)) {
			const xx = x + dir[1]
			const yy = y + dir[0]
			key = `${yy}|${xx}`
			if (!dug.has(key)) {
				dug.add(key)
				S.push([yy, xx])
			}
		}
	}

	return dug.size
}

export function two(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	const dug: [[number, number], [number, number]][] = []
	let x = 0
	let y = 0

	let result = 0
	rows.map((r, index) => {
		let [d, l, col] = r.split(" ")

		col = col.replace(/\(|\)/g, "")
		console.log(col)

		const dir = Object.keys(dirs)[parseInt(col[col.length - 1])]
		const hex = col.slice(1, col.length - 1)
		let length = parseInt(hex, 16)

		console.log(hex, dir, length)

		const x0 = x
		const y0 = y
		const x1 = x + dirs[dir][1] * length
		const y1 = x + dirs[dir][0] * length

		dug.push([
			[y0, x0],
			[y1, x1],
		])

		result += length
	})

	const S = [[1, 1]]

	while (S.length) {
		const [y, x] = S.pop()
		loop: for (const dir of Object.values(dirs)) {
			const xx = x + dir[1]
			const yy = y + dir[0]
			for(const wall of dug) {
				const [[y0, x0], [y1, x1]] = wall

				if( yy >= Math.min(y0, y1) && yy <= Math.max(y0, y1) && xx >= Math.min(x0, x1) && xx <= Math.max(x0, x1)) {
					continue loop
				} else {
					result += 1
					S.push([yy, xx])
				}
			}
		}
	}

	return result
}

export const expectedResult = {
	debug: [62],
	input: [],
}
