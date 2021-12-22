export * from "./array-compare.ts"
export * from "./array-maths.ts"
export * from "./combine.ts"
export * from "./graph.ts"

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
