import * as utils from "@utils"
import { cardinals } from "@utils/constants"
import fs from "fs"

export function one(inputFile: string) {
	let result = Number.MAX_SAFE_INTEGER
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

		const [width, height] = inputFile.endsWith("debug") ? [6, 6] : [70, 70]

		const corrupted = inputFile.endsWith("debug") ? 12 : 1024

	const corruptedBytes = new Set<string>()
	for(let i = 0; i < corrupted; i++) {
		corruptedBytes.add(rows[i])
	}

	result = findPath([width, height], corruptedBytes) as number

	return result
}

function findPath([width, height]: [number, number], corruptedBytes: string[]) {
	let result = Number.MAX_SAFE_INTEGER
	const Q = new utils.PriorityQueue<[number, number]>()
	Q.enqueue([0, 0], 0)
	const V: Record<string, number> = {}
	while(!Q.isEmpty()) {
		const {priority, element: [x, y]} = Q.dequeue()
		if(x === width && y === height) {
			if(priority < result) {
				result = priority
			} else {
				break
			}
		}
		if(V[`${x},${y}`] <= priority) {
			continue
		}
		
		V[`${x},${y}`] = priority
		
		for(const [dx, dy] of cardinals) {
			const [nx, ny] = [x + dx, y + dy]
			if(corruptedBytes.includes(`${nx},${ny}`)) continue
			if(nx < 0 || nx > width || ny < 0 || ny > height) continue

			Q.enqueue([nx, ny], priority + 1)
		}
	}
	if(result === Number.MAX_SAFE_INTEGER) {
		return false
	}
	return result
	
}

export function two(inputFile: string) {
	let result = ""
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

		const [width, height] = inputFile.endsWith("debug") ? [6, 6] : [70, 70]

		let corrupted = inputFile.endsWith("debug") ? 12 : 1024

		let min = corrupted
		let max = rows.length

	const corruptedBytes = new Set<string>()
	for(let i = 0; i < corrupted; i++) {
		corruptedBytes.add(rows[i])
	}

	while(max - min > 1) {
		const mid = Math.floor((min + max) / 2)
		const path = findPath([width, height], rows.slice(0, mid))
		if(path) {
			min = mid
		} else {
			max = mid
		}
	}
	result = rows[min]

	return result
}

export const expectedResult = {
	debug: [22, "6,1"],
	input: [],
}
