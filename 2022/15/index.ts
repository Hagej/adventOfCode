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
				.split("=")
				.slice(1)
				.map((a) => parseInt(a))
			return row
		})

	const A: [number, number][] = []
	for (const [sx, sy, bx, by] of rows) {
		const dx = Math.abs(bx - sx)
		const dy = Math.abs(by - sy)
		const dist = dx + dy
		if (2000000 >= sy - dist && 2000000 <= sy + dist) {
			const diff = Math.abs(2000000 - sy)
			A.push([sx - (dist - diff), sx + (dist - diff)])
		}
	}

	const sort = A.sort((a, b) => a[0] - b[0])
	if (sort.length > 0) {
		let span: [number, number] = [...sort[0]]
		const spans: [number, number][] = []
		for (let i = 1; i < sort.length; i++) {
			const [sx1, ex1] = span
			const [sx2, ex2] = sort[i]
			if (ex1 >= sx2 - 1) {
				span[1] = Math.max(ex1, ex2)
			} else {
				spans.push([...span])
				span = sort[i]
			}
		}
		spans.push([...span])
		result = spans.reduce((prev, s) => prev + (s[1] - s[0]), 0)
	}
	return result
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	let rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
				.split("=")
				.slice(1)
				.map((a) => parseInt(a))
			return row
		})

	const A = Array.from(Array(4000001), () => new Array<[number, number]>())

	for (const [sx, sy, bx, by] of rows) {
		const dx = Math.abs(bx - sx)
		const dy = Math.abs(by - sy)
		const dist = dx + dy
		for (let y = Math.max(sy - dist, 0); y <= Math.min(sy + dist, 4000000); y++) {
			const diff = Math.abs(y - sy)
			A[y].push([sx - (dist - diff), sx + (dist - diff)])
		}
	}

	loop: for (const [index, a] of A.entries()) {
		const sort = a.sort((a, b) => a[0] - b[0])
		const span: [number, number] = [...sort[0]]
		for (let i = 1; i < sort.length; i++) {
			const [sx1, ex1] = span
			const [sx2, ex2] = sort[i]
			if (ex1 >= sx2 - 1) {
				span[1] = Math.max(ex1, ex2)
			} else {
				result = (ex1 + 1) * 4000000 + index
				break loop
			}
		}
	}

	return result
}

export const expectedResult = {
	debug: [0, 56000011],
	input: [],
}
