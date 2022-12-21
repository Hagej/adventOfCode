import * as utils from "@utils"
import { product } from "@utils"
import fs from "fs"

interface Blueprint {
	oreCost: number
	clayCost: number
	obsidianCost: [number, number]
	geodeCost: [number, number]
}

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows: Blueprint[] = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split(":")[1].split(".")
			const oreCost = parseInt(row[0].split(" costs ")[1])
			const clayCost = parseInt(row[1].split(" costs ")[1])
			const obsidianCost = row[2]
				.split(" costs ")[1]
				.split(" and ")
				.map((p) => parseInt(p)) as [number, number]
			const geodeCost = row[3]
				.split(" costs ")[1]
				.split(" and ")
				.map((p) => parseInt(p)) as [number, number]

			return { oreCost, clayCost, obsidianCost, geodeCost }
		})

	let cache

	const explore = (bp: Blueprint, min: number, orr: number, cr: number, obr: number, gr: number, ore: number, clay: number, obs: number, geo: number) => {
		let key = `${min}|${orr}|${cr}|${obr}|${gr}|${ore}|${clay}|${obs}|${geo}`
		if (cache.has(key)) {
			return cache.get(key)
		}
		const mtor = Math.ceil((bp.oreCost - ore) / orr)
		const mtc = Math.ceil((bp.clayCost - ore) / orr)
		const mtob = Math.ceil(Math.max((bp.obsidianCost[0] - ore) / orr, (bp.obsidianCost[1] - clay) / cr))
		const mtg = Math.ceil(Math.max((bp.geodeCost[0] - ore) / orr, (bp.geodeCost[1] - obs) / obr))

		let timeLeft = false
		let time
		let max = 0

		if (min > Math.max(mtor, 0) + 1) {
			time = Math.max(mtor, 0)
			timeLeft = true
			const vals: [number, number, number, number, number, number, number, number, number] = [
				min - time - 1,
				orr + 1,
				cr,
				obr,
				gr,
				ore + (time + 1) * orr - bp.oreCost,
				clay + (time + 1) * cr,
				obs + (time + 1) * obr,
				geo + (time + 1) * gr,
			]

			const e = explore(bp, ...vals)
			max = Math.max(max, e)
		}
		if (min > Math.max(mtc, 0) + 1 && mtc < 10) {
			const time = Math.max(mtc, 0)
			timeLeft = true
			const vals: [number, number, number, number, number, number, number, number, number] = [
				min - time - 1,
				orr,
				cr + 1,
				obr,
				gr,
				ore + (time + 1) * orr - bp.clayCost,
				clay + (time + 1) * cr,
				obs + (time + 1) * obr,
				geo + (time + 1) * gr,
			]
			const e = explore(bp, ...vals)
			max = Math.max(max, e)
		}
		if (min > Math.max(mtob, 0) + 1 && mtob < 10) {
			const time = Math.max(mtob, 0)
			timeLeft = true
			const vals: [number, number, number, number, number, number, number, number, number] = [
				min - time - 1,
				orr,
				cr,
				obr + 1,
				gr,
				ore + (time + 1) * orr - bp.obsidianCost[0],
				clay + (time + 1) * cr - bp.obsidianCost[1],
				obs + (time + 1) * obr,
				geo + (time + 1) * gr,
			]
			const e = explore(bp, ...vals)
			max = Math.max(max, e)
		}
		if (min > Math.max(mtg, 0) + 1 && mtg < 10) {
			const time = Math.max(mtg, 0)
			timeLeft = true
			const vals: [number, number, number, number, number, number, number, number, number] = [
				min - time - 1,
				orr,
				cr,
				obr,
				gr + 1,
				ore + (time + 1) * orr - bp.geodeCost[0],
				clay + (time + 1) * cr,
				obs + (time + 1) * obr - bp.geodeCost[1],
				geo + (time + 1) * gr,
			]
			const e = explore(bp, ...vals)
			max = Math.max(max, e)
		}

		if (!timeLeft) {
			const G = geo + min * gr
			cache.set(key, G)
			return G
		} else {
			cache.set(key, max)
			return max
		}
	}

	rows.map((bp, index) => {
		cache = new Map<string, number>()
		console.log("Starting exploring blueprint", index + 1)
		result += explore(bp, 24, 1, 0, 0, 0, 0, 0, 0, 0) * (index + 1)
	})

	return result
}

