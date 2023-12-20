import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const [flows, ratings] = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r
			return row
		})

	const F = flows.split("\n").reduce((prev, cur) => {
		const [id, rest] = cur.split("{")
		const conditions = rest
			.replace(/}/g, "")
			.split(",")
			.map((c) => c.split(":"))
		return { ...prev, [id]: conditions }
	}, {})

	const R: Record<"x" | "m" | "a" | "s", number>[] = ratings.split("\n").map((r) => {
		r = r.replace(/{|}/g, "")
		const props = r.split(",").map((p) => p.split("="))

		return props.reduce((prev, cur) => {
			return { ...prev, [cur[0]]: parseInt(cur[1]) }
		}, {} as Record<"x" | "m" | "a" | "s", number>)
	})

	for (const r of R) {
		if (check(F, r, "in")) {
			result += utils.sum(Object.values(r))
		}
	}

	return result
}

function check(flows: Record<string, string[][]>, r: Record<"x" | "m" | "a" | "s", number>, flow: string) {
	if (flow === "A") return true
	if (flow === "R") return false

	const f = flows[flow]
	const { x, m, a, s } = r
	for (const condition of f) {
		if (condition.length > 1) {
			if (new Function("x", "m", "a", "s", "return " + condition[0])(x, m, a, s)) {
				return check(flows, r, condition[1])
			}
			continue
		} else {
			return check(flows, r, condition[0])
		}
	}
}

export function two(inputFile: string) {
	throw new Error("Not implemented")
}

export const expectedResult = {
	debug: [19114],
	input: [],
}
