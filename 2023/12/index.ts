import * as utils from "@utils"
import { numberOfDFGCompiles } from "bun:jsc"
import fs from "fs"
import { setSourceMapRange } from "typescript"
import { parse } from "url"

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

	rows.map((r, index) => {
		let [spring, arr] = r.split(" ")
		const nums = arr.split(",").map((a) => parseInt(a))

		const sum = utils.sum(nums)

		const Q = spring.match(/\?/g).length

		const S = spring.match(/\#/g)?.length ?? 0

		if (sum > Q + S) return

		let T = "#".repeat(sum - S).concat(".".repeat(Q - (sum - S)))

		let perms = permute(T)
		for (const p of perms) {
			let perm = spring
			for (let i = 0; i < p.length; i++) {
				perm = perm.replace("?", p[i])
			}
			if (isCorrectArrangement(perm, nums)) {
				result += 1
			}
		}
	})

	return result
}

function permute(str = "") {
	if (!!str.length && str.length < 2) {
		return str
	}
	const arr = []
	for (let i = 0; i < str.length; i++) {
		let char = str[i]
		if (str.indexOf(char) != i) continue
		let remainder = str.slice(0, i) + str.slice(i + 1, str.length)
		for (let permutation of permute(remainder)) {
			arr.push(char + permutation)
		}
	}
	return arr
}

function isCorrectArrangement(spring: string, arr: number[]) {
	let inARow = 0
	let correct = 0
	for (const char of spring) {
		if (char === "#") {
			inARow++
		} else {
			if (inARow > arr[correct]) return false
			if (char === "?") return undefined
			if (inARow === arr[correct] && char === ".") {
				correct += 1
			}
			inARow = 0
		}
	}
	if (inARow === arr[correct]) {
		correct += 1
	}
	return correct === arr.length
}

const cache = new Map<string, number>()
function findArrs(springNr: number, spring: string, inARow: number, arr: number[], index: number, arrI: number, sum: number) {
	let arrs = 0

	const S = spring.match(/\#/g)?.length
	if (S > sum) return 0

	const Q = spring.match(/\?/g)?.length
	if (S + Q < sum) return 0

	const key = `${springNr}|${spring.slice(index)}|${index}|${inARow}|${arr.join(",")}|${arrI}`
	const cacheHit = cache.get(key)
	if (typeof cacheHit !== "undefined") {
		return cacheHit
	}

	let i = index

	while (spring[i] !== "?") {
		if (i === spring.length - 1) {
			return isCorrectArrangement(spring, arr) ? 1 : 0
		}
		if (spring[i] === "#") {
			inARow += 1
			if (inARow > arr[arrI]) {
				return 0
			}
		} else {
			if (inARow > 0) {
				if (inARow !== arr[arrI]) {
					return 0
				}
				arrI += 1
				if (arrI >= arr.length) {
					return 1
				}
			}
			inARow = 0
		}
		i++
	}

	if (inARow === arr[arrI]) {
		arrs += findArrs(springNr, spring.replace("?", "."), 0, arr, i, arrI + 1, sum)
	} else {
		arrs += findArrs(springNr, spring.replace("?", "."), inARow, arr, i, arrI, sum)
		arrs += findArrs(springNr, spring.replace("?", "#"), inARow, arr, i, arrI, sum)
	}

	cache.set(key, arrs)

	return arrs
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

	cache.clear()

	rows.map((r, index) => {
		let [spring, arr] = r.split(" ")
		let nums = arr.split(",").map((a) => parseInt(a))

		spring = new Array(5).fill(spring).join("?")
		nums = new Array(5).fill(nums).flat()

		let arrs = findArrs(index, spring, 0, nums, 0, 0, utils.sum(nums))

		result += arrs
	})

	return result
}

export const expectedResult = {
	debug: [21, 525152],
	input: [],
}
