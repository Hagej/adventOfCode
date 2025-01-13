import * as utils from "@utils"
import { privateEncrypt } from "crypto"
import fs from "fs"
import { isArrowFunction } from "typescript"


const numericKeypad: Record<string, [number, number]> = {
	"7": [0, 0],
	"8": [1, 0],
	"9": [2, 0],
	"4": [0, 1],
	"5": [1, 1],
	"6": [2, 1],
	"1": [0, 2],
	"2": [1, 2],
	"3": [2, 2],
	"E": [0, 3],
	"0": [1, 3],
	"A": [2, 3],
}
const directionalKeypad: Record<string, [number, number]> = {
	"E": [0, 0],
	"^": [1, 0],
	"A": [2, 0],
	"<": [0, 1],
	"v": [1, 1],
	">": [2, 1],
}
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



	for (const row of rows) {
		let i1 = ""
		let [x, y] = numericKeypad["A"]
		// From first robot to second
		for (const char of row) {
			i1 = `${i1}${getInstructions(numericKeypad, char, x, y)}`
				;[x, y] = numericKeypad[char]
		}
		let i2 = ""
			;[x, y] = directionalKeypad["A"]
		// From second robot to third
		for (const char of i1) {
			i2 = `${i2}${getInstructions(directionalKeypad, char, x, y)}`
				;[x, y] = directionalKeypad[char]
		}
		let i3 = ""
			;[x, y] = directionalKeypad["A"]
		// From third robot to you
		for (const char of i2) {
			i3 = `${i3}${getInstructions(directionalKeypad, char, x, y)}`
				;[x, y] = directionalKeypad[char]
		}

		result += parseInt(row) * i3.length
		console.log(i1, i1.length)
		console.log(i2, i2.length)
		console.log(i3, i3.length)
		console.log(result)
		console.log("=============")
	}


	return result
}

function getInstructions(keypad: Record<string, [number, number]>, value: string, x: number, y: number): string {
	const target = keypad[value]


	let result = ""
	let ix = x
	let iy = y
	while (ix !== target[0] || iy !== target[1]) {
		const dx = target[0] - ix
		const dy = target[1] - iy
		if (dx < 0 && !(ix + dx === keypad["E"][0] && iy === keypad["E"][1])) {
			result = `${result}${"<".repeat(Math.abs(dx))}`
			ix += dx
		} else if (dy > 0 && !(ix === keypad["E"][0] && iy + dy === keypad["E"][1])) {
			result = `${result}${"v".repeat(dy)}`
			iy += dy
		} else if (dx > 0 && !(ix + dx === keypad["E"][0] && iy === keypad["E"][1])) {
			result = `${result}${">".repeat(dx)}`
			ix += dx
		} else if (dy < 0 && !(ix === keypad["E"][0] && iy + dy === keypad["E"][1])) {
			result = `${result}${"^".repeat(Math.abs(dy))}`
			iy += dy
		}
	}


	return `${result}A`

}

function isValid(keypad: Record<string, [number, number]>, inst: string[], x: number, y: number) {
	let ix = x, iy = y


	for (const c of inst) {
		if (c === "<") ix -= 1
		if (c === ">") ix += 1
		if (c === "^") iy -= 1
		if (c === "v") iy += 1

		if (keypad["E"][0] === ix && keypad["E"][1] === iy) {
			return false
		}

	}

	return true

}

let combinationMap = {
	A: ["A"],
}

