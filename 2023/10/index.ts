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

	let xPos = 0
	let yPos = 0

	const w = rows[0].length
	for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < w; x++) {
			if (rows[y][x] === "S") {
				xPos = x
				yPos = y
				break
			}
		}
	}
	let i = 0

	let prevY = 0
	let prevX = 0
	do {
		const ty = yPos
		const tx = xPos
		;[yPos, xPos] = findNext(rows, yPos, xPos, prevY, prevX)
		prevY = ty
		prevX = tx
		i += 1
	} while (rows[yPos][xPos] !== "S")

	result = Math.floor(i / 2)
	return result
}

function findNext(map: string[], yPos: number, xPos: number, prevY?: number, prevX?: number) {
	if (
		!(prevY === yPos - 1 && prevX === xPos) &&
		["S", "J", "L", "|", "I"].includes(map[yPos][xPos]) &&
		["S", "F", "|", "I", "7"].includes(map[yPos - 1]?.[xPos])
	) {
		return [yPos - 1, xPos]
	}
	if (
		!(prevY === yPos + 1 && prevX === xPos) &&
		["S", "7", "F", "|", "I"].includes(map[yPos][xPos]) &&
		["S", "J", "|", "I", "L"].includes(map[yPos + 1]?.[xPos])
	) {
		return [yPos + 1, xPos]
	}
	if (
		!(prevY === yPos && prevX === xPos + 1) &&
		["S", "-", "_", "L", "F"].includes(map[yPos][xPos]) &&
		["S", "-", "_", "J", "7"].includes(map[yPos][xPos + 1])
	) {
		return [yPos, xPos + 1]
	}
	if (
		!(prevY === yPos && prevX === xPos - 1) &&
		["S", "-", "_", "J", "7"].includes(map[yPos][xPos]) &&
		["S", "F", "-", "_", "L"].includes(map[yPos][xPos - 1])
	) {
		return [yPos, xPos - 1]
	}
}

const visited = new Set()

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

	let xPos = 0
	let yPos = 0

	const map: string[] = []

	const w = rows[0].length

	for (let y = 0; y < rows.length; y++) {
		map.push("", "")
		for (let x = 0; x < w; x++) {
			const cur = rows[y][x]
			map[y * 2] = map[y * 2].concat(cur)
			if (["-", "F", "L"].includes(cur)) {
				map[y * 2] = map[y * 2].concat("_")
			} else {
				map[y * 2] = map[y * 2].concat(" ")
			}

			if (["|", "F", "7"].includes(cur)) {
				map[y * 2 + 1] = map[y * 2 + 1].concat("I")
			} else {
				map[y * 2 + 1] = map[y * 2 + 1].concat(" ")
			}
			map[y * 2 + 1] = map[y * 2 + 1].concat(" ")
		}
	}

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[0].length; x++) {
			if (map[y][x] === "S") {
				xPos = x
				yPos = y
				break
			}
		}
	}
	if (["J", "|", "L"].includes(map[yPos + 2]?.[xPos])) {
		map[yPos + 1] = map[yPos + 1]
			.substring(0, xPos)
			.concat("|")
			.concat(map[yPos + 1].substring(xPos + 1))
	}
	if (["-", "J", "7"].includes(map[yPos]?.[xPos + 2])) {
		map[yPos] = map[yPos]
			.substring(0, xPos + 1)
			.concat("-")
			.concat(map[yPos].substring(xPos + 3))
	}

	let i = 0

	const loopTiles = new Set<string>()

	let prevY = 0
	let prevX = 0
	do {
		const ty = yPos
		const tx = xPos

		;[yPos, xPos] = findNext(map, yPos, xPos, prevY, prevX)
		prevY = ty
		prevX = tx
		loopTiles.add(`${yPos}-${xPos}`)
		i += 1
	} while (map[yPos][xPos] !== "S")

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[0].length; x++) {
			const pos = `${y}-${x}`
			if (!visited.has(pos) && !loopTiles.has(pos)) {
				const f = floodFill(map, loopTiles, x, y)

				if (f[0]) result += f[1]
			}
		}
	}
	return result
}

function floodFill(map: string[], loop: Set<string>, x: number, y: number): [boolean, number] {
	const pos = `${y}-${x}`
	visited.add(pos)
	let inside = true
	let sum = [" ", "_", "I"].includes(map[y][x]) ? 0 : 1
	for (const dy of [-1, 0, 1]) {
		for (const dx of [-1, 0, 1]) {
			if (dy === 0 && dx === 0) continue
			const yy = y + dy
			const xx = x + dx
			const dpos = `${yy}-${xx}`
			if (visited.has(dpos) || loop.has(dpos)) continue
			if (xx < 0 || yy < 0 || xx >= map[0].length || yy >= map.length) {
				inside = false
				continue
			}
			const rec = floodFill(map, loop, xx, yy)
			inside = inside && rec[0]
			sum = sum + rec[1]
		}
	}
	return [inside, sum]
}

export const expectedResult = {
	debug: [80, 10],
	input: [],
}
