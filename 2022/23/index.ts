import * as utils from "@utils"
import fs from "fs"

const rounds = 10

const surrounding = [
	[-1, -1],
	[0, -1],
	[1, -1],
	[1, 0],
	[1, 1],
	[0, 1],
	[-1, 1],
	[-1, 0],
]

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const map = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split("")
			return row
		})
	const elves: [[number, number], [number, number] | undefined][] = []
	let positions = new Set<string>()
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map.length; x++) {
			if (map[y][x] === "#") {
				elves.push([[x, y], undefined])
			}
		}
	}
	const dirOrder = ["N", "S", "W", "E"]

	const checkPos = (x: number, y: number) => {
		const k = `${x},${y}`
		return positions.has(k)
	}
	let suggestions: string[]

	const sugNr = (x: number, y: number) => {
		const k = `${x},${y}`
		return suggestions.filter((s) => s === k).length
	}

	for (let r = 0; r < rounds; r++) {
		positions = new Set(elves.map((e) => `${e[0][0]},${e[0][1]}`))

		suggestions = []
		for (const e of elves) {
			const [x, y] = e[0]
			let hasNB = false
			for (const d of surrounding) {
				const [dx, dy] = d
				if (checkPos(x + dx, y + dy)) {
					hasNB = true
					break
				}
			}
			if (hasNB) {
				for (const d of dirOrder) {
					if (d === "N" && !checkPos(x, y - 1) && !checkPos(x - 1, y - 1) && !checkPos(x + 1, y - 1)) {
						e[1] = [x, y - 1]
						suggestions.push(`${x},${y - 1}`)
						break
					}
					if (d === "S" && !checkPos(x, y + 1) && !checkPos(x - 1, y + 1) && !checkPos(x + 1, y + 1)) {
						e[1] = [x, y + 1]
						suggestions.push(`${x},${y + 1}`)
						break
					}
					if (d === "W" && !checkPos(x - 1, y) && !checkPos(x - 1, y - 1) && !checkPos(x - 1, y + 1)) {
						e[1] = [x - 1, y]
						suggestions.push(`${x - 1},${y}`)
						break
					}
					if (d === "E" && !checkPos(x + 1, y) && !checkPos(x + 1, y - 1) && !checkPos(x + 1, y + 1)) {
						e[1] = [x + 1, y]
						suggestions.push(`${x + 1},${y}`)
						break
					}
				}
			}
		}

		for (const e of elves) {
			if (!e[1]) continue
			const [sx, sy] = e[1]
			if (sugNr(sx, sy) > 1) {
				e[1] = undefined
				continue
			}
			e[0] = [sx, sy]
			e[1] = undefined
		}

		const temp = dirOrder.shift()
		dirOrder.push(temp)
	}

	let [ymin, ymax, xmin, xmax] = [Infinity, 0, Infinity, 0]

	for (const e of elves) {
		const [x, y] = e[0]
		ymin = Math.min(y, ymin)
		xmin = Math.min(x, xmin)
		ymax = Math.max(y, ymax)
		xmax = Math.max(x, xmax)
	}

	result = (ymax - ymin + 1) * (xmax - xmin + 1) - elves.length

	return result
}

export function two(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8")
	const map = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split("")
			return row
		})
	const elves: [[number, number], [number, number] | undefined][] = []
	let positions = new Set<string>()
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map.length; x++) {
			if (map[y][x] === "#") {
				elves.push([[x, y], undefined])
			}
		}
	}
	const dirOrder = ["N", "S", "W", "E"]

	const checkPos = (x: number, y: number) => {
		const k = `${x},${y}`
		return positions.has(k)
	}
	let suggestions: string[]

	const sugNr = (x: number, y: number) => {
		const k = `${x},${y}`
		return suggestions.filter((s) => s === k).length
	}

	let r = 0
	while (true) {
		r++
		positions = new Set(elves.map((e) => `${e[0][0]},${e[0][1]}`))

		suggestions = []
		for (const e of elves) {
			const [x, y] = e[0]
			let hasNB = false
			for (const d of surrounding) {
				const [dx, dy] = d
				if (checkPos(x + dx, y + dy)) {
					hasNB = true
					break
				}
			}

			if (hasNB) {
				for (const d of dirOrder) {
					if (d === "N" && !checkPos(x, y - 1) && !checkPos(x - 1, y - 1) && !checkPos(x + 1, y - 1)) {
						e[1] = [x, y - 1]
						suggestions.push(`${x},${y - 1}`)
						break
					}
					if (d === "S" && !checkPos(x, y + 1) && !checkPos(x - 1, y + 1) && !checkPos(x + 1, y + 1)) {
						e[1] = [x, y + 1]
						suggestions.push(`${x},${y + 1}`)
						break
					}
					if (d === "W" && !checkPos(x - 1, y) && !checkPos(x - 1, y - 1) && !checkPos(x - 1, y + 1)) {
						e[1] = [x - 1, y]
						suggestions.push(`${x - 1},${y}`)
						break
					}
					if (d === "E" && !checkPos(x + 1, y) && !checkPos(x + 1, y - 1) && !checkPos(x + 1, y + 1)) {
						e[1] = [x + 1, y]
						suggestions.push(`${x + 1},${y}`)
						break
					}
				}
			}
		}

		if (!elves.some((e) => e[1] !== undefined)) return r

		for (const e of elves) {
			if (!e[1]) continue
			const [sx, sy] = e[1]
			if (sugNr(sx, sy) > 1) {
				e[1] = undefined
				continue
			}
			e[0] = [sx, sy]
			e[1] = undefined
		}

		const temp = dirOrder.shift()
		dirOrder.push(temp)
	}
}

export const expectedResult = {
	debug: [110, 20],
	input: [],
}
