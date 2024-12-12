import * as utils from "@utils"
import fs from "fs"

export function both(inputFile: string) {
	let [p1, p2] = [0, 0]
	const file = fs.readFileSync(inputFile, "utf-8")
	const row = file
		.trim()
		.split(" ")
		.map((r) => parseInt(r))

	let stones: Record<number, number> = {}

	for (const r of row) {
		if (stones[r]) {
			stones[r]++
		} else {
			stones[r] = 1
		}
	}

	for (let i = 0; i < 75; i++) {
		if (i === 25) p1 = Object.values(stones).reduce((s, v) => s + v, 0)
		const newStones: Record<number, number> = {}


		for (const [key, amount] of Object.entries(stones)) {
			const num = parseInt(key)
			if (num === 0) {
				newStones[1] = amount
			} else if (key.length % 2 === 0) {
				const [s1, s2] = [parseInt(key.slice(0, key.length / 2)), parseInt(key.slice(key.length / 2))]
				newStones[s1] = newStones[s1] ? newStones[s1] += amount : amount
				newStones[s2] = newStones[s2] ? newStones[s2] + amount : amount
			} else {
				newStones[num * 2024] = amount
			}

		}
		stones = newStones
	}

	p2 = Object.values(stones).reduce((s, v) => s + v, 0)

	return [p1, p2]
}

export function two(inputFile: string) {
	throw new Error("Not implemented")
}

export const expectedResult = {
	debug: [55312],
	input: [],
}
