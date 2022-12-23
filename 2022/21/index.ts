import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.reduce((prev, r) => {
			const row = r.split(" ")
			const name = row[0].replace(":", "")
			if (row.length > 2) {
				const first = row[1]
				const operation = row[2]
				const second = row[3]
				return { ...prev, [name]: [first, operation, second] }
			}
			return { ...prev, [name]: parseInt(row[1]) }
		}, {} as Record<string, number | string[]>)

	result = doJob("root", rows)

	return result
}

function doJob(name: string, monkeys: Record<string, number | string[]>) {
	const monkey = monkeys[name]
	if (!monkey) throw new Error(`No monkey with name ${name}`)
	if (typeof monkey === "number") return monkey

	if (monkey[1] === "+") {
		return doJob(monkey[0], monkeys) + doJob(monkey[2], monkeys)
	}

	if (monkey[1] === "-") {
		return doJob(monkey[0], monkeys) - doJob(monkey[2], monkeys)
	}

	if (monkey[1] === "*") {
		return doJob(monkey[0], monkeys) * doJob(monkey[2], monkeys)
	}

	if (monkey[1] === "/") {
		return doJob(monkey[0], monkeys) / doJob(monkey[2], monkeys)
	}
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.reduce((prev, r) => {
			const row = r.split(" ")
			const name = row[0].replace(":", "")
			if (row.length > 2) {
				const first = row[1]
				const operation = row[2]
				const second = row[3]
				return { ...prev, [name]: [first, operation, second] }
			}
			return { ...prev, [name]: parseInt(row[1]) }
		}, {} as Record<string, number | string[]>)

	let first = doJob(rows["root"][0], rows)
	let second = doJob(rows["root"][2], rows)

	const humn = rows["humn"]
	rows["humn"] = 1
	const first1 = doJob(rows["root"][0], rows)
	rows["humn"] = humn
	if (first1 != first) {
		let higher = true
		let X = 100000000000
		while (first !== second) {
			const diff = first - second
			rows["humn"] = higher ? (rows["humn"] as number) + X : (rows["humn"] as number) - X
			first = doJob(rows["root"][0], rows)
			if (Math.abs(first - second) > Math.abs(diff)) {
				higher = !higher
			}
			if ((diff > 0 && first - second < 0) || (diff < 0 && first - second > 0)) {
				higher = !higher
				X = Math.floor(X / 2)
			}
		}
	} else {
		let higher = true
		let X = 1000
		while (first !== second) {
			const diff = first - second
			rows["humn"] = higher ? (rows["humn"] as number) + X : (rows["humn"] as number) - X
			second = doJob(rows["root"][0], rows)
			if (Math.abs(first - second) > Math.abs(diff)) {
				higher = !higher
			}
			if ((diff > 0 && first - second < 0) || (diff < 0 && first - second > 0)) {
				higher = !higher
				X = Math.floor(X / 2)
			}
		}
	}

	result = rows["humn"] as number

	return result
}

export const expectedResult = {
	debug: [152, 301],
	input: [],
}
