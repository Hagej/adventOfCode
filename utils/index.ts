export * from "./array-compare"
export * from "./array-maths"
export * from "./combine"
export * from "./graph"
export * from "./memoize"
export * from "./priority-queue"

export function logImage(output: string[][]) {
	console.log("-".repeat(output[0].length))
	for (const row of output) {
		let r = ""
		for (const char of row) {
			r = `${r}${char}`
		}
		console.log(r)
	}
	console.log("-".repeat(output[0].length))
}

export function zip(a: Array<any>, b: Array<any>) {
	const pairs = []
	for (let i = 0; i < Math.min(a.length, b.length); i++) {
		pairs.push([a[i], b[i]])
	}
	return pairs
}
