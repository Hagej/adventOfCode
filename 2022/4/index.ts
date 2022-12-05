import * as utils from "@utils"
import fs, { readSync } from "fs"
import ts from "typescript"

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
		const pairs = r.split(",")
		const [oStart, oEnd] = pairs[0].split("-")
		const [tStart, tEnd] = pairs[1].split("-")
		console.log(oStart, oEnd, tStart, tEnd)
		if (parseInt(oStart) >= parseInt(tStart) && parseInt(oEnd) <= parseInt(tEnd)) {
			console.log("Hello", oStart, oEnd, tStart, tEnd)
			result++
		} else if (parseInt(tStart) >= parseInt(oStart) && parseInt(tEnd) <= parseInt(oEnd)) {
			console.log("there", oStart, oEnd, tStart, tEnd)
			result++
		}
	})

	return result
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

	rows.map((r, index) => {
		const pairs = r.split(",")
		const [oStart, oEnd] = pairs[0].split("-")
		const [tStart, tEnd] = pairs[1].split("-")
		console.log(oStart, oEnd, tStart, tEnd)
		if (
			(parseInt(oStart) <= parseInt(tEnd) && parseInt(oEnd) >= parseInt(tStart)) ||
			(parseInt(tStart) <= parseInt(oEnd) && parseInt(tEnd) >= parseInt(oStart))
		) {
			console.log("there", oStart, oEnd, tStart, tEnd)
			result++
		}
	})

	return result
}

export const expectedResult = {
	debug: [2, 4],
	input: [],
}
