# Advent of Code

This repo contains my solutions for the coding challenge
<a href="https://adventofcode.com">Advent of code</a> where one coding challenge
is posted every morning until Christmas day. There is a separate folder for each
year.

[2020](./2020/README.md) - Typescript

[2021](./2021/README.md) - Typescript (timed), Python

> **Update 2021-12-13**
>
> As an experiment i've started converting to run everything in
> <a href="https://https://deno.land/">Deno</a> instead!

[2022](./2022/README.md) - Typescript (timed)

## Instructions

### Dependencies

Make sure you have
<a href="https://bun.sh/">Bun</a> installed. That's it!

### Input

To get the input run:

```
bash fetch_input.sh -y YEAR -d DAY
```

All flags are optional. If nothing is entered, the current year and day will be
used.

This script only works if there is a `.env` file in the repo root with an
`AOC_SESSION_COOKIE=[your-aoc-session-cookie]` in it.

### Running

To run the code for any year and day run:

```
bun run index.ts -y YEAR -d DAY PART
```

`PART` decides wether to run part one or two. One is default
