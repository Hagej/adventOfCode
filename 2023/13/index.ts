import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r
			return row
		})

	rows.map((r, index) => {
		const lines = r.split("\n")

		let h
		let v
		for (let i = 0; i < lines.length - 1; i++) {
			if (lines[i] === lines[i + 1]) {
				h = h || check_horizontal(i, lines)
			}
		}
		for (let i = 0; i < lines[0].length - 1; i++) {
			let same = true
			for (let j = 0; j < lines.length; j++) {
				if (lines[j][i] !== lines[j][i + 1]) {
					same = false
				}
			}
			if (same) {
				v = v || check_vertical(i, lines)
			}
		}

		if (h && v) console.error(index, lines, h, v)

		result += (h ?? 0) * 100
		result += v ?? 0
	})

	return result
}

function check_horizontal(index: number, lines: string[]) {
	let l = index + 1
	for (let i = index; i >= 0; i--) {
		if (lines[i] !== lines[l]) {
			return
		}
		l += 1
		if (l > lines.length - 1) {
			return index + 1
		}
	}
	return index + 1
}

function check_vertical(index: number, lines: string[]) {
	let l = index + 1
	for (let i = index; i >= 0; i--) {
		for (let j = 0; j < lines.length; j++) {
			if (lines[j][i] !== lines[j][l]) {
				return
			}
		}
		l += 1
		if (l >= lines[0].length) {
			return index + 1
		}
	}
	return index + 1
}

function diff_vertical(index: number, lines: string[]) {
	let diff = []
	let l = index + 1
	for (let i = index; i >= 0 && l < lines[0].length; i--) {
		for (let j = 0; j < lines.length; j++) {
			if (index === 18) {
				console.log(lines[j][i], lines[j][l])
			}
			if (lines[j][i] !== lines[j][l]) {
				diff.push([j, i])
			}
		}
		l += 1
	}
	return diff
}

function diff_horizontal(index: number, lines: string[]) {
	let diff = []
	let l = index + 1
	for (let i = index; i >= 0 && l < lines.length; i--) {
		for (let j = 0; j < lines[0].length; j++) {
			if (lines[i][j] !== lines[l][j]) {
				diff.push([i, j])
			}
		}
		l += 1
	}
	return diff
}

function swap(x: number, y: number, lines: string[]) {
	const cur = lines[y][x]
	if (cur === "#") {
		lines[y] = lines[y]
			.slice(0, x)
			.concat(".")
			.concat(lines[y].slice(x + 1))
	} else {
		lines[y] = lines[y]
			.slice(0, x)
			.concat("#")
			.concat(lines[y].slice(x + 1))
	}
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r
			return row
		})

	rows.map((r, index) => {
		const lines = r.split("\n")

		let hDiff, vDiff
		let v, h
		for (let i = 0; i < lines[0].length; i++) {
			const diff = diff_vertical(i, lines)
			if (diff.length === 1) {
				vDiff = diff
				v = i + 1
			}
		}
		for (let i = 0; i < lines.length; i++) {
			const diff = diff_horizontal(i, lines)
			if (diff.length === 1) {
				hDiff = diff
				h = (i + 1) * 100
			}
		}

		if (hDiff && vDiff) console.error(hDiff, vDiff, lines)

		if (hDiff) {
			swap(hDiff[0][1], hDiff[0][0], lines)
		}
		if (vDiff) {
			swap(vDiff[0][1], vDiff[0][0], lines)
		}

		if (!h && !v) console.error(index, lines)
		if (h && v) console.error(index, lines, h, v)

		result += h ?? 0
		result += v ?? 0
	})

	return result
}

export const expectedResult = {
	debug: [405, 400],
	input: [],
}
