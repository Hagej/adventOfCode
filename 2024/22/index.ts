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

	rows.map((r, index) => {
		let secret = parseInt(r)
		for (let i = 0; i < 2000; i++) {
			secret = ((secret << 6) ^ secret) & 16777215
			secret = ((secret >> 5) ^ secret) & 16777215
			secret = ((secret << 11) ^ secret) & 16777215
		}
		result += secret
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

	const sequences: Array<{ seq: string, value: number }[]> = []
	rows.map((r, index) => {
		const lastFour = []
		let secret = parseInt(r)
		let prev = secret % 10
		let sequence = []
		for (let i = 0; i < 2000; i++) {
			secret = ((secret << 6) ^ secret) & 16777215
			secret = ((secret >> 5) ^ secret) & 16777215
			secret = ((secret << 11) ^ secret) & 16777215
			const next = secret % 10
			const diff = next - prev
			prev = next

			lastFour.push(diff)
			if (lastFour.length > 3) {
				sequence.push({ seq: lastFour.join(","), value: next })

				lastFour.shift()

			}
		}
		sequences.push(sequence)
	})

	const seq = sequences.flat()
	const S: Record<string, number> = {}
	for (const sequence of seq) {
		if (S[sequence.seq]) {
			S[sequence.seq] += 1
		} else {
			S[sequence.seq] = 1
		}
	}

	const ordered = Object.entries(S).map((s) => s).sort((a, b) => b[1] - a[1])

	for (const o of ordered) {
		if (o[1] * 7 < result) break
		let sum = 0
		for (let j = 0; j < sequences.length; j++) {
			const hit = sequences[j].find((s) => s.seq === o[0])
			if (hit) {
				sum += hit.value
			}
		}
		if (sum > result) {
			result = sum
		}
	}

	return result
}

export const expectedResult = {
	debug: [37327623, 23],
	input: [],
}
