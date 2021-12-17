import { sum } from "../../utils/index.ts"

export function one(inputFile: string) {
	const file = Deno.readTextFileSync(inputFile)
	const rows = file
		.trim()
		.split(",")
		.map((r) => {
			const row = parseInt(r)
			return row
		})

	let fish = new Array<number>(9)
	fish.fill(0)

	rows.forEach((r) => (fish[r] += 1))

	return findSum(fish, 80)
}

export function two(inputFile: string) {
	const file = Deno.readTextFileSync(inputFile)
	const rows = file
		.trim()
		.split(",")
		.map((r) => {
			const row = parseInt(r)
			return row
		})

	let fish = new Array<number>(9)
	fish.fill(0)

	rows.forEach((r) => (fish[r] += 1))

	return findSum(fish, 256)
}

function findSum(fish: number[], days: number) {
	for (let i = 0; i < days; i++) {
		const zeros = fish.shift()
		fish[6] += zeros || 0
		fish.push(zeros || 0)
	}
	return sum(fish)
}

export const expectedResult = {
	debug: [5934, 26984457539],
	input: [362666, 1640526601595],
}
