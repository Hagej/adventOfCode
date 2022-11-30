export * from "./array-compare"
export * from "./array-maths"
export * from "./combine"
export * from "./graph"

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