export function two(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows: Blueprint[] = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split(":")[1].split(".")
			const oreCost = parseInt(row[0].split(" costs ")[1])
			const clayCost = parseInt(row[1].split(" costs ")[1])
			const obsidianCost = row[2]
				.split(" costs ")[1]
				.split(" and ")
				.map((p) => parseInt(p)) as [number, number]
			const geodeCost = row[3]
				.split(" costs ")[1]
				.split(" and ")
				.map((p) => parseInt(p)) as [number, number]

			return { oreCost, clayCost, obsidianCost, geodeCost }
		})

	let cache: Map<string, number>
	let maxOre = 0
	const explore = (bp: Blueprint, min: number, orr: number, cr: number, obr: number, gr: number, ore: number, clay: number, obs: number, geo: number) => {
		let key = `${min} ${orr} ${cr} ${obr} ${gr} ${ore} ${clay} ${obs} ${geo}`
		if (cache.has(key)) {
			return cache.get(key)
		}
		const mtor = Math.ceil((bp.oreCost - ore) / orr)
		const mtc = Math.ceil((bp.clayCost - ore) / orr)
		const mtob = Math.ceil(Math.max((bp.obsidianCost[0] - ore) / orr, (bp.obsidianCost[1] - clay) / cr))
		const mtg = Math.ceil(Math.max((bp.geodeCost[0] - ore) / orr, (bp.geodeCost[1] - obs) / obr))

		let timeLeft = false
		let time

		let max = 0

		if (orr < maxOre && min > Math.max(mtor, 0) + 1) {
			time = Math.max(mtor, 0) + 1
			timeLeft = true
			const vals: [number, number, number, number, number, number, number, number, number] = [
				min - time,
				orr + 1,
				cr,
				obr,
				gr,
				ore + time * orr - bp.oreCost,
				clay + time * cr,
				obs + time * obr,
				geo + time * gr,
			]

			const e = explore(bp, ...vals)
			max = Math.max(max, e)
		}
		if (cr < bp.obsidianCost[1] && min > Math.max(mtc, 0) + 1) {
			time = Math.max(mtc, 0) + 1
			timeLeft = true
			const vals: [number, number, number, number, number, number, number, number, number] = [
				min - time,
				orr,
				cr + 1,
				obr,
				gr,
				ore + time * orr - bp.clayCost,
				clay + time * cr,
				obs + time * obr,
				geo + time * gr,
			]
			const e = explore(bp, ...vals)
			max = Math.max(max, e)
		}
		if (min > Math.max(mtob, 0) + 1) {
			time = Math.max(mtob, 0) + 1
			timeLeft = true
			const vals: [number, number, number, number, number, number, number, number, number] = [
				min - time,
				orr,
				cr,
				obr + 1,
				gr,
				ore + time * orr - bp.obsidianCost[0],
				clay + time * cr - bp.obsidianCost[1],
				obs + time * obr,
				geo + time * gr,
			]
			const e = explore(bp, ...vals)

			max = Math.max(max, e)
		}
		if (min > Math.max(mtg, 0) + 1) {
			time = Math.max(mtg, 0) + 1
			timeLeft = true
			const vals: [number, number, number, number, number, number, number, number, number] = [
				min - time,
				orr,
				cr,
				obr,
				gr + 1,
				ore + time * orr - bp.geodeCost[0],
				clay + time * cr,
				obs + time * obr - bp.geodeCost[1],
				geo + time * gr,
			]
			const e = explore(bp, ...vals)

			max = Math.max(max, e)
		}

		if (timeLeft) {
			cache.set(key, max)
			return max
		}
		const G = geo + min * gr
		cache.set(key, G)
		return G
	}

	const R = [0, 0, 0]
	for (let i = 0; i < Math.min(rows.length, 3); i++) {
		const bp = rows[i]
		cache = new Map<string, number>()
		maxOre = Math.max(bp.clayCost, bp.oreCost, bp.obsidianCost[0], bp.geodeCost[0])
		console.log("Starting exploring blueprint", i + 1)
		R[i] = explore(bp, 32, 1, 0, 0, 0, 0, 0, 0, 0)
	}

	return product(R)
}

export const expectedResult = {
	debug: [33, 0],
	input: [],
}
