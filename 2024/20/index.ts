import * as utils from "@utils"
import { cardinals } from "@utils/constants"
import fs from "fs"

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

	let pos: [number, number] = [0, 0]
	let end: [number, number] = [0, 0]


		const dots = []

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (map[y][x] === ".") {
				dots.push([x, y])
			}
			if (map[y][x] === "S") {
				pos	= [x, y]
				dots.push([x, y])
			} else if (map[y][x] === "E") {
				end = [x, y]
				dots.push([x, y])
			}
		}
	}

	const tried = new Set<string>()
	for(const [x, y] of dots) {
		for(const [dx, dy] of cardinals) {
			if(map[y + dy]?.[x + dx] === "#" && map[y + dy * 2]?.[x + dx * 2] === ".") {
				if(tried.has(`${x},${y},${x + dx * 2},${y + dy * 2}`) || tried.has(`${x + dx * 2},${y + dy * 2},${x},${y}`)) continue
				tried.add(`${x},${y},${x + dx * 2},${y + dy * 2}`)
				const dist = findPath(map, [x, y], [x + dx * 2,y + dy * 2])
				if(dist - 2 >= 100) {
					result++
				}
			}
		}
	}

	return result
}

function findPath(map: string[][], pos: [number, number], end: [number, number]) {
	const Q = new utils.PriorityQueue<[number, number]>()
	Q.enqueue(pos, 0)
	const V = new Set<string>()
	while(!Q.isEmpty()) {
		const {priority, element: [x, y]} = Q.dequeue()
		const key = `${x},${y}`
		if(V.has(key)) continue
		V.add(key)
		if(x === end[0] && y === end[1]) {
			return priority
		}
		for(const [dx, dy] of cardinals) {
			const [nx, ny] = [x + dx, y + dy]
			if(nx < 0 || nx > map[0].length || ny < 0 || ny > map.length) continue
			if(map[ny][nx] === "#") continue
			Q.enqueue([nx, ny], priority + 1)
		}
	}
	
	return 0
}

export function two(inputFile: string) {
	throw new Error("Not implemented")
}

export const expectedResult = {
	debug: [0],
	input: [],
}
