import * as utils from "../../utils/index.ts"

interface Coords {
	w: number
	x: number
	y: number
	z: number
}

export function one(inputFile: string) {
	const w = [1, 9, 9, 5, 9, 9, 9, 9, 9, 1, 9, 9, 3, 2]

	const z = Array(14)
	z[0] = 15 + w[0]
	z[1] = z[0] * 26 + 10 + w[1]
	z[2] = z[1] * 26 + 2 + w[2]
	z[3] = z[2] * 26 + 16 + w[3]
	z[4] = w[4] === w[3] + 4 ? z[2] : 10e30
	z[5] = z[4] * 26 + 11 + w[5]
	z[6] = w[6] === w[5] + 2 ? z[4] : 10e30
	z[7] = z[6] * 26 + 16 + w[7]
	z[8] = z[7] * 26 + 6 + w[8]
	z[9] = w[9] === 1 && w[8] === 0 ? z[7] : 10e30
	z[10] = w[10] === w[7] + 5 ? z[6] : 10e30
	z[11] = w[11] === w[2] ? z[1] : 10e30
	z[12] = w[12] === w[1] - 6 ? z[0] : 10e30
	z[13] = w[13] === w[0] + 1 ? 0 : 10e30

	const func0 = (values: Coords) => {
		values.z = 15 + values.w
		return values
	}

	const func1 = (values: Coords) => {
		values.z *= 26
		values.z += 10 + values.w
		return values
	}

	const func2 = (values: Coords) => {
		values.z *= 26
		values.z += 2 + values.w
		return values
	}
	const func3 = (values: Coords) => {
		values.z *= 26
		values.z += 16 + values.w
		return values
	}

	const func4 = (values: Coords) => {
		values.x = (values.z % 26) - 12 // z mod 26 === 16 + prev w -> 5 <= x <= 13
		values.z = Math.floor(values.z / 26)
		values.x = values.x === values.w ? 0 : 1 // 0 if w is w3 + 4
		values.z *= 25 * values.x + 1 // w === prevW + 4 ? values.z : values.z * 26
		values.z += (12 + values.w) * values.x
		return values
	}
	const func5 = (values: Coords) => {
		values.z *= 26
		values.z += 11 + values.w
		return values
	}

	const func6 = (values: Coords) => {
		values.x = (values.z % 26) - 9 // 3 <= x <= 11
		values.z = Math.floor(values.z / 26) // z reverts to eith 2 + w2 or 12 + w4
		values.x = values.x === values.w ? 0 : 1 // 0 if w is w5 + 2
		values.z *= 25 * values.x + 1 // w === w5 + 2 ? values.z : values.z * 26
		values.z += (5 + values.w) * values.x
		return values
	}
	const func7 = (values: Coords) => {
		values.z *= 26
		values.z += 16 + values.w
		return values
	}
	const func8 = (values: Coords) => {
		values.z *= 26
		values.z += 6 + values.w
		return values
	}

	const func9 = (values: Coords) => {
		values.x = (values.z % 26) - 14 // -7 <= x <= 1
		values.z = Math.floor(values.z / 26) // z reverts to 16 + w7
		values.x = values.x === values.w ? 0 : 1 // 0 if w is w8 - 8
		values.z *= 25 * values.x + 1 // w === w8 - 8 ? values.z : values.z * 26
		values.z += (15 + values.w) * values.x
		return values
	}

	const func10 = (values: Coords) => {
		values.x = (values.z % 26) - 11 // either 4 + w9 or 5 + w7
		values.z = Math.floor(values.z / 26) // z reverts to 6 + w8 or
		values.x = values.x === values.w ? 0 : 1
		values.z *= 25 * values.x + 1
		values.z += (3 + values.w) * values.x

		return values
	}

	const func11 = (values: Coords) => {
		values.x = (values.z % 26) - 2
		values.z = Math.floor(values.z / 26)
		values.x = values.x === values.w ? 0 : 1
		values.z *= 25 * values.x + 1
		values.z += (12 + values.w) * values.x
		return values
	}

	const func12 = (values: Coords) => {
		values.x = (values.z % 26) - 16
		values.z = Math.floor(values.z / 26)
		values.x = values.x === values.w ? 0 : 1
		values.z *= 25 * values.x + 1
		values.z += (10 + values.w) * values.x
		return values
	}

	const func13 = (values: Coords) => {
		values.x = (values.z % 26) - 14
		values.z = Math.floor(values.z / 26)
		values.x = values.x === values.w ? 0 : 1
		values.z *= 25 * values.x + 1
		values.z += (13 + values.w) * values.x
		return values
	}

	func[0] = func0
	func[1] = func1
	func[2] = func2
	func[3] = func3
	func[4] = func4
	func[5] = func5
	func[6] = func6
	func[7] = func7
	func[8] = func8
	func[9] = func9
	func[10] = func10
	func[11] = func11
	func[12] = func12
	func[13] = func13

	const valid = new Set()

	for (let i = 1; i > 0; i--) {
		const r = findValid({ w: i, x: 0, y: 0, z: 0 }, `${i}`)
		if (typeof r === "string") {
			valid.add(r)
		}
	}

	return valid
}

let func: Array<(values: Coords) => Coords> = Array(14)
let iters = 0
let iterAmount = 1000000
let cacheHits = 0
const time = performance.now()
const cache: Record<string, Coords> = {}
const testInput = "17115131996112"
function findValid(coords: Coords, input: string): boolean | string {
	iters++
	if (iters === iterAmount) {
		iterAmount *= 2
		console.log(iters, "took", performance.now() - time, "ms")
		console.log("Input is at", input)
		console.log("Cache hits", cacheHits)
		console.log("Cache length", Object.keys(cache).length)
	}
	const cacheIdx = `${input.length - 1},(${coords.w}, ${coords.z})`
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
	const s = testInput ? parseInt(testInput[input.length]) : 9
	for (let i = s; i > 0; i--) {
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
