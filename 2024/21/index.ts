import * as utils from "@utils"
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
		console.log(row)
		console.log(i1)
		console.log(i2)
		console.log(i3, i3.length)

		result += parseInt(row) * i3.length
	}


	return result
}

let cache = {}
function getInstructions(keypad: Record<string, [number, number]>, value: string, x: number, y: number) {
	const k = keypad["E"][1] === 3 ? "N" : "D"
	const key = `${k},${value},${x},${y}`
	if (cache[key]) {
		return cache[key]
	}
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

	cache[key] = `${result}A`

	return `${result}A`

}

let outerCache = {}

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


	cache = {}
	outerCache = {}

	// Räkna ut kombinationer som finns
	// Räkna antalet kombinationer för varje iteration 25ggr
	// Räkna ut totala längden
	const combinations: Record<string, number> = {}

	for (const row of rows) {
		let i1 = ""
		let [x, y] = numericKeypad["A"]
		// From first robot to second
		for (const char of row) {
			i1 = `${i1}${getInstructions(numericKeypad, char, x, y)}`
				;[x, y] = numericKeypad[char]
		}

		for (let j = 0; j < 25; j++) {
			console.log(j, Object.entries(outerCache).length)
			console.log(i1.length)
			console.log(outerCache)

			let i2 = ""
				;[x, y] = directionalKeypad["A"]
			let prevI1A = 0
			let prevI2A = 0
			outer: for (let i = 0; i < i1.length; i++) {

				const nextA = i1.slice(prevI1A).indexOf("A")
				const aSlice = i1.slice(prevI1A, prevI1A + nextA + 1)

				//console.log(aSlice)

				if (outerCache[aSlice]) {
					//console.log("Cache hit", aSlice, outerCache[aSlice])
					i2 = `${i2}${outerCache[aSlice]}`
					i = i + aSlice.length - 1
					prevI1A = i + 1
					prevI2A = i2.length

				} else {
					i2 = `${i2}${getInstructions(directionalKeypad, i1[i], x, y)}`
						;[x, y] = directionalKeypad[i1[i]]
					if (i1[i] === "A") {
						outerCache[i1.slice(prevI1A, i + 1)] = i2.slice(prevI2A)
						// console.log("Slice 1", i1.slice(prevI1A, i + 1))
						// console.log("Slice 2", i2.slice(prevI2A))
						prevI1A = i + 1
						prevI2A = i2.length
						//console.log(outerCache)
					}
				}
			}
			// outerCache[i1] = i2
			i1 = i2

		}

		// console.log(row)
		// console.log(i1)
		// console.log(i2)
		// console.log(i3, i3.length)

		result += parseInt(row) * i1.length
	}


	return result
}

export const expectedResult = {
	debug: [126384],
	input: [],
}
