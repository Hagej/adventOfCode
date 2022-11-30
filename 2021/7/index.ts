import fs from "fs"
import * as utils from "../../utils"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split(",")
		.map((r) => {
			const row = parseInt(r)
			return row
		})

	const values = rows.sort((a, b) => a - b)

	const median = values[Math.floor(values.length / 2)]

	values.map((r, index) => {
		result += Math.abs(r - median)
	})

	return result
}
export function two(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8")

	const rows = file
		.trim()
		.split(",")
		.map((r) => {
			const row = parseInt(r)
			return row
		})

	const values = rows.sort((a, b) => a - b)
	const sum = utils.sum(values)

	const avg = Math.round(sum / values.length)

	const fuelConsumptions: Array<{ ha: number; consumption: number }> = []
	for (let i = avg - 10; i <= avg + 10; i++) {
		fuelConsumptions.push({ ha: i, consumption: 0 })
	}

	for (let c of fuelConsumptions) {
		let fuel = 0
		values.map((r, index) => {
			const l = Math.abs(r - c.ha)
			for (let i = 1; i <= l; i++) fuel += i
		})
		c.consumption = fuel
	}

	let min = Infinity
	for (let c of fuelConsumptions) {
		min = Math.min(c.consumption, min)
	}

	return min
}

export const expectedResult = {
	debug: [37, 168],
	input: [349812, 99763899],
}
