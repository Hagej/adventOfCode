import * as utils from "@utils"
import fs from "fs"


export function both(inputFile: string) {
	let [p1, p2] = ["", 0]
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r.split("\n")
			return row
		})

	let [A, B, C] = rows[0].map((s) => parseInt(s.split(": ")[1]))

	const program = rows[1][0].split(": ")[1].split(",").map((i) => parseInt(i))

	p1 = runProgram(program, [A, B, C])

	let i = 0

	let output = runProgram(program, [i, B, C])
	const expectedResult = program.join(",")
	while (output !== expectedResult) {
		if (i !== 0 && expectedResult.endsWith(output)) {
			i *= 8
		} else {
			i += 1
		}
		output = runProgram(program, [i, B, C])
	}

	p2 = i
	return [p1, p2]
}
export function one(inputFile: string) {
	let result = ""
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r.split("\n")
			return row
		})

	let [A, B, C] = rows[0].map((s) => parseInt(s.split(": ")[1]))

	const program = rows[1][0].split(": ")[1].split(",").map((i) => parseInt(i))

	result = runProgram(program, [A, B, C])

	return result
}

function runProgram(program: number[], registers: [number, number, number]) {
	let [A, B, C] = registers
	const output = []

	let pointer = 0
	while (pointer < program.length) {
		const opCode = program[pointer]
		const literalOp = program[pointer + 1]
		let comboOp = literalOp
		if (comboOp === 4) comboOp = A
		else if (comboOp === 5) comboOp = B
		else if (comboOp === 6) comboOp = C

		if (opCode === 0) {
			A = Math.floor(A / Math.pow(2, comboOp))
		}
		if (opCode === 1) {
			B = B ^ literalOp
		}
		if (opCode === 2) {
			B = ((comboOp % 8) + 8) % 8
		}
		if (opCode === 3 && A !== 0) {
			pointer = literalOp
			continue
		}
		if (opCode === 4) {
			B = B ^ C
		}
		if (opCode === 5) {
			output.push(((comboOp % 8) + 8) % 8)
		}
		if (opCode === 6) {
			B = Math.floor(A / Math.pow(2, comboOp))
		}
		if (opCode === 7) {
			C = Math.floor(A / Math.pow(2, comboOp))
		}
		pointer += 2
	}


	return output.join(",")
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

	let [A, B, C] = rows[0].map((s) => parseInt(s.split(": ")[1]))

	const program = rows[1][0].split(": ")[1].split(",").map((i) => parseInt(i))

	let i = 0
	if (inputFile.endsWith("debug")) i = 0

	let output = runProgram(program, [i, B, C])
	const expectedResult = program.join(",")
	while (output !== expectedResult) {
		if (i !== 0 && expectedResult.endsWith(output)) {
			i *= 8
		} else {
			i += 1
		}
		output = runProgram(program, [i, B, C])
	}

	result = i
	return result
}

export const expectedResult = {
	debug: ["4,6,3,5,6,3,5,2,1,0", 117440],
	input: ["7,6,1,5,3,1,4,2,6", 164541017976509],
}