import * as utils from "../../utils"
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

	let dye = 1
	const pos = rows.map((r) => parseInt(r.split(": ")[1]))
	const score = [0, 0]

	while (true) {
		const sum = dye * 3 + 3
		let newPos = pos[(dye + 1) % 2] + sum
		while (newPos > 10) newPos -= 10
		pos[(dye + 1) % 2] = newPos
		score[(dye + 1) % 2] += pos[(dye + 1) % 2]

		if (score[(dye + 1) % 2] >= 1000) {
			result = score[dye % 2] * (dye + 2)
			console.log(pos, score, dye)
			break
		}
		dye += 3
	}
	return result
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

	const startingPos = rows.map((r) => parseInt(r.split(": ")[1]))

	const winAmount = findWinner(
		[
			[startingPos[0], 0],
			[startingPos[1], 0],
		],
		0,
	)

	return Math.max(...winAmount)
}

const diceRolls = utils.numArrayCombine([1, 2, 3], utils.numArrayCombine([1, 2, 3], [1, 2, 3])).sort((a, b) => a - b)
const m = diceRolls.reduce((prev, d) => ({ ...prev, [d]: (prev[d] ?? 0) + 1 }), {} as Record<number, number>)

const cache: Record<string, [number, number]> = {}

function findWinner(values: [[number, number], [number, number]], turn: number): [number, number] {
	let player = turn % 2 === 0 ? values[0] : values[1]
	let other = turn % 2 === 1 ? values[0] : values[1]
	let cacheId =
		turn % 2 === 0 ? `[${turn}[${player[0]},${player[1]}],[${other[0]},${other[1]}]]` : `[${turn}[${other[0]},${other[1]}],[${player[0]},${player[1]}]]`

	if (!!cache[cacheId]) return cache[cacheId]

	let wins: [number, number] = [0, 0]

	for (let i = 3; i <= 9; i++) {
		const p = ((player[0] + i - 1) % 10) + 1
		if (p + player[1] >= 21) {
			wins[turn % 2] += m[i]
		} else {
			const next: [[number, number], [number, number]] = turn % 2 === 0 ? [[p, p + player[1]], other] : [other, [p, p + player[1]]]
			for (let j = 0; j < m[i]; j++) {
				const r = findWinner(next, turn + 1)
				wins = [wins[0] + r[0], wins[1] + r[1]]
			}
		}
	}

	cache[cacheId] = [...wins]

	return wins
}

export const expectedResult = {
	debug: [739785, 444356092776315],
	input: [797160],
}
