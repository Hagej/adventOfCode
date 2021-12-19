import * as utils from "../../utils/index.ts"

export function one(inputFile: string) {
	let result = 0
	const file = Deno.readTextFileSync(inputFile)
	const rows: [number, number, number][][] = file
		.trim()
		.split("\n\n")
		.map((g) =>
			g
				.split("\n")
				.filter((r) => !r.startsWith("---"))
				.map((r) => {
					const [x, y, z] = r.split(",").map((i) => parseInt(i))
					return [x, y, z]
				}),
		)

	for (let i = 0; i < rows.length; i++) {
		for (let j = i + 1; j < rows.length; j++) {
			if (compare(rows[i], rows[j]).size >= 12) {

			}
		}
	}

	return result
}

export function two(inputFile: string) {
	throw new Error("Not implemented")
}

function compare(a: [number, number, number][], b: [number, number, number][]) {
	const overlapping: Record<string, [number,number,number]> = {}
	if (a.length !== b.length) {
		console.log("Diff length")
		return overlapping
	}
	for (let i = 0; i < a.length; i++) {
		for (let j = i + 1; j < a.length; j++) {
			if (vec3Diff(a[i], a[j]) === vec3Diff(b[i], b[j])) {
				overlapping[`${a[i][0]},${a[i][1]},${a[i][2]}`] = 
			}
		}
	}
	return overlapping
}

function rotate(coords: [number, number, number][], axis: "x" | "y" | "z") {}

function vec3Diff(a: [number, number, number], b: [number, number, number]) {
	return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
}

export const expectedResult = {
	debug: [],
	input: [],
}
