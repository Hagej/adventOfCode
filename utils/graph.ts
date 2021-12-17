export class Graph {
	adjList: Array<{ from: string; to: string; weight: number }> = []

	constructor(values?: Array<{ from: string; to: string; weight: number }>) {
		if (values) {
			this.adjList = [...values]
		}
	}

	addEdge(from: string, to: string, weight: number) {
		this.adjList.push({ from, to, weight })
	}

	getChildren(value: string): { node: string; weight: number }[] {
		return this.adjList.filter((a) => a.from === value).map((a) => ({ node: a.to, weight: a.weight }))
	}

	getParents(value: string): { node: string; weight: number }[] {
		return this.adjList.filter((a) => a.to === value).map((a) => ({ node: a.from, weight: a.weight }))
	}

	getConnectedNodes(value: string): { node: string; weight: number }[] {
		return this.adjList.filter((a) => a.to === value || a.from === value).map((a) => ({ node: a.to === value ? a.from : a.to, weight: a.weight }))
	}
}
