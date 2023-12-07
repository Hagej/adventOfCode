import * as utils from "@utils"
import fs from "fs"

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

	const values = {
		A: 14,
		K: 13,
		Q: 12,
		J: 11,
		T: 10,
	}

	const hands = rows.sort((a, b) => {
		const handA = a.split(" ")[0]
		const handB = b.split(" ")[0]

		const ha = getHand(handA)
		const hb = getHand(handB)

		if (ha === hb) {
			for (let i = 0; i < 5; i++) {
				const va = values[handA[i]] || parseInt(handA[i])
				const vb = values[handB[i]] || parseInt(handB[i])

				if (va > vb) {
					return 1
				} else if (vb > va) {
					return -1
				}
			}
		}
		return ha - hb
	})

	hands.forEach((h, i) => {
		result += parseInt(h.split(" ")[1]) * (i + 1)
	})

	return result
}

enum HandType {
	"HIGH",
	"ONE",
	"TWO",
	"THREE",
	"FULL",
	"FOUR",
	"FIVE",
}

function getHand(hand: string): HandType {
	const handNum: Record<string, number> = {}

	for (let i = 0; i < hand.length; i++) {
		handNum[hand[i]] = !handNum[hand[i]] ? 1 : 1 + handNum[hand[i]]
	}

	const vals = Object.values(handNum)

	if (vals.length === 1) return HandType.FIVE
	if (vals.length === 2) {
		if (vals.includes(4)) return HandType.FOUR
		return HandType.FULL
	}
	if (vals.length === 3) {
		if (vals.includes(3)) return HandType.THREE
		return HandType.TWO
	}
	if (vals.length === 4) return HandType.ONE
	return HandType.HIGH
}

function getHand2(hand: string): HandType {
	let handNum: Record<string, number> = {}

	let jokers = 0
	for (let i = 0; i < hand.length; i++) {
		if (hand[i] === "J") {
			jokers += 1
		}
		handNum[hand[i]] = !handNum[hand[i]] ? 1 : 1 + handNum[hand[i]]
	}

	const vals = Object.values(handNum)

	if (vals.length === 1) return HandType.FIVE
	if (vals.length === 2) {
		if (vals.includes(4)) {
			if (jokers) {
				return HandType.FIVE
			}
			return HandType.FOUR
		}
		if (jokers === 3) return HandType.FIVE
		if (jokers === 2) return HandType.FIVE
		if (jokers === 1) return HandType.FOUR
		return HandType.FULL
	}
	if (vals.length === 3) {
		if (vals.includes(3)) {
			if (jokers === 3) return HandType.FOUR
			if (jokers === 1) return HandType.FOUR
			return HandType.THREE
		}
		if (jokers === 2) return HandType.FOUR
		if (jokers === 1) return HandType.FULL
		return HandType.TWO
	}
	if (vals.length === 4) {
		if (jokers === 2) return HandType.THREE
		if (jokers === 1) return HandType.THREE
		return HandType.ONE
	}
	if (jokers === 1) return HandType.ONE
	return HandType.HIGH
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

	const values = {
		A: 14,
		K: 13,
		Q: 12,
		J: 1,
		T: 10,
	}

	const hands = rows.sort((a, b) => {
		const handA = a.split(" ")[0]
		const handB = b.split(" ")[0]

		const ha = getHand2(handA)
		const hb = getHand2(handB)

		if (ha === hb) {
			for (let i = 0; i < 5; i++) {
				const va = values[handA[i]] || parseInt(handA[i])
				const vb = values[handB[i]] || parseInt(handB[i])

				if (va > vb) {
					return 1
				} else if (vb > va) {
					return -1
				}
			}
		}
		return ha - hb
	})

	hands.forEach((h, i) => {
		result += parseInt(h.split(" ")[1]) * (i + 1)
	})

	return result
}

export const expectedResult = {
	debug: [6440, 5905],
	input: [],
}
