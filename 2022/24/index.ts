import * as utils from "@utils"
import fs, { appendFile } from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")

	const W = new Set<string>()
	const B: Record<number, [string, [number, number]][]> = { 0: [] }

	const dirs = {
		">": [1, 0],
		"^": [0, -1],
		"<": [-1, 0],
		v: [0, 1],
	}
	file.trim()
		.split("\n")
		.map((s, y) => {
			const row = s.split("")
			for (const [x, ch] of row.entries()) {
				if (ch === "#") W.add(`${x},${y}`)
				else if (ch !== ".") B[0].push([ch, [x, y]])
			}
		})
	W.add(`1,0`)
	W.add(`1,-1`)

	const maxY = file.split("\n").length - 2
	const maxX = file.split("\n")[0].length - 2
	const end = [maxX, maxY + 1]
	const Q: [number, [number, number]][] = []
	const V = new Set<string>()
	Q.push([1, [1, 0]])
	while (Q.length > 0) {
		const [t, pos] = Q.shift()
		let blizz: [string, [number, number]][] = B[t]
		if (!blizz) {
			blizz = [...B[t - 1]]
			for (const b of blizz) {
				const [bx, by] = b[1]
				const [dx, dy] = dirs[b[0]]
				let [x, y] = [bx + dx, by + dy]
				if (W.has(`${x},${y}`)) {
					if (b[0] === "^") {
						y = maxY
					}
					if (b[0] === "v") {
						y = 1
					}
					if (b[0] === ">") {
						x = 1
					}
					if (b[0] === "<") {
						x = maxX
					}
				}
				b[1] = [x, y]
			}
			B[t] = [...blizz]
		}

		const S = new Set<string>(blizz.map((b) => `${b[1][0]},${b[1][1]}`))
		for (const [dx, dy] of [...Object.values(dirs), [0, 0]]) {
			const [x, y] = pos
			const key = `${x + dx},${y + dy}`
			if (!S.has(key) && !W.has(key) && !V.has(`${t + 1}|${key}`)) {
				if (x + dx === end[0] && y + dy === end[1]) {
					return t
				}
				Q.push([t + 1, [x + dx, y + dy]])
				V.add(`${t + 1}|${key}`)
			}
		}
	}

	return result
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")

	const W = new Set<string>()
	const B: Record<number, [string, [number, number]][]> = { 0: [] }

	const dirs = {
		">": [1, 0],
		"^": [0, -1],
		"<": [-1, 0],
		v: [0, 1],
	}
	file.trim()
		.split("\n")
		.map((s, y) => {
			const row = s.split("")
			for (const [x, ch] of row.entries()) {
				if (ch === "#") W.add(`${x},${y}`)
				else if (ch !== ".") B[0].push([ch, [x, y]])
			}
		})
	W.add(`1,-1`)

	const maxY = file.split("\n").length - 2
	const maxX = file.split("\n")[0].length - 2

	W.add(`${maxX},${maxY + 2}`)
	const end = [maxX, maxY + 1]
	let Q: [number, [number, number]][] = []
	const V = new Set<string>()
	const targets = [[...end], [1, 0], [...end]]
	let target = targets.shift()
	Q.push([1, [1, 0]])
	loop: while (Q.length > 0) {
		const [t, pos] = Q.shift()
		let blizz: [string, [number, number]][] = B[t]
		if (!blizz) {
			blizz = [...B[t - 1]]
			for (const b of blizz) {
				const [bx, by] = b[1]
				const [dx, dy] = dirs[b[0]]
				let [x, y] = [bx + dx, by + dy]
				if (W.has(`${x},${y}`)) {
					if (b[0] === "^") {
						y = maxY
					}
					if (b[0] === "v") {
						y = 1
					}
					if (b[0] === ">") {
						x = 1
					}
					if (b[0] === "<") {
						x = maxX
					}
				}
				b[1] = [x, y]
			}
			B[t] = [...blizz]
		}

		const S = new Set<string>(blizz.map((b) => `${b[1][0]},${b[1][1]}`))
		for (const [dx, dy] of [...Object.values(dirs), [0, 0]]) {
			const [x, y] = pos
			const key = `${x + dx},${y + dy}`
			if (!S.has(key) && !W.has(key) && !V.has(`${t + 1}|${key}`)) {
				if (x + dx === target[0] && y + dy === target[1]) {
					if (targets.length > 0) {
						target = targets.shift()
						Q = [[t + 1, [x + dx, y + dy]]]
						continue loop
					}
					return t
				}
				Q.push([t + 1, [x + dx, y + dy]])
				V.add(`${t + 1}|${key}`)
			}
		}
	}

	return result
}

export const expectedResult = {
	debug: [18, 54],
	input: [],
}
