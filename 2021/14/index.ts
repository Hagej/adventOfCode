import fs from "fs"

export function one(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8")
	let [template, data] = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r
			return row
		})

	const pairs: Array<[string, string]> = data.split("\n").map((p) => p.split(" -> ")) as Array<[string, string]>

	for (let i = 0; i < 10; i++) {
		const tuples = findPairs(template)
		for (const tuple of tuples) {
			const pair = pairs.find((p) => p[0] === tuple)
			if (!pair) continue
			template = insertValue(template, pair)
		}
	}

	const amounts: Record<string, number> = {}
	for (const char of template) {
		if (amounts[char]) {
			amounts[char]++
		} else {
			amounts[char] = 1
		}
	}

	let min = Infinity,
		max = 0
	for (const amount of Object.values(amounts)) {
		if (min > amount) min = amount
		if (max < amount) max = amount
	}

	return max - min
}

export function two(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8")
	const [template, data] = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r
			return row
		})

	const last = template[template.length - 1]

	const pairs: Array<[string, string]> = data.split("\n").map((p) => p.split(" -> ")) as Array<[string, string]>

	let templatePairs: Record<string, number> = findPairs(template).reduce(
		(prev, p) => ({ ...prev, [p]: prev[p] ? prev[p] + 1 : 1 }),
		{} as Record<string, number>,
	)
	const rulePairs: Record<string, string> = pairs.reduce(
		(prev, [pair, char]) => ({
			...prev,
			[pair]: [`${pair[0]}${char}`, `${char}${pair[1]}`],
		}),
		{},
	)

	for (let i = 0; i < 40; i++) {
		const newTemplate: Record<string, number> = Object.keys(rulePairs).reduce((prev, p) => ({ ...prev, [p]: 0 }), {})
		for (const [tuple, amount] of Object.entries(templatePairs)) {
			const [pairone, pairtwo] = rulePairs[tuple]
			newTemplate[pairone] += amount
			newTemplate[pairtwo] += amount
		}
		templatePairs = { ...newTemplate }
	}

	const amounts: Record<string, number> = {}
	for (const [tuple, amount] of Object.entries(templatePairs).filter((tp) => tp[1] > 0)) {
		if (amounts[tuple[0]]) {
			amounts[tuple[0]] += amount
		} else {
			amounts[tuple[0]] = amount
		}
	}
	amounts[last] += 1

	let min = Infinity,
		max = 0
	for (const amount of Object.values(amounts)) {
		if (min > amount) min = amount
		if (max < amount) max = amount
	}

	return max - min
}

function insertValue(template: string, pair: [string, string]) {
	const i = template.indexOf(pair[0])
	return `${template.substring(0, i + 1)}${pair[1]}${template.substr(i + 1, template.length - i + 1)}`
}

function findPairs(template: string) {
	const result = []
	for (let i = 0; i < template.length - 1; i++) {
		result.push(template.substr(i, 2))
	}
	return result
}

export const expectedResult = {
	debug: [1588, 2188189693529],
	input: [2768, 2914365137499],
}
