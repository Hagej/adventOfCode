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

	before = performance.now()
	findWinner(
		[
			[startingPos[0], 0],
			[startingPos[1], 0],
		],
		0,
	)

	return Math.max(...winAmount)
}

const winAmount = [0, 0]
const earlyReturns = [0, 0]
let iters = 0
const maxes: number[] = Array(5).fill(0)

const diceRolls = utils.numArrayCombine([1, 2, 3], utils.numArrayCombine([1, 2, 3], [1, 2, 3])).sort((a, b) => a - b)
const diceRolls2 = utils.numArrayCombine(diceRolls, diceRolls).sort((a, b) => a - b)
const m = diceRolls.reduce((prev, d) => ({ ...prev, [d]: (prev[d] ?? 0) + 1 }), {} as Record<number, number>)
const distribution = Object.values(m)
distribution.unshift(0)
distribution.unshift(0)

let iterPerf = 1000000

function findWinner(values: [[number, number], [number, number]], playerIndex: number) {
	iters++
	if (iters == iterPerf) {
		iterPerf *= 10
		console.log(`${iters} iterations took ${performance.now() - before} ms`)
		console.log(winAmount, earlyReturns, maxes)
	}
	const player = values[playerIndex]
	const other = values[(playerIndex + 1) % 2]
	if (playerIndex === 0) {
		const maxt = maxTurns(player[0], player[1])
		const mint = minTurns(other[0], other[1])
		if (mint >= maxt) {
			earlyReturns[0]++
			maxes[maxt]++
			winAmount[playerIndex] += 27 ** maxt
			return
		}
	} else {
		const maxt = maxTurns(other[0], other[1])
		const mint = minTurns(player[0], player[1])
		if (mint > maxt) {
			earlyReturns[1]++
			maxes[maxt]++
			winAmount[(playerIndex + 1) % 2] += 27 ** maxt
			return
		}
	}
	//
	// let min = player[0] + 9 > 10 ? 1 : player[0] + 3
	// let max = Math.min(player[0] + 9, 10)
	// let omin = other[0] + 9 > 10 ? 1 : other[0] + 3
	// let omax = Math.min(other[0] + 9, 10)
	// // console.log(getMin(player[0], 2), getMax(player[0], 2), getMin(other[0], 2))
	// if (player[1] + min >= 21) {
	// 	winAmount[playerIndex] += 27
	// 	earlyReturns[0]++
	// 	return
	// } else if (player[1] + max < 21 && other[1] + omin >= 21) {
	// 	earlyReturns[1]++
	// 	winAmount[(playerIndex + 1) % 2] += 27 ** 2
	// } else if (other[1] + omax < 21 && player[1] + getMin(player[0], 2) >= 21) {
	// 	earlyReturns[2]++
	// 	winAmount[playerIndex] += 27 ** 3
	// 	return
	// } else if (player[1] + getMax(player[0], 2) < 21 && other[1] + getMin(other[0], 2) >= 21) {
	// 	earlyReturns[3]++
	// 	winAmount[(playerIndex + 1) % 2] += 27 ** 4
	// 	return
	// }

	for (let i = 3; i <= 9; i++) {
		const p = ((player[0] + i - 1) % 10) + 1
		if (p + player[1] >= 21) {
			winAmount[playerIndex] += m[i]
		} else {
			const newValues: [[number, number], [number, number]] = playerIndex == 0 ? [[p, p + player[1]], values[1]] : [values[0], [p, p + player[1]]]
			for (let j = 0; j < m[i]; j++) {
				findWinner(newValues, (playerIndex + 1) % 2)
			}
		}
	}
}

function maxTurns(pos: number, s: number) {
	let turns = 0
	let score = s

	const flip = pos === 1 ? 0 : 1
	while (score < 21) {
		turns++
		score += 4 ** ((flip + turns) % 2)
	}
	return turns
}

function minTurns(p: number, s: number) {
	if (s > 13 || (s == 11 && p <= 7) || (s == 12 && (p <= 7 || p >= 9)) || (s == 13 && p != 8)) return 1
	if (s > 1) return 2
	return 3
}

function getMax(pos: number, turns: number) {
	let max = 0
	for (let i = 1; i <= turns; i++) {
		if (pos <= 7) {
			max += 10
			pos = 10
		} else {
			pos--
			max += pos
		}
	}
	return max
}
function getMin(pos: number, turns: number) {
	const flip = pos === 1 ? 0 : 1
	let min = 0
	for (let i = 1; i <= turns; i++) {
		min += 4 ** ((flip + i) % 2)
	}
	return min
}

export const expectedResult = {
	debug: [739785, 444356092776315],
	input: [797160],
}
