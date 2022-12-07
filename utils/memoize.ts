export function memoize<T>(fn: (n: any) => T) {
	let cache: Record<string, unknown> = {}
	return (...args) => {
		let n = args[0]
		if (cache[n]) {
			return cache[n]
		}
		let result = fn(n)
		cache[n] = result
		return result
	}
}
