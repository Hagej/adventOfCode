import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split(" ").map((s) => parseInt(s))
			return row
		})

	rows.map((r, index) => {
		const num = r[0]
		const perms = evalLTR(r.slice(1), 0)
		if (perms.includes(num)) result += num
	})

	return result
}

function evalLTR(nums: number[], res: number): number[] {
	if (nums.length == 0) return [res]

	return [...evalLTR(nums.slice(1), res + nums[0]), ...evalLTR(nums.slice(1), res * nums[0])]
}

function evalLTR2(nums: number[], res: number): number[] {
	if (nums.length == 0) return [res]

	return [...evalLTR2(nums.slice(1), res + nums[0]),
	...evalLTR2(nums.slice(1), (res ? res : 1) * nums[0]),
	...evalLTR2(nums.slice(1), parseInt(`${res ? res : ""}${nums[0]}`))
	]
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split(" ").map((s) => parseInt(s))
			return row
		})

	rows.map((r, index) => {
		const num = r[0]
		const perms = evalLTR2(r.slice(1), 0)
		if (perms.includes(num)) result += num
	})

	return result
}

export const expectedResult = {
	debug: [3749, 11387],
	input: [],
}
