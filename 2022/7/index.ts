import * as utils from "@utils"
import fs from "fs"

let curPath = ""
let curDir = ""
let structure: Record<string, string[]> = {}
let sizes: Record<string, number> = {}

export function one(inputFile: string) {
	init()
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	for (const row of rows) {
		if (row.startsWith("$")) {
			if (row.startsWith("$ ls")) {
			} else {
				parseCmd(row)
			}
		} else {
			if (!structure[curPath]) structure[curPath] = []
			structure[curPath].push(row)
		}
	}

	calcSize("/", structure["/"])

	Object.values(sizes).map((s) => (s <= 100000 ? (result += s) : null))

	return result
}

function init() {
	sizes = {}
	structure = {}
	curDir = ""
	curPath = ""
}

function calcSize(path: string, input: string[]): number {
	if (sizes[path]) return sizes[path]
	let size = 0
	for (const row of input) {
		const parts = row.split(" ")
		if (parts[0] !== "dir") {
			size += parseInt(parts[0])
		} else {
			const p = path.endsWith("/") ? path + parts[1] : path + "/" + parts[1]
			size += calcSize(p, structure[p])
		}
	}
	sizes[path] = size
	return size
}

function parseCmd(input: string) {
	const parts = input.split(" ")
	if (parts[1] === "cd") {
		if (parts[2] === "..") {
			curPath = curPath.slice(0, curPath.length - curDir.length - 1)
			if (curPath.length === 0) {
				curPath = "/"
				curDir = "/"
				return
			}
			curDir = curPath.split("/")[curPath.split("/").length - 1]
		} else if (parts[2] === "/") {
			curPath = "/"
			curDir = "/"
		} else {
			curPath += curPath.endsWith("/") ? parts[2] : "/" + parts[2]
			curDir = parts[2]
		}
	}
}

export function two(inputFile: string) {
	init()
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	for (const row of rows) {
		if (row.startsWith("$")) {
			if (row.startsWith("$ ls")) {
			} else {
				parseCmd(row)
			}
		} else {
			if (!structure[curPath]) structure[curPath] = []
			structure[curPath].push(row)
		}
	}

	calcSize("/", structure["/"])

	const max = 70000000
	const needed = 30000000
	const total = sizes["/"]
	const unused = max - total
	const remove = needed - unused

	const values = Object.values(sizes).sort((a, b) => a - b)
	for (const val of values) {
		if (val > remove) {
			result = val
			break
		}
	}

	return result
}

export const expectedResult = {
	debug: [95437, 24933642],
	input: [],
}
