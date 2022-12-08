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

	const trees = rows.map((r, index) => {
		return r.split("").map((t) => parseInt(t))
	})

	result += trees.length * 4 - 4

	for (let i = 1; i < trees.length - 1; i++) {
		for (let j = 1; j < trees.length - 1; j++) {
			if (isVisible(trees, i, j)) result++
		}
	}

	return result
}

function isVisible(trees, x, y) {
	const tree = trees[y][x]
	let tall = true
	for (let i = 0; i < x; i++) {
		if (trees[y][i] >= tree) tall = false
	}
	if (tall) return tall
	tall = true
	for (let i = 0; i < y; i++) {
		if (trees[i][x] >= tree) tall = false
	}
	if (tall) return tall
	tall = true
	for (let i = x + 1; i < trees.length; i++) {
		if (trees[y][i] >= tree) tall = false
	}
	if (tall) return tall
	tall = true
	for (let i = y + 1; i < trees.length; i++) {
		if (trees[i][x] >= tree) tall = false
	}
	if (tall) return tall
}

function getVD(trees, x, y) {
	const tree = trees[y][x]

	let vd = 1
	let tall = true
	for (let i = x - 1; i >= 0; i--) {
		if (trees[y][i] >= tree) {
			vd *= x - i
			tall = false
			break
		}
	}
	if (tall) vd *= x
	tall = true
	for (let i = y - 1; i >= 0; i--) {
		if (trees[i][x] >= tree) {
			vd *= y - i
			tall = false
			break
		}
	}
	if (tall) vd *= y
	tall = true
	for (let i = x + 1; i < trees.length; i++) {
		if (trees[y][i] >= tree) {
			vd *= i - x
			tall = false
			break
		}
	}

	if (tall) vd *= trees.length - 1 - x
	tall = true
	for (let i = y + 1; i < trees.length; i++) {
		if (trees[i][x] >= tree) {
			vd *= i - y
			tall = false
			break
		}
	}
	if (tall) vd *= trees.length - 1 - y

	return vd
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

	const trees = rows.map((r, index) => {
		return r.split("").map((t) => parseInt(t))
	})

	for (let i = 1; i < trees.length - 1; i++) {
		for (let j = 1; j < trees.length - 1; j++) {
			result = Math.max(result, getVD(trees, i, j))
		}
	}

	return result
}

export const expectedResult = {
	debug: [21, 8],
	input: [],
}
