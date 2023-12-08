import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	let rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	rows.splice(1, 1)
	const dirs = rows[0]

	const map = {}

	rows.slice(1).map((r, index) => {
		const a = r.split(" = ")
		map[a[0]] = a[1].replace("(", "").replace(")", "").split(", ")
	})

	let pos = "AAA"

	let i = 0
	while (pos !== "ZZZ") {
		const d = dirs[i % dirs.length]
		pos = map[pos][d === "L" ? 0 : 1]
		i += 1
	}

	result = i

	return result
}

function gcd(a: number, b: number) {
	while (b !== 0) {
		// console.log(b)
		const t = b
		b = a % b
		a = t
	}
	return Math.abs(a)
}

function lcm(a, b) {
	return Math.abs(a * b) / gcd(a, b)
}
export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	let rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	rows.splice(1, 1)
	const dirs = rows[0]

	const map = {}

	rows.slice(1).map((r, index) => {
		const a = r.split(" = ")
		map[a[0]] = a[1].replace("(", "").replace(")", "").split(", ")
	})

	let pos = Object.keys(map).filter((m) => m.endsWith("A"))

	const cycles = Array.from({ length: 6 }, () => Array(0))

	let i = 0
	while (!pos.every((p) => p.endsWith("Z"))) {
		pos = pos.map((p, index) => {
			const d = dirs[i % dirs.length]
			const r = map[p][d === "L" ? 0 : 1]
			if (r.endsWith("Z")) {
				cycles[index].push(i)
			}
			return r
		})
		if (cycles.every((c) => c.length >= 2)) {
			const repeats = cycles.map((c) => c[1] - c[0])
			result = 1
			for (let j = 0; j < repeats.length; j++) {
				result = lcm(result, repeats[j])
			}

			return result
		}
		i += 1
	}

	return result
}

export const expectedResult = {
	debug: [2, 6],
	input: [],
}
