import fs from "fs"
const stones = [
	[
		[0, 0],
		[1, 0],
		[2, 0],
		[3, 0],
	],
	[
		[0, 0],
		[1, -1],
		[1, 1],
		[2, 0],
	],
	[
		[0, 0],
		[1, 0],
		[2, 0],
		[2, 1],
		[2, 2],
	],
	[
		[0, 0],
		[0, 1],
		[0, 2],
		[0, 3],
	],
	[
		[0, 0],
		[1, 0],
		[0, 1],
		[1, 1],
	],
]

export function one(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8")
	const moves = file
		.trim()
		.split("")
		.map((r) => {
			const row = r
			return row
		})

	let highest = 0
	let stoneNr = 1

	const S = new Set<string>()
	let pos = [2, 3]
	while (stoneNr < 2023) {
		moves.map((r, index) => {
			if (stoneNr === 2023) return
			if (r === ">") {
				let move = true
				for (const s of stones[(stoneNr - 1) % 5]) {
					const x = pos[0] + s[0]
					const y = pos[1] + s[1]
					if (x + 1 > 6 || S.has(`${x + 1},${y}`)) move = false
				}
				if (move) {
					pos[0] += 1
				}
			} else {
				let move = true
				for (const s of stones[(stoneNr - 1) % 5]) {
					const x = pos[0] + s[0]
					const y = pos[1] + s[1]
					if (x - 1 < 0 || S.has(`${x - 1},${y}`)) move = false
				}
				if (move) {
					pos[0] -= 1
				}
			}
			let stop = false
			for (const s of stones[(stoneNr - 1) % 5]) {
				const x = pos[0] + s[0]
				const y = pos[1] + s[1]
				if (S.has(`${x},${y - 1}`) || y === 0) {
					stop = true
					break
				}
			}
			if (stop) {
				for (const s of stones[(stoneNr - 1) % 5]) {
					const x = pos[0] + s[0]
					const y = pos[1] + s[1]
					S.add(`${x},${y}`)
					highest = Math.max(highest, y)
				}
				stoneNr += 1
				pos = (stoneNr - 1) % 5 === 1 ? [2, highest + 5] : [2, highest + 4]
				return
			}
			pos[1] -= 1
		})
	}
	return highest + 1
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const moves = file
		.trim()
		.split("")
		.map((r) => {
			const row = r
			return row
		})

	let highest = [0, 0, 0, 0, 0, 0, 0]
	let stoneNr = 1

	const S = new Set<string>()
	const C: Record<string, [number, number, [number, number]]> = {}
	let pos: [number, number] = [2, 3]
	let loopFound = false
	let log = 100
	loop: while (true) {
		for (let i = 0; i < moves.length; i++) {
			const stone = (stoneNr - 1) % 5
			const min = Math.min(...highest)

			let move = true
			if (moves[i] === ">") {
				for (const s of stones[stone]) {
					const x = pos[0] + s[0]
					const y = pos[1] + s[1]
					if (x + 1 > 6 || S.has(`${x + 1},${y}`)) move = false
				}
				if (move) pos[0] += 1
			} else {
				for (const s of stones[stone]) {
					const x = pos[0] + s[0]
					const y = pos[1] + s[1]
					if (x - 1 < 0 || S.has(`${x - 1},${y}`)) move = false
				}
				if (move) pos[0] -= 1
			}
			let stop = false
			for (const s of stones[stone]) {
				const x = pos[0] + s[0]
				const y = pos[1] + s[1]
				if (S.has(`${x},${y - 1}`) || y === 0) {
					stop = true
					break
				}
			}

			if (stop) {
				for (const s of stones[stone]) {
					const x = pos[0] + s[0]
					const y = pos[1] + s[1]
					S.add(`${x},${y}`)
					highest[x] = Math.max(highest[x], y)
				}
				const str = `${i}|${stone}|${highest.map((h) => h - min).join("|")}`
				if (C[str] && !loopFound) {
					const m = Object.keys(C).findIndex((v) => v === str)
					const val = Object.values(C)
						.map((c) => [c[0], c[1]])
						.slice(m)
					const h = Math.max(...highest) - C[str][1]
					const dropped = val.length
					const loops = Math.floor((1000000000000 - stoneNr) / dropped)
					const remainder = 1000000000000 - (stoneNr - 1) - loops * dropped

					const lastPart = val[remainder][1] - val[0][1]
					result = h * loops + Math.max(...highest) + lastPart

					break loop
				}
				stoneNr += 1
				pos = (stoneNr - 1) % 5 === 1 ? [2, Math.max(...highest) + 5] : [2, Math.max(...highest) + 4]

				C[str] = [stoneNr, Math.max(...highest), [...pos]]
				continue
			}
			pos[1] -= 1
		}
	}
	return result
}

export const expectedResult = {
	debug: [3068, 1514285714288],
	input: [],
}
