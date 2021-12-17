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

	const values = rows.map((r) => r.split("").map((r) => parseInt(r)))

	const height = values.length
	const width = values[0].length

	const lows = []

	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			let isLowest = true
			if (typeof values[i + 1] === "object" && values[i][j] >= values[i + 1][j]) isLowest = false
			if (typeof values[i - 1] === "object" && values[i][j] >= values[i - 1][j]) isLowest = false
			if (typeof values[i][j + 1] === "number" && values[i][j] >= values[i][j + 1]) {
				isLowest = false
			}
			if (typeof values[i][j - 1] === "number" && values[i][j] >= values[i][j - 1]) {
				isLowest = false
			}
			if (isLowest) {
				lows.push(values[i][j])
			}
		}
	}
	result = utils.sum(lows)

	return result + lows.length
}

const visited: [number, number][] = []

export function two(inputFile: string) {
	let result = 0
	const file = Deno.readTextFileSync(inputFile)
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	const values = rows.map((r) => r.split("").map((r) => parseInt(r)))

	const height = values.length
	const width = values[0].length

	const lows: [[number, number], number][] = []

	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			let isLowest = true
			if (typeof values[i + 1] === "object" && values[i][j] >= values[i + 1][j]) isLowest = false
			if (typeof values[i - 1] === "object" && values[i][j] >= values[i - 1][j]) isLowest = false
			if (typeof values[i][j + 1] === "number" && values[i][j] >= values[i][j + 1]) {
				isLowest = false
			}
			if (typeof values[i][j - 1] === "number" && values[i][j] >= values[i][j - 1]) {
				isLowest = false
			}
			if (isLowest) {
				lows.push([[i, j], values[i][j]])
			}
		}
	}

	const basins: number[] = []
	lows.sort((a, b) => b[1] - a[1]).forEach((l) => {
		visited.push([l[0][0], l[0][1]])
		basins.push(findBasin(values, l[0][0], l[0][1]))
	})

	const [one, two, three] = basins.sort((a, b) => b - a)

	result = one * two * three

	return result
}

function findBasin(values: number[][], i: number, j: number): number {
	let sum = 0

	if (typeof values[i + 1] === "object" && !visited.some((v) => v[0] === i + 1 && v[1] === j) && values[i + 1][j] > values[i][j] && values[i + 1][j] !== 9) {
		visited.push([i + 1, j])
		sum += findBasin(values, i + 1, j)
	}
	if (typeof values[i - 1] === "object" && !visited.some((v) => v[0] === i - 1 && v[1] === j) && values[i - 1][j] > values[i][j] && values[i - 1][j] !== 9) {
		visited.push([i - 1, j])
		sum += findBasin(values, i - 1, j)
	}
	if (
		typeof values[i][j + 1] === "number" &&
		!visited.some((v) => v[0] === i && v[1] === j + 1) &&
		values[i][j + 1] > values[i][j] &&
		values[i][j + 1] !== 9
	) {
		visited.push([i, j + 1])
		sum += findBasin(values, i, j + 1)
	}
	if (
		typeof values[i][j - 1] === "number" &&
		!visited.some((v) => v[0] === i && v[1] === j - 1) &&
		values[i][j - 1] > values[i][j] &&
		values[i][j - 1] !== 9
	) {
		visited.push([i, j - 1])
		sum += findBasin(values, i, j - 1)
	}
	return sum + 1
}

export const expectedResult = {
	debug: [15, 1134],
	input: [577, 1069200],
}
