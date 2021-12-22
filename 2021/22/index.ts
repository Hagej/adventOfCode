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

	rows.map((r, index) => {})

	return result
}

export function two(inputFile: string) {
	throw new Error("Not implemented")
}

export const expectedResult = {
	debug: [],
	input: [],
}