function getInstructionSet(keypad: Record<string, [number, number]>, inst: string): string {
	// if (combinationMap[inst]) return combinationMap[inst].join("")
	let instructions = ""
	let [x, y] = keypad["A"]
	for (const char of inst) {
		instructions = `${instructions}${getInstructions(keypad, char, x, y)}`
			;[x, y] = keypad[char]
	}
	return instructions
}
export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})


	for (const start of Object.entries(directionalKeypad)) {
		for (const target of Object.entries(directionalKeypad)) {
			if (target[0] === start[0] || start[0] === "E" || target[0] === "E") continue

			let i = getInstructions(directionalKeypad, target[0], directionalKeypad[start[0]][0], directionalKeypad[start[0]][1]).slice(0, -1)
			const perms = utils.permutations(i.split(""))
			let shortest = "=".repeat(100)
			let key = ""
			for (const p of perms) {
				if (!isValid(directionalKeypad, p, directionalKeypad[start[0]][0], directionalKeypad[start[0]][1])) {
					// console.log("Not valid", p)
					continue
				}
				let instructions = getInstructionSet(directionalKeypad, `${p.join("")}A`)
				if (instructions.length < shortest.length) {
					shortest = instructions
					key = `${p.join("")}A`
				} else if (instructions.length === shortest.length && instructions !== shortest) {
					let i2 = instructions, i3 = shortest
					while (i2.length === i3.length) {
						i2 = getInstructionSet(directionalKeypad, i2)
						i3 = getInstructionSet(directionalKeypad, i3)
					}
					if (i2.length < i3.length) {
						shortest = instructions
						key = `${p.join("")}A`
					}
				}
			}

			combinationMap[key] = shortest.split("A").slice(0, -1).map((s) => `${s}A`)

		}
	}

	console.log(combinationMap)



	for (const row of rows) {
		let i1 = getInstructionSet(numericKeypad, row)
		const instructions = i1.split("A").map((s) => `${s}A`).slice(0, -1)

		let combs: Record<string, number> = {}

		for (const inst of instructions) {
			const perms = utils.permutations(inst.split(""))
			let shortest = inst
			for (const p of perms) {

				if (!isValid(numericKeypad, p, numericKeypad["A"][0], numericKeypad["A"][1])) {
					continue
				}
				let instructions = getInstructionSet(directionalKeypad, `${p.join("")}A`)
				if (instructions.length < shortest.length) {
					shortest = instructions
				} else if (instructions.length === shortest.length && instructions !== shortest) {
					let i2 = instructions, i3 = shortest
					while (i2.length === i3.length) {
						i2 = getInstructionSet(directionalKeypad, i2)
						i3 = getInstructionSet(directionalKeypad, i3)
					}
					if (i2.length < i3.length) {
						shortest = instructions
					}
				}
				if (p.join("") === "^<<^^A" || p.join("") === "^^<<^A") console.log("Hellooo there", shortest)
			}
			if (combs[shortest]) {
				combs[shortest] += 1
			} else {
				combs[shortest] = 1
			}
		}

		const next = Object.keys(combs).reduce((prev, cur) => ({ ...prev, [cur]: 0 }), {})

		console.log("After numeric keypad", combs)


		for (let [ins, amount] of Object.entries(combs)) {
			let i1 = getInstructionSet(directionalKeypad, ins)
			const instructions = i1.split("A").map((s) => `${s}A`).slice(0, -1)
			for (const inst of instructions) {

				const perms = utils.permutations(inst.split(""))
				let shortest = inst
				for (const p of perms) {
					if (!isValid(directionalKeypad, p, directionalKeypad["A"][0], directionalKeypad["A"][1])) {
						continue
					}
					let instructions = getInstructionSet(directionalKeypad, `${p.join("")}A`)
					if (instructions.length < shortest.length) {
						shortest = instructions
					} else if (instructions.length === shortest.length && instructions !== shortest) {
						let i2 = instructions, i3 = shortest
						while (i2.length === i3.length) {
							i2 = getInstructionSet(directionalKeypad, i2)
							i3 = getInstructionSet(directionalKeypad, i3)
						}
						if (i2.length < i3.length) {
							shortest = instructions
						}
					}
				}
				if (next[shortest]) {
					next[shortest] += 1
				} else {
					next[shortest] = 1
				}
			}
		}

		combs = Object.entries(next).filter((c) => c[1] !== 0).reduce((prev, cur) => ({ ...prev, [cur[0]]: cur[1] }), {})

		console.log("After first keypad", combs)


		for (let j = 0; j < 24; j++) {

			const next = Object.keys(combs).reduce((prev, cur) => ({ ...prev, [cur]: 0 }), {})

			for (let [inst, amount] of Object.entries(combs)) {
				if (!combinationMap[inst]) {
					console.error("Missing instruction:", inst)
				}
				for (const v of combinationMap[inst]) {
					if (next[v]) {
						next[v] += amount
					} else {
						next[v] = amount
					}
				}
			}

			combs = next
		}



		const length = Object.entries(combs).reduce((prev, val) => prev + (val[0].length * val[1]), 0)

		console.log(row, length)

		result += parseInt(row) * length
	}


	return result
}

export const expectedResult = {
	debug: [126384],
	input: [184716, 123],
}
