import clipboard from "clipboardy"
import { exit } from "process"
import yargs from "yargs-parser"

async function main() {
	const now = new Date()
	const raw = Bun.argv.slice(3)
	const args = yargs(raw)
	const day = args.d ?? now.getDate()
	const year = args.y ?? now.getFullYear()

	const path = `${year}/${day}`
	const file = args.f ?? "index.ts"
	const input = args.i
	let puzzle = await import(`./${path}/${file}`)
	console.log(`Running puzzle ${year} day ${day}!`)
	runPuzzle(puzzle, path, args._[0] ? (args._[0] as number) : 1, input)
}

async function runPuzzle(puzzle: any, path: string, part: number, input?: string) {
	if (input) {
		console.log(`Running with ${input} data`)
		const result = part === 2 ? await puzzle.two(`${path}/${input}`) : await puzzle.one(`${path}/${input}`)
		console.log(result)
		return
	}
	console.log("Running with debug data\n")
	try {
		var debugResult = part === 2 ? await puzzle.two(`${path}/debug`) : await puzzle.one(`${path}/debug`)
	} catch (e) {
		console.error(e)
		exit()
	}

	console.log(`#======  DEBUG  ======#\n`)
	console.log(debugResult)
	console.log("\n#=====================#\n")

	if (puzzle.expectedResult?.debug?.[part - 1] && puzzle.expectedResult.debug[part - 1] !== debugResult) {
		console.log(`Debug failed. Expected ${puzzle.expectedResult.debug[part - 1]}, got ${debugResult}`)
		return
	}

	console.log("Running with input data\n")
	try {
		var result = part === 2 ? await puzzle.two(`${path}/input`) : await puzzle.one(`${path}/input`)
	} catch (e) {
		console.error(e)
		exit()
	}
	console.log(`#======  RESULT  ======#\n`)
	console.log(result)
	console.log("\n#======================#")

	clipboard.writeSync(`${result}`)

	if (puzzle.expectedResult?.input?.[part - 1] && puzzle.expectedResult.input[part - 1] !== result) {
		console.log(`Run failed. Expected ${puzzle.expectedResult.debug[part - 1]}, got ${result}`)
		return
	}
}

await main()
