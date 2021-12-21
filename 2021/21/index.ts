import * as utils from "../../utils/index.ts"

export function one(inputFile: string) {
	let result = 0
	const file = Deno.readTextFileSync(inputFile)
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

let before: number
export function two(inputFile: string) {
	const file = Deno.readTextFileSync(inputFile)
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	const startingPos = rows.map((r) => parseInt(r.split(": ")[1]))

	console.log(diceRolls, diceRolls.length, m)

	before = performance.now()

	findWinner([startingPos[0], 0], [startingPos[1], 0], 0)

	return Math.max(...winAmount)
}

const winAmount = [0, 0]
let iters = 0

const diceRolls = utils.numArrayCombine([1, 2, 3], utils.numArrayCombinations([1, 2, 3])).sort((a, b) => a - b)
const m = diceRolls.reduce((prev, d) => ({ ...prev, [d]: (prev[d] ?? 0) + 1 }), {} as Record<number, number>)

function findWinner(p1: [number, number], p2: [number, number], turn: number) {
	iters++
	if (iters == 1000000) console.log(performance.now() - before)
	if (turn == 0) {
		if (p1[1] == 20) {
			winAmount[turn] += 27
			return
		}
		for (let i = 3; i <= 9; i++) {
			const p = ((p1[1] + i - 1) % 10) + 1
			const mi = m[i]
			if (p + p1[1] >= 21) {
				winAmount[turn] += mi
			} else {
				for (let j = 0; j < mi; j++) {
					findWinner([p, p + p1[1]], p2, 1)
				}
			}
		}
	} else {
		if (p2[1] == 20) {
			winAmount[turn] += 27
			return
		}
		for (let i = 3; i <= 9; i++) {
			const p = ((p2[1] + i - 1) % 10) + 1
			const mi = m[i]
			if (p + p2[1] >= 21) {
				winAmount[turn] += mi
			} else {
				for (let j = 0; j < mi; j++) {
					findWinner(p1, [p, p + p2[1]], 0)
				}
			}
		}
	}
}

export function two1(inputFile: string) {
	const file = Deno.readTextFileSync(inputFile)
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	const startingPos = rows.map((r) => parseInt(r.split(": ")[1]))
	let positions = [[startingPos[0], startingPos[1]]]
	let scores = [[0, 0]]
	let values: Array<[[number, number], [number, number]]> = [
		[
			[startingPos[0], 0],
			[startingPos[1], 0],
		],
	]

	const wins = [0, 0]
	let round = 0
	while (positions.length > 0) {
		const player = round % 2

		// const newPositions = []
		// const newScores = []
		const newValues: Array<[[number, number], [number, number]]> = []
		while (values.length > 0) {
			const value = values.pop() as [[number, number], [number, number]]
			let posOutcomes = [value[player][0]]
			for (let j = 0; j < 3; j++) {
				posOutcomes = posOutcomes.reduce((prev, o) => [...prev, o + 1, o + 2, o + 3], [] as number[])
			}
			for (let j = 0; j < posOutcomes.length; j++) {
				if (posOutcomes[j] > 10) posOutcomes[j] -= 10
			}
			const scoreOutcomes = posOutcomes.map((p) => p + value[player][1])
			for (let j = 0; j < posOutcomes.length; j++) {
				if (scoreOutcomes[j] >= 21) {
					console.log(value)
					wins[player]++
				} else {
					newValues.push(player == 0 ? [[posOutcomes[j], scoreOutcomes[j]], value[1]] : [value[0], [posOutcomes[j], scoreOutcomes[j]]])
					// newScores.push(player == 0 ? [scoreOutcomes[j], score[1]] : [score[0], scoreOutcomes[j]])
					// newPositions.push(player == 0 ? [posOutcomes[j], pos[1]] : [pos[0], posOutcomes[j]])
				}
			}
		}

		console.log(newValues.length)
		values = newValues
		// positions = newPositions
		// scores = newScores
		round++
	}
	console.log(round)
	return Math.max(...wins)
}

export const expectedResult = {
	debug: [739785, 444356092776315],
	input: [797160],
}
