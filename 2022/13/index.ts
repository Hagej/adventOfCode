import * as utils from "@utils"
import fs from "fs"

type A = Array<number | A>

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r.split("\n").map((n) => JSON.parse(n) as A)
			return row
		})

	rows.map((r, index) => {
		if (compare(r[0], r[1])) {
			console.log(true)
			result += index + 1
		} else {
			console.log(false)
		}
	})

	return result
}

const compare = (a: A, b: A) => {
	for (let i = 0; i < Math.max(a.length, b.length); i++) {
		if (a[i] === undefined) {
			return true
		} else if (typeof a[i] === "number") {
			if (b[i] === undefined) return false
			if (typeof b[i] === "number") {
				if (a[i] > b[i]) {
					return false
				} else if (a[i] < b[i]) {
					return true
				} else {
					continue
				}
			} else if (typeof b[i] === "object") {
				const r = compare([a[i]], b[i] as A[])
				if (r !== undefined) return r
				continue
			}
		} else if (typeof a[i] === "object") {
			if (typeof b[i] === "number") {
				const r = compare(a[i] as A, [b[i]])
				if (r !== undefined) return r
				continue
			} else if (b[i] === undefined) return false
			else {
				const r = compare(a[i] as A, b[i] as A)
				if (r !== undefined) return r
				continue
			}
		}
	}
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r.split("\n").map((n) => JSON.parse(n) as A)
			return row
		})

	const P = rows.flatMap((r) => r)
	P.push([[2]], [[6]])
	P.sort((a, b) => (compare(a, b) ? -1 : 1))

	console.log(P)

	result = (P.findIndex((p) => JSON.stringify(p) === "[[2]]") + 1) * (P.findIndex((p) => JSON.stringify(p) === "[[6]]") + 1)

	return result
}

export const expectedResult = {
	debug: [13, 140],
	input: [],
}
