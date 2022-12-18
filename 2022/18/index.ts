import * as utils from "@utils"
import fs from "fs"
const dirs = [
	[0, 0, 1],
	[0, 0, -1],
	[0, 1, 0],
	[0, -1, 0],
	[1, 0, 0],
	[-1, 0, 0],
]

export function one(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split(",").map((s) => parseInt(s))
			return row
		})

	const S = new Set()

	let sides = 0
	rows.map((r, index) => {
		sides += 6
		for (const d of dirs) {
			const x = r[0] + d[0]
			const y = r[1] + d[1]
			const z = r[2] + d[2]
			if (S.has(`${x},${y},${z}`)) {
				sides -= 2
			}
		}
		S.add(`${r[0]},${r[1]},${r[2]}`)
	})

	return sides
}

export function two(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split(",").map((s) => parseInt(s))
			return row
		})

	const S = new Set([...rows.map((r, index) => `${r[0]},${r[1]},${r[2]}`)])

	let minx = Infinity
	let miny = Infinity
	let minz = Infinity

	let maxx = 0
	let maxy = 0
	let maxz = 0

	rows.forEach((r) => {
		minx = Math.min(minx, r[0] - 1)
		miny = Math.min(miny, r[1] - 1)
		minz = Math.min(minz, r[2] - 1)

		maxx = Math.max(maxx, r[0] + 1)
		maxy = Math.max(maxy, r[1] + 1)
		maxz = Math.max(maxz, r[2] + 1)
	})

	const Q = [[minx, miny, minz]]
	const V = new Set<string>()
	V.add(`${minx},${miny},${minz}`)
	let sides = 0

	while (Q.length > 0) {
		const cur = Q.shift()
		for (const d of dirs) {
			const xx = cur[0] + d[0]
			const yy = cur[1] + d[1]
			const zz = cur[2] + d[2]
			if (xx < minx || xx > maxx || yy < miny || yy > maxy || zz < minz || zz > maxz) {
				continue
			}
			if (S.has(`${xx},${yy},${zz}`)) {
				sides += 1
			} else if (!V.has(`${xx},${yy},${zz}`)) {
				V.add(`${xx},${yy},${zz}`)
				Q.push([xx, yy, zz])
			}
		}
	}
	return sides
}

export const expectedResult = {
	debug: [64, 58],
	input: [],
}
