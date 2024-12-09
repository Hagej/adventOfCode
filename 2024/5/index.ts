import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r.split("\n")
			return row
		})

	const rules = rows[0].map((r) => r.split("|").map((i) => parseInt(i)))
	const pages = rows[1].map((r) => r.split(",").map((i) => parseInt(i)))

	for (let i = 0; i < pages.length; i++) {
		const p = pages[i]
		if (isCorrect(rules, p)) {
			result += p[Math.floor(p.length / 2)]
		}
	}

	return result
}


let bad = new Set()
let good = new Set()
function adheresRules(rules: number[][], a: number, b: number) {
	if (bad.has(`${a},${b}`)) return false
	if (good.has(`${a},${b}`)) return true
	if (rules.some((r) => r[0] === b && r[1] === a)) {
		bad.add(`${a},${b}`)
		return false
	}
	good.add(`${a},${b}`)
	return true
}
function isCorrect(rules: number[][], pages: number[]) {
	for (let i = 0; i < rules.length; i++) {
		for (let j = i + 1; j < rules.length; j++) {
			if (!adheresRules(rules, pages[i], pages[j])) {
				return false
			}
		}
	}
	return true
}

function fixPages(rules: number[][], pages: number[]) {
	let modified = false
	for (let i = 0; i < rules.length; i++) {
		for (let j = i + 1; j < rules.length; j++) {
			if (!adheresRules(rules, pages[i], pages[j])) {
				const t = pages[j]
				pages.splice(j, 1)
				pages.splice(i, 0, t)
				// [pages[i], pages[j]] = [pages[j], pages[i]]
				modified = true
			}
		}
	}
	return modified ? pages[Math.floor(pages.length / 2)] : 0
}

export function two(inputFile: string) {
	bad = new Set()
	good = new Set()
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r.split("\n")
			return row
		})

	const rules = rows[0].map((r) => r.split("|").map((i) => parseInt(i)))
	const pages = rows[1].map((r) => r.split(",").map((i) => parseInt(i)))

	for (let i = 0; i < pages.length; i++) {
		const p = pages[i]
		const res = fixPages(rules, p)
		if (res) {
			result += res
		}
	}

	return result
}

export const expectedResult = {
	debug: [143, 123],
	input: [],
}
