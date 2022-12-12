import * as utils from "@utils"
import fs from "fs"

interface Monkey {
	items: number[]
	operation: (old: number) => number
	testVal: number
	test: (val: number) => number
}

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const monkeyR = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r.split("\n")
			return row
		})

	const monkeys: Monkey[] = monkeyR.map((r, index) => {
		const si = r[1]
			.split(": ")[1]
			.split(", ")
			.map((s) => parseInt(s))
		const parts = r[2].split(": ")[1].split(" ")
		const l = parts[4]
		const op = (old: number) => {
			if (parts[3] === "+") {
				return old + (l === "old" ? old : parseInt(l))
			}
			return old * (l === "old" ? old : parseInt(l))
		}

		const p2r = r[3].split(" ")
		const p2 = parseInt(p2r[p2r.length - 1])
		const tr = r[4].split(" ")
		const t = parseInt(tr[tr.length - 1])
		const fr = r[5].split(" ")
		const f = parseInt(fr[fr.length - 1])
		const test = (val: number) => (val % p2 === 0 ? t : f)

		return {
			items: si,
			operation: op,
			testVal: p2,
			test,
		}
	})

	const INS = new Array(monkeys.length).fill(0)

	for (let r = 0; r < 20; r++) {
		for (let i = 0; i < monkeys.length; i++) {
			const m = monkeys[i]
			for (let j = 0; j < m.items.length; j++) {
				m.items[j] = Math.floor(m.operation(m.items[j]) / 3)
				monkeys[m.test(m.items[j])].items.push(m.items[j])
				INS[i]++
			}
			m.items = []
		}
	}

	const s = INS.sort((a, b) => b - a)
	console.log(s)
	result = s[0] * s[1]

	return result
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const monkeyR = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r.split("\n")
			return row
		})

	const monkeys: Monkey[] = monkeyR.map((r, index) => {
		const si = r[1]
			.split(": ")[1]
			.split(", ")
			.map((s) => parseInt(s))
		const parts = r[2].split(": ")[1].split(" ")
		const l = parts[4]
		const op = (old: number) => {
			if (parts[3] === "+") {
				return old + (l === "old" ? old : parseInt(l))
			}
			return old * (l === "old" ? old : parseInt(l))
		}

		const p2r = r[3].split(" ")
		const p2 = parseInt(p2r[p2r.length - 1])
		const tr = r[4].split(" ")
		const t = parseInt(tr[tr.length - 1])
		const fr = r[5].split(" ")
		const f = parseInt(fr[fr.length - 1])
		const test = (val: number) => {
			return val % p2 === 0 ? t : f
		}

		return {
			items: si,
			operation: op,
			testVal: p2,
			test,
		}
	})

	const INS = new Array(monkeys.length).fill(0)

	const cd = monkeys.reduce((prev, m) => prev * m.testVal, 1)

	for (let r = 0; r < 10000; r++) {
		for (let i = 0; i < monkeys.length; i++) {
			const m = monkeys[i]
			for (let j = 0; j < m.items.length; j++) {
				m.items[j] = m.operation(m.items[j]) % cd
				monkeys[m.test(m.items[j])].items.push(m.items[j])
				INS[i]++
			}
			m.items = []
		}
		if (r < 100) console.log(r, INS)
	}

	const s = INS.sort((a, b) => b - a)
	console.log(s)
	result = s[0] * s[1]

	return result
}

export const expectedResult = {
	debug: [10605, 2713310158],
	input: [],
}
