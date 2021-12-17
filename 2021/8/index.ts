import * as utils from "../../utils/index.ts"

export function one(inputFile: string) {
	let result = 0
	const file = Deno.readTextFileSync(inputFile)
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	const values = rows.map((r) => {
		const row = r.split(" | ").map((r) => r.split(" "))
		return [row[0], row[1]]
	})

	for (const v of values) {
		for (const o of v[1]) if ([2, 3, 4, 7].includes(o.length)) result++
	}

	return result
}

export function two(inputFile: string) {
	const file = Deno.readTextFileSync(inputFile)
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	let output = []

	const values = rows.map((r) => {
		const row = r.split(" | ").map((r) => r.split(" "))

		return [row[0], row[1]]
	})
	const mapping: Array<Array<string>> = Array<Array<string>>(values.length)

	for (let i = 0; i < values.length; i += 1) {
		const m: string[] = Array(10)
		let v = values[i][0]
		let index = 0
		for (const val of v) {
			if (val.length === 2) {
				m[1] = val
			}
			if (val.length === 3) {
				m[7] = val
			}
			if (val.length === 4) {
				m[4] = val
			}
			if (val.length === 7) {
				m[8] = val
			}
		}
		v = v.filter((val) => val !== m[1] && val !== m[4] && val !== m[7] && val !== m[8])

		m[9] = v.find((val, ind) => {
			const overlap = stringOverlap(m[4], val)
			if (overlap.length === 4) {
				index = ind
				return true
			}
		}) as string

		v.splice(index, 1)

		m[6] = v.find((val, ind) => {
			const sub = stringSubtract(m[8], val)
			if (sub.length === 1 && stringOverlap(sub[0], m[1]).length === 1) {
				index = ind
				return true
			}
		}) as string
		v.splice(index, 1)
		m[0] = v.find((val, ind) => {
			const s = stringSubtract(m[8], val)
			if (s.length == 1) {
				index = ind
				return true
			}
		}) as string

		v.splice(index, 1)

		m[5] = v.find((val, ind) => {
			const s = stringSubtract(m[6], val)
			if (s.length === 1) {
				index = ind
				return true
			}
		}) as string
		v.splice(index, 1)

		m[3] = v.find((val, ind) => {
			const s = stringOverlap(m[1], val)
			if (s.length === 2) {
				index = ind
				return true
			}
		}) as string

		v.splice(index, 1)
		m[2] = v[0]
		mapping[i] = m
	}

	output = values.map((v, index) => {
		const r = v[1].reduce((prev, cur) => {
			const num = mapping[index].findIndex((m) => stringLetterCompare(m, cur))
			return `${prev}${num}`
		}, "")

		return parseInt(r)
	})

	return utils.sum(output)
}

function stringSubtract(a: string, b: string) {
	const avals = a.split("")
	const bvals = b.split("")
	const result = avals.filter((c) => !bvals.includes(c))
	return result.join("")
}

function stringLetterCompare(a: string, b: string) {
	if (a.length != b.length) return false
	const result = a.split("").every((v) => b.split("").includes(v))
	return result
}

function stringOverlap(a: string, b: string) {
	let result = []
	const avals = a.split("")
	const bvals = b.split("")
	for (const c of avals) {
		if (bvals.includes(c)) result.push(c)
	}
	return result.join("")
}

export const expectedResult = {
	debug: [26, 61229],
	input: [301, 908067],
}
