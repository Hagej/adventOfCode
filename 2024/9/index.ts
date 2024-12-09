import * as utils from "@utils"
import fs from "fs"

type Block = { id: number | undefined, size: number }
export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("").map((s) => parseInt(s))


	const blocks: Block[] = []

	rows.map((r, index) => {
		if (index % 2 === 0) {
			blocks.push({ id: index / 2, size: r })
		} else {
			blocks.push({ id: undefined, size: r })
		}
	})


	let front = 1
	let end = blocks.length - 1

	while (front < end) {
		const e = blocks[end]
		const f = blocks[front]
		if (typeof f.id !== "undefined") {
			front += 1
			continue
		}
		if (typeof e.id !== "number") {
			end -= 1
			continue
		}

		if (e.size === f.size) {
			f.id = e.id
			e.id = undefined
			front += 1
			end -= 1
		} else if (e.size < f.size) {
			f.size -= e.size
			blocks.splice(front, 0, { id: e.id, size: e.size })
			e.id = undefined
			front += 1
			end -= 1
		} else {
			e.size -= f.size
			f.id = e.id
			front += 1
		}
	}

	result = calculateChecksum(blocks)

	return result
}

function calculateChecksum(blocks: Block[]) {
	let i = 0
	let result = 0
	for (const b of blocks) {
		for (let j = i; j < i + b.size; j++) {
			if (b.id === undefined) continue
			const s = b.id * j

			result += s
		}
		i += b.size

	}
	return result
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("").map((s) => parseInt(s))


	const blocks: Block[] = []

	rows.map((r, index) => {
		if (index % 2 === 0) {
			blocks.push({ id: index / 2, size: r })
		} else {
			blocks.push({ id: undefined, size: r })
		}
	})


	let end = blocks.length - 1

	while (end > 0) {
		const e = blocks[end]
		if (typeof e.id !== "number") {
			end -= 1
			continue
		}
		for (let i = 0; i < end; i++) {
			const f = blocks[i]
			if (typeof f.id !== "undefined") {
				continue
			}

			if (e.size === f.size) {
				f.id = e.id
				e.id = undefined
				break
			} else if (e.size < f.size) {
				f.size -= e.size
				blocks.splice(i, 0, { id: e.id, size: e.size })
				e.id = undefined
				break
			}
		}
		end -= 1

	}

	result = calculateChecksum(blocks)

	return result
}

export const expectedResult = {
	debug: [1928, 2858],
	input: [],
}
