import * as utils from "@utils"
import fs from "fs"
import { isConstructorTypeNode } from "typescript"

const toDec = {
	"2": 2,
	"1": 1,
	"0": 0,
	"-": -1,
	"=": -2,
}

const toSnafu = {
	"2": "2",
	"1": "1",
	"0": "0",
	"-1": "-",
	"-2": "=",
}

export function one(inputFile: string) {
	let result = ""
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	let sum = 0
	rows.map((r, index) => {
		let val = 0
		for (let i = r.length - 1; i >= 0; i--) {
			val += toDec[r[i]] * Math.pow(5, r.length - 1 - i)
		}
		sum += val
	})

	let i = 0
	let powSum = 0
	while (Math.pow(5, i) < sum) {
		i++
	}
	i--
	while (i >= 0) {
		let r = 0
		const diff = Math.pow(5, i)
		if (diff > Math.abs(sum * 2)) {
			i--
			result = `${result}0`
			continue
		}
		if (sum > 0) {
			sum -= diff
			r++
			if (Math.abs(sum - diff) < sum) {
				sum -= diff
				r++
			}
		} else if (sum < 0) {
			sum += diff
			r--

			if (Math.abs(sum + diff) < Math.abs(sum)) {
				sum += diff
				r--
			}
		}
		result = `${result}${toSnafu["" + r]}`
		i--
	}

	return result
}

export function two(inputFile: string) {
	throw new Error("Not implemented")
}

export const expectedResult = {
	debug: [],
	input: [],
}
