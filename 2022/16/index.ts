import * as utils from "@utils"
import fs from "fs"

interface Valve {
	rate: number
	valves: string[]
}
export function one(inputFile: string) {
	let result = 0
	weights = {}
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.reduce((prev, r) => {
			const row = r.split("; ")
			const v = row[0].split(" ")[1]
			const rat = row[0].split(" ")[4]
			const rate = parseInt(rat.split("=")[1])
			const valves = row[1]
				.split(" ")
				.slice(4)
				.map((val) => val.replace(",", ""))
			return { ...prev, [v]: { rate, valves } }
		}, {} as Record<string, Valve>)

	const Q = [{ valve: "AA", minute: 0, fr: 0, amount: 0, opened: new Set<string>() }]
	while (Q.length > 0) {
		const cur = Q.shift()
		if (cur.minute === 30) {
			result = Math.max(result, cur.amount)
			continue
		}
		const weights = getWeights(rows, cur.valve)

		let b = false
		for (const [v, d] of Object.entries(weights).filter(([v, d]) => !cur.opened.has(v) && rows[v].rate > 0)) {
			if (d < 30 - cur.minute) {
				b = true
				Q.push({
					valve: v,
					minute: cur.minute + d + 1,
					amount: cur.amount + cur.fr * (d + 1),
					fr: cur.fr + rows[v].rate,
					opened: new Set([...cur.opened, v]),
				})
			}
		}
		if (!b) {
			Q.push({
				valve: cur.valve,
				minute: 30,
				amount: cur.amount + cur.fr * (30 - cur.minute),
				fr: cur.fr,
				opened: new Set([...cur.opened]),
			})
		}
	}
	return result
}

let weights: Record<string, Record<string, number>>

function getWeights(valves: Record<string, Valve>, start: string) {
	if (weights[start]) {
		return weights[start]
	}
	const W: Record<string, number> = {}
	const Q: Array<[string, number]> = [[start, 0]]
	const V = new Set<string>()
	while (Q.length > 0) {
		const [valve, w] = Q.shift()
		V.add(valve)
		W[valve] = Math.min(w, W[valve] || Infinity)
		for (const v of valves[valve].valves) {
			if (!V.has(v)) {
				Q.push([v, w + 1])
			}
		}
	}
	weights[start] = { ...W }
	return W
}

export function two(inputFile: string) {
	weights = {}
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.reduce((prev, r) => {
			const row = r.split("; ")
			const v = row[0].split(" ")[1]
			const rat = row[0].split(" ")[4]
			const rate = parseInt(rat.split("=")[1])
			const valves = row[1]
				.split(" ")
				.slice(4)
				.map((val) => val.replace(",", ""))
			return { ...prev, [v]: { rate, valves } }
		}, {} as Record<string, Valve>)

	const valves = Object.entries(rows)
		.filter(([v, r]) => r.rate > 0)
		.map(([v, r]) => v)

	const set = []

	function recursive(need: number, s: number, a: string[]) {
		if (!need) {
			var b = a.slice(0)
			set.push(b)
			return
		}
		for (var i = s; i < valves.length; i++) {
			var b = a.slice(0)
			b.push(valves[i])
			recursive(need - 1, i + 1, b)
		}
	}

	recursive(Math.ceil(valves.length / 2), 0, [])

	for (const [i, s] of set.entries()) {
		const e = valves.filter((v) => !s.includes(v))
		const r = getMaxPressure(rows, s) + getMaxPressure(rows, e)
		result = Math.max(result, r)
	}
	return result
}

function getMaxPressure(rows: Record<string, Valve>, available: string[]) {
	let result = 0
	const Q = [{ valve: "AA", minute: 0, fr: 0, amount: 0, opened: new Set<string>() }]
	while (Q.length > 0) {
		const cur = Q.shift()
		if (cur.minute === 26) {
			result = Math.max(result, cur.amount)
			continue
		}
		const weights = getWeights(rows, cur.valve)

		let b = false
		for (const [v, d] of Object.entries(weights).filter(([v, d]) => !cur.opened.has(v) && available.includes(v))) {
			if (d < 26 - cur.minute) {
				b = true
				Q.push({
					valve: v,
					minute: cur.minute + d + 1,
					amount: cur.amount + cur.fr * (d + 1),
					fr: cur.fr + rows[v].rate,
					opened: new Set([...cur.opened, v]),
				})
			}
		}
		if (!b) {
			Q.push({
				valve: cur.valve,
				minute: 26,
				amount: cur.amount + cur.fr * (26 - cur.minute),
				fr: cur.fr,
				opened: new Set([...cur.opened]),
			})
		}
	}
	return result
}

export const expectedResult = {
	debug: [1651, 1707],
	input: [],
}
