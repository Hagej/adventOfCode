import * as utils from "@utils"
import fs from "fs"

export function both(inputFile: string) {
	let [p1, p2] = [0, 0]
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	const AA = []
	const BB = []
	const CC: Record<number, number> = {}
	rows.map((r, index) => {
		const [a, b] = r.split("   ").map((s) => parseInt(s)) as [number, number]
		AA.push(a)
		BB.push(b)
		CC[b] = (CC[b] ?? 0) + 1
	})

	AA.sort()
	BB.sort()

	for (let i = 0; i < AA.length; i++) {
		p1 += Math.abs(AA[i] - BB[i])
		p2 += (CC[AA[i]] ?? 0) * AA[i]
	}

	return [p1, p2]
}
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

	const AA = []
	const BB = []
	rows.map((r, index) => {
		const [a, b] = r.split("   ")
		AA.push(a)
		BB.push(b)
	})

	AA.sort()
	BB.sort()

	for (let i = 0; i < AA.length; i++) {
		result += Math.abs(AA[i] - BB[i])
	}

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

	const AA = []
	const BB = []
	rows.map((r, index) => {
		const [a, b] = r.split("   ")
		AA.push(a)
		BB.push(b)
	})

	for (const a of AA) {
		let c = 0
		for (const b of BB) {
			if (b === a) c++
		}
		result += c * parseInt(a)
	}
	return result
}

export const expectedResult = {
	debug: [],
	input: [1941353, 22539317],
}
