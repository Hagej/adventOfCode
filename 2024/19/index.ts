import * as utils from "@utils"
import fs from "fs"


export function both(inputFile: string) {
	let [p1, p2] = [0, 0]
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")


	const towels = rows[0].split(", ")
	const designs = rows[1].split(`\n`)

	memo = {}

	for (const design of designs) {
		const d = testDesign(towels, design)
		if (d > 0) {
			p1 += 1
		}
		p2 += d
	}

	return [p1, p2]
}


export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")


	const towels = rows[0].split(", ")
	const designs = rows[1].split(`\n`)

	for (const design of designs) {
		if (testDesign(towels, design)) {
			result += 1
		}
	}

	return result
}


let memo = {}

function testDesign(towels: string[], design: string) {
	if (design === "") return 1
	if (Object.hasOwn(memo, design)) {
		return memo[design]
	}

	let t = towels
	let sum = 0

	for (let i = 0; i < design.length; i++) {
		const next = []
		for (const towel of t) {
			if (design[i] === towel[i]) {
				if (towel.length === i + 1) {
					sum += testDesign(towels, design.slice(i + 1))
				} else {
					next.push(towel)
				}
			}
		}
		if (next.length === 0) break
		t = next
	}

	memo[design] = sum

	return sum
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")


	const towels = rows[0].split(", ")
	const designs = rows[1].split(`\n`)
	memo = {}

	for (const design of designs) {
		result += testDesign(towels, design)
	}

	return result
}

export const expectedResult = {
	debug: [6, 16],
	input: [240, 848076019766013],
}
