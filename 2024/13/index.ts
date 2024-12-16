import * as utils from "@utils"
import fs from "fs"


export function both(inputFile: string) {
	let [p1, p2] = [0, 0]
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split(`\n\n`)
		.map((r) => {
			const row = r.split("\n")
			return row
		})

	const machines = rows.map((r, index) => {
		const ba = r[0].split(" ")
		const buttonA = [parseInt(ba[2].split("+")[1]), parseInt(ba[3].split("+")[1])] as [number, number]
		const bb = r[1].split(" ")
		const buttonB = [parseInt(bb[2].split("+")[1]), parseInt(bb[3].split("+")[1])] as [number, number]
		const p = r[2].split(" ")
		const prize = [parseInt(p[1].split("=")[1]), parseInt(p[2].split("=")[1])] as [number, number]

		return { buttonA, buttonB, prize }
	})

	for (const { buttonA, buttonB, prize } of machines) {

		const A = buttonA[0]
		const B = buttonB[0]
		const C = buttonA[1]
		const D = buttonB[1]

		const X1 = prize[0]
		const Y1 = prize[1]

		const b1 = ((A * Y1) - (C * X1)) / ((A * D) - (C * B))
		const a1 = ((B * Y1) - (D * X1)) / ((B * C) - (D * A))

		if (Number.isInteger(a1) && Number.isInteger(b1)) {
			p1 += a1 * 3 + b1
		}

		const X2 = prize[0] + 10000000000000
		const Y2 = prize[1] + 10000000000000

		const b2 = ((A * Y2) - (C * X2)) / ((A * D) - (C * B))
		const a2 = ((B * Y2) - (D * X2)) / ((B * C) - (D * A))

		if (Number.isInteger(a2) && Number.isInteger(b2)) {
			p2 += a2 * 3 + b2
		}
	}

	return [p1, p2]
}
export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split(`\n\n`)
		.map((r) => {
			const row = r.split("\n")
			return row
		})

	const machines = rows.map((r, index) => {
		const ba = r[0].split(" ")
		const buttonA = [parseInt(ba[2].split("+")[1]), parseInt(ba[3].split("+")[1])]
		const bb = r[1].split(" ")
		const buttonB = [parseInt(bb[2].split("+")[1]), parseInt(bb[3].split("+")[1])]
		const p = r[2].split(" ")
		const prize = [parseInt(p[1].split("=")[1]), parseInt(p[2].split("=")[1])]

		return { buttonA, buttonB, prize }
	})

	for (const { buttonA, buttonB, prize } of machines) {
		let min = Number.MAX_SAFE_INTEGER

		for (let aPresses = 0; aPresses < 100; aPresses++) {
			let xSum = buttonA[0] * aPresses
			let ySum = buttonA[1] * aPresses
			if (xSum > prize[0] || ySum > prize[1]) {
				break
			}
			let maxPresses = 100
			let minPresses = 0
			let bPresses = 50
			while (maxPresses - minPresses > 1) {
				const x = xSum + buttonB[0] * bPresses
				const y = ySum + buttonB[1] * bPresses
				if (x === prize[0] && y === prize[1]) {
					min = Math.min(min, aPresses * 3 + bPresses)
					break
				} else if (x < prize[0] && y < prize[1]) {
					minPresses = bPresses
					bPresses = Math.ceil((bPresses + maxPresses) / 2)
				} else if (x > prize[0] && y > prize[1]) {
					maxPresses = bPresses
					bPresses = Math.floor((bPresses + minPresses) / 2)
				} else {
					break
				}
			}
		}
		if (min !== Number.MAX_SAFE_INTEGER) {
			result += min
		}

	}

	return result
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split(`\n\n`)
		.map((r) => {
			const row = r.split("\n")
			return row
		})

	const machines = rows.map((r, index) => {
		const ba = r[0].split(" ")
		const buttonA = [parseInt(ba[2].split("+")[1]), parseInt(ba[3].split("+")[1])] as [number, number]
		const bb = r[1].split(" ")
		const buttonB = [parseInt(bb[2].split("+")[1]), parseInt(bb[3].split("+")[1])] as [number, number]
		const p = r[2].split(" ")
		const prize = [parseInt(p[1].split("=")[1]) + 10000000000000, parseInt(p[2].split("=")[1]) + 10000000000000] as [number, number]

		return { buttonA, buttonB, prize }
	})

	for (const { buttonA, buttonB, prize } of machines) {

		const A = buttonA[0]
		const B = buttonB[0]
		const C = buttonA[1]
		const D = buttonB[1]

		const X = prize[0]
		const Y = prize[1]

		const b = ((A * Y) - (C * X)) / ((A * D) - (C * B))
		const a = ((B * Y) - (D * X)) / ((B * C) - (D * A))

		if (Number.isInteger(a) && Number.isInteger(b)) {
			result += a * 3 + b
		}
	}

	return result
}

export const expectedResult = {
	debug: [480, 875318608908],
	input: [27105, 101726882250942],
}