import * as utils from "@utils"
import fs from "fs"

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
		const prize = [parseInt(p[1].split("=")[1]), parseInt(p[2].split("=")[1])] as [number, number]

		return { buttonA, buttonB, prize }
	})

	for (const { buttonA, buttonB, prize } of machines) {

		const prizePresses = findFewestPresses(buttonA, buttonB, prize)
		const tenKPresses = findFewestPresses(buttonA, buttonB, [100000, 100000])

		// console.log(prizePresses, tenKPresses)

		if (prizePresses && tenKPresses) {
			result += prizePresses + tenKPresses * 1000000000
		}

	}

	return result
}

function findFewestPresses(buttonA: [number, number], buttonB: [number, number], prize: [number, number]) {
	let min = Number.MAX_SAFE_INTEGER

	for (let aPresses = 0; aPresses < 1000; aPresses++) {
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
		return min
	}
}

export const expectedResult = {
	debug: [480],
	input: [],
}
