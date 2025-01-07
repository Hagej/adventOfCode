import * as utils from "@utils"
import { V4MAPPED } from "dns"
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

	const nodes = new Set<string>()

	const G = new utils.Graph(rows.map((r) => {
		const [a, b] = r.split("-")
		nodes.add(a)
		nodes.add(b)
		return ({ from: a, to: b, weight: 1 })
	}))

	for (const node of nodes) {
		const PQ = new utils.PriorityQueue<{ node: string, path: string[] }>()

		PQ.enqueue({ node, path: [] }, 0)
		while (!PQ.isEmpty()) {
			const { element, priority } = PQ.dequeue()
			if (priority === 3) {
				if (element.node === node && element.path.some((s) => s.startsWith("t"))) {
					result += 1
				}
				continue
			}

			const nb = G.getConnectedNodes(element.node)
			for (const n of nb) {
				PQ.enqueue({ node: n.node, path: [...element.path, n.node] }, priority + 1)
			}
		}
	}

	return result / 6
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
	const nodes = new Set<string>()
	const nodeMap: Record<string, string[]> = {}
	rows.map((r) => {
		const [a, b] = r.split("-")
		nodes.add(a)
		nodes.add(b)
		if (nodeMap[a]) {
			nodeMap[a] = [...nodeMap[a], b]
		} else {
			nodeMap[a] = [b]
		}
		if (nodeMap[b]) {
			nodeMap[b] = [...nodeMap[b], a]
		} else {
			nodeMap[b] = [a]
		}

	})

	console.log(nodes.size)

	// const mat = []

	// for (const node of nodes) {
	// 	const row = []
	// 	for (const n of nodes) {
	// 		row.push(node === n || nodeMap[node].includes(n) ? 1 : 0)
	// 	}
	// 	mat.push(row)
	// }

	// utils.logImage(mat)
	// console.log(nodes)


	// const G = new utils.Graph(rows.map((r) => {
	// 	const [a, b] = r.split("-")
	// 	nodes.add(a)
	// 	nodes.add(b)
	// 	return ({ from: a, to: b, weight: 1 })
	// }))

	let largest = 0
	let LAN = []


	const V = new Set<string>()
	const clusters = []

	for (const node of nodes) {





		// const PQ = new utils.PriorityQueue<{ node: string, path: string[] }>()

		// PQ.enqueue({ node, path: [] }, 0)
		// const V = new Set<string>()
		// while (!PQ.isEmpty()) {
		// 	const { element, priority } = PQ.dequeue()

		// 	if (element.node === node && priority > 0) {
		// 		if (priority > largest) {
		// 			console.log(element.path)
		// 			largest = priority
		// 			LAN = element.path
		// 		}
		// 		continue
		// 	}

		// 	const nb = G.getConnectedNodes(element.node)
		// 	for (const n of nb) {
		// 		console.log(V)
		// 		console.log(LAN)
		// 		if (V.has(`${element.node}-${n.node}`)) continue
		// 		V.add(`${element.node}-${n.node}`)
		// 		PQ.enqueue({ node: n.node, path: [...element.path, n.node] }, priority + 1)
		// 	}
		// }
	}

	const password = LAN.sort().join(",")

	return password
}

export const expectedResult = {
	debug: [7,],
	input: [],
}
