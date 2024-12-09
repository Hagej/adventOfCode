import * as utils from "@utils"
import fs from "fs"


export function both(inputFile: string) {
	let [p1, p2] = [0, 0]
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r.split("\n")
			return row
		})

	const rules = rows[0].map((r) => r.split("|").map((i) => parseInt(i)))
	const rulesMap: Record<number, number[]> = {}
	for (const rule of rules) {
		if (rulesMap[rule[1]]) {
			rulesMap[rule[1]].push(rule[0])
		} else {
			rulesMap[rule[1]] = [rule[0]]
		}
	}
	const pages = rows[1].map((r) => r.split(",").map((i) => parseInt(i)))

	for (let i = 0; i < pages.length; i++) {
		const res = orderPages(rulesMap, pages[i])
		if (res) {
			p2 += res
		} else {
			p1 += pages[i][Math.floor(pages[i].length / 2)]
		}
	}

	return [p1, p2]
}

function orderPages(rules: Record<number, number[]>, pages: number[]) {
	let modified = false
	for (let i = 0; i < pages.length; i++) {
		for (let j = i + 1; j < pages.length; j++) {
			if (rules[pages[i]]?.includes(pages[j])) {
				[pages[i], pages[j]] = [pages[j], pages[i]]
				modified = true
				j = i + 1
			}
		}
	}
	return modified ? pages[Math.floor(pages.length / 2)] : 0
}

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


let seen = {}
function adheresRules(rules: number[][], a: number, b: number) {
	const key = `${a},${b}`
	if (seen[key]) return seen[key]
	if (rules.some((r) => r[0] === b && r[1] === a)) {
		seen[key] = false
		return false
	}
	seen[key] = true
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
				[pages[i], pages[j]] = [pages[j], pages[i]]
				modified = true
			}
		}
	}
	return modified ? pages[Math.floor(pages.length / 2)] : 0
}

export function two(inputFile: string) {
	seen = {}
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
	input: [4957, 6938],
}
