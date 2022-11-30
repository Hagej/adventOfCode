import * as utils from "../../utils"
import fs from "fs"

let verSum = 0

const mapping: Record<string, string> = {
	"0": "0000",
	"1": "0001",
	"2": "0010",
	"3": "0011",
	"4": "0100",
	"5": "0101",
	"6": "0110",
	"7": "0111",
	"8": "1000",
	"9": "1001",
	A: "1010",
	B: "1011",
	C: "1100",
	D: "1101",
	E: "1110",
	F: "1111",
}

export function one(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8")
	let input = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})[0]

	let bin = ""

	for (const char of input) {
		bin += mapping[char]
	}

	verSum = 0
	readPacket(bin, 0)

	return verSum
}

export function two(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8")
	let input = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})[0]

	let bin = ""

	for (const char of input) {
		bin += mapping[char]
	}

	verSum = 0
	const [rValue, rLength] = readPacket(bin, 0)

	return rValue[0]
}

function readPacket(packet: string, recDepth: number): [number[], number] {
	let iterator = 0
	let value: number[] = []
	const version = packet.substr(iterator, 3)
	iterator += 3
	verSum += parseInt(version, 2)
	const type = packet.substr(iterator, 3)
	iterator += 3
	if (type === "100") {
		let valueBits = ""
		while (true) {
			const cur = packet.substr(iterator, 5)
			iterator += 5
			valueBits += cur.substr(1)
			if (cur.startsWith("0")) {
				value = [parseInt(valueBits, 2)]
				return [value, iterator]
			}
		}
	} else {
		const I = packet.substr(iterator, 1)
		iterator += 1
		let subvals: number[] = []
		if (I === "0") {
			const subpktlength = parseInt(packet.substr(iterator, 15), 2)
			iterator += 15
			const subpktend = iterator + subpktlength
			while (iterator != subpktend) {
				const subpkt = packet.substring(iterator, subpktend)
				const [vals, length] = readPacket(subpkt, recDepth + 1)
				iterator += length
				subvals.push(...vals)
			}
		} else {
			const subpktamount = parseInt(packet.substr(iterator, 11), 2)
			iterator += 11
			for (let i = 0; i < subpktamount; i++) {
				const [vals, length] = readPacket(packet.substr(iterator), recDepth + 1)
				iterator += length
				subvals.push(...vals)
			}
		}
		if (type === "000") return [[utils.sum(subvals)], iterator]
		if (type === "001") return [[utils.product(subvals)], iterator]
		if (type === "010") return [[Math.min(...subvals)], iterator]
		if (type === "011") return [[Math.max(...subvals)], iterator]
		if (type === "101") return [[subvals[0] > subvals[1] ? 1 : 0], iterator]
		if (type === "110") return [[subvals[0] < subvals[1] ? 1 : 0], iterator]
		if (type === "111") return [[subvals[0] === subvals[1] ? 1 : 0], iterator]
		return [[0], 0]
	}
}

export const expectedResult = {
	debug: [],
	input: [943, 167737115857],
}
