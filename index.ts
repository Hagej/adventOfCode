import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts"
import { parse } from "https://deno.land/std@0.117.0/flags/mod.ts"
import { debounce } from "https://deno.land/std/async/mod.ts"

async function main() {
	const args = parse(Deno.args)
	const now = new Date()
	const day = args["d"] ?? now.getDate()
	const year = args["y"] ?? now.getFullYear()

	const path = `${year}/${day}`
	const file = args["f"] ?? "index.ts"

	let puzzle = await import(`./${path}/${file}`)
	console.log(`Running puzzle ${year} day ${day}!`)
	runPuzzle(puzzle, path, args._[0] ? (args._[0] as number) : 1)
	if (args["w"]) {
		const watcher = Deno.watchFs(`./${path}/${file}`)
		let saves = 0
		const func = debounce(async () => {
			saves++
			puzzle = await import(`./${path}/${file}?i=${saves}`)
			runPuzzle(puzzle, path, args._[0] ? (args._[0] as number) : 1)
		}, 300)
		for await (const event of watcher) {
			func()
		}
	}
}

async function runPuzzle(puzzle: any, path: string, part: number) {
	const debugResult = part === 2 ? await puzzle.two(`${path}/debug`) : await puzzle.one(`${path}/debug`)

	console.log(`#======  DEBUG  ======#\n`)
	console.log(debugResult)
	console.log("\n#=====================#\n")

	if (puzzle.expectedResult?.debug?.[part - 1]) assertEquals(debugResult, puzzle.expectedResult?.debug?.[part - 1])

	const result = part === 2 ? await puzzle.two(`${path}/input`) : await puzzle.one(`${path}/input`)
	console.log(`#======  RESULT  ======#\n`)
	console.log(result)
	console.log("\n#======================#")

	if (puzzle.expectedResult?.input?.[part - 1]) assertEquals(result, puzzle.expectedResult?.input?.[part - 1])
}

await main()
