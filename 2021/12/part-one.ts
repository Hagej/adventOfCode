import { readFileSync } from "fs"
import { Graph } from "../../utils"

async function main() {
	const file = readFileSync(process.argv[2], "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})
		.map((r) => r.split("-"))

	const G = new Graph(rows.map((r) => ({ from: r[0], to: r[1], weight: 0 })))

	const paths = []
	findPath(G, "start", ["start"], paths)
	console.log(paths.length)
}

function findPath(g: Graph, node: string, curPath: string[], paths: string[][]) {
	const nodes = g.getConnectedNodes(node)
	for (const n of nodes) {
		const isCapital = n.node[0] === n.node[0].toUpperCase()
		if (isCapital || !curPath.includes(n.node)) {
			if (n.node === "end") {
				paths.push([...curPath, "end"])
			} else {
				findPath(g, n.node, [...curPath, n.node], paths)
			}
		}
	}
}

main()
