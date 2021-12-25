import * as utils from "../../utils/index.ts"

interface Coords {
	w: number
	x: number
	y: number
	z: number
}

export function one(inputFile: string) {
	let result = 0
	const file = Deno.readTextFileSync(inputFile)
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split(" ")
			return row
		})

	let index = -1
	const progs: string[][][] = Array.from(Array(14), () => [])
	rows.forEach((r, i) => {
		if (r[0] === "inp") {
			index++
		} else {
			progs[index].push(r)
		}
	})
	const funcs: Array<Array<(values: Coords) => Coords>> = progs.map((prog) =>
		prog.map((p) => {
			const in1 = p[1] as "w" | "x" | "y" | "z"
			if (p[0] === "add") {
				if (isNaN(parseInt(p[2]))) {
					return (values: Coords) => {
						values[in1] += values[p[2] as "w" | "x" | "y" | "z"]
						return values
					}
				} else {
					return (values: Coords) => {
						values[in1] += parseInt(p[2])
						return values
					}
				}
			} else if (p[0] === "mul") {
				if (isNaN(parseInt(p[2]))) {
					return (values: Coords) => {
						values[in1] *= values[p[2] as "w" | "x" | "y" | "z"]
						return values
					}
				} else {
					return (values: Coords) => {
						values[in1] *= parseInt(p[2])
						return values
					}
				}
			} else if (p[0] === "div") {
				if (!isNaN(parseInt(p[2])) && parseInt(p[2]) === 0) return (values: Coords) => values
				if (isNaN(parseInt(p[2]))) {
					return (values: Coords) => {
						if (values[p[2] as "w" | "x" | "y" | "z"] !== 0) {
							values[in1] = Math.floor(values[in1] / values[p[2] as "w" | "x" | "y" | "z"])
						}
						return values
					}
				} else {
					return (values: Coords) => {
						values[in1] = Math.floor(values[in1] / parseInt(p[2]))
						return values
					}
				}
			} else if (p[0] === "mod") {
				if (!isNaN(parseInt(p[2])) && parseInt(p[2]) <= 0) return (values: Coords) => values
				if (isNaN(parseInt(p[2]))) {
					return (values: Coords) => {
						if (values[in1] >= 0 && values[p[2] as "w" | "x" | "y" | "z"] > 0) {
							values[in1] %= values[p[2] as "w" | "x" | "y" | "z"]
						}
						return values
					}
				} else {
					return (values: Coords) => {
						values[in1] %= parseInt(p[2])
						return values
					}
				}
			} else if (p[0] === "eql") {
				if (isNaN(parseInt(p[2]))) {
					return (values: Coords) => {
						values[in1] = values[in1] === values[p[2] as "w" | "x" | "y" | "z"] ? 1 : 0
						return values
					}
				} else {
					return (values: Coords) => {
						values[in1] = values[in1] === parseInt(p[2]) ? 1 : 0
						return values
					}
				}
			}
			return (values: Coords) => values
		}),
	)

	func = funcs.map((f) =>
		f.reduce(
			(prev, cur) => (values: Coords) => cur(prev(values)),
			(values: Coords) => values,
		),
	)

	const valid = new Set()

	for (let i = 9; i > 0; i--) {
		findValid({ w: i, x: 0, y: 0, z: 0 }, `${i}`)
	}

	return valid
}

let func: Array<(values: Coords) => Coords>
let iters = 0
let iterAmount = 1000000
let cacheHits = 0
const time = performance.now()
const cache: Record<string, Coords> = {}

function findValid(coords: Coords, input: string): boolean | string {
	iters++
	if (iters === iterAmount) {
		iterAmount *= 2
		console.log(iters, "took", performance.now() - time, "ms")
		console.log("Input is at", input)
		console.log("Cache hits", cacheHits)
		console.log("Cache length", Object.keys(cache).length)
	}
	const cacheIdx = `${input.length - 1},(${coords.w}, ${coords.x}, ${coords.y}, ${coords.z})`
	if (!!cache[cacheIdx]) {
		cacheHits++
		coords = cache[cacheIdx]
	} else {
		coords = func[input.length - 1](coords)
		cache[cacheIdx] = { ...coords }
	}

	if (input.length === 14) {
		if (coords.z === 0) {
			console.log(input)
			Deno.exit()
		}
		return coords.z === 0
	}
	let result: string | boolean = false
	for (let i = 9; i > 0; i--) {
		coords.w = i
		const r = findValid({ ...coords }, `${input}${i}`)
		if (typeof r === "string") {
			result = `${i}${r}`
		} else if (r) {
			result = `${i}`
		}
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
