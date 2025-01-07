import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r.split("\n")
			return row
		})

	const [input, cmds] = rows

	const instructions = cmds.map((c) => {
		const [inp, out] = c.split(" -> ")
		const [a, op, b] = inp.split(" ")
		return { a, op, b, out }
	})

	const gates: Record<string, number> = {}
	for (const i of input) {
		const [gate, value] = i.split(": ")
		gates[gate] = parseInt(value)
	}

	while (instructions.length > 0) {
		const i = instructions.shift()
		if (typeof gates[i.a] !== "undefined" && typeof gates[i.b] !== "undefined") {
			gates[i.out] = getOutput(gates[i.a], gates[i.b], i.op)
		} else {
			instructions.push(i)
		}
	}


	const zs = Object.entries(gates).filter(([k, v]) => k.startsWith("z")).sort()
	const value = zs.reduce((prev, [k, v]) => `${v}${prev}`, "")


	result = parseInt(value, 2)

	return result
}

function getOutput(a: number, b: number, op: string) {
	if (op === "AND") {
		return a && b ? 1 : 0
	}
	if (op === "OR") {
		return a || b ? 1 : 0
	}
	if (op === "XOR") {
		return a !== b ? 1 : 0
	}
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r.split("\n")
			return row
		})

	const [input, cmds] = rows

	const instructions = cmds.map((c) => {
		const [inp, out] = c.split(" -> ")
		const [a, op, b] = inp.split(" ")
		return { a, op, b, out }
	})

	const gates: Record<string, number> = {}
	for (const i of input) {
		const [gate, value] = i.split(": ")
		gates[gate] = parseInt(value)
	}

	const xs = Object.entries(gates).filter(([k, v]) => k.startsWith("x")).sort()
	const ys = Object.entries(gates).filter(([k, v]) => k.startsWith("y")).sort()

	const xVal = parseInt(xs.reduce((prev, [k, v]) => `${v}${prev}`, ""), 2)
	const yVal = parseInt(ys.reduce((prev, [k, v]) => `${v}${prev}`, ""), 2)

	const expect = xVal + yVal
	console.log("Expects: ", expect)

	while (instructions.length > 0) {
		const i = instructions.shift()
		if (typeof gates[i.a] !== "undefined" && typeof gates[i.b] !== "undefined") {
			gates[i.out] = getOutput(gates[i.a], gates[i.b], i.op)
		} else {
			instructions.push(i)
		}
	}


	const zs = Object.entries(gates).filter(([k, v]) => k.startsWith("z")).sort()
	const value = zs.reduce((prev, [k, v]) => `${v}${prev}`, "")


	result = parseInt(value, 2)

	return result
}

export const expectedResult = {
	debug: [2024],
	input: [],
}
