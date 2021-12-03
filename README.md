# Advent of Code

This repo contains my solutions for the coding challenge <a href="https://adventofcode.com">Advent of code</a> where one coding challenge is posted every morning until Christmas day. There is a separate folder for each year.

[2020](./2020/README.md) - Typescript

[2021](./2021/README.md) - Typescript (timed), Python

## Instructions

### Install

Make sure you have <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">node and npm</a> installed and then run

```
npm i
```

### Input

To get the input run:

```
bash fetch_input.sh -y YEAR -d DAY
```

All flags are optional. If nothing is entered, the current year and day will be used.

This script only works if there is a `.env` file in the repo root with an `AOC_SESSION_COOKIE=[your-aoc-session-cookie]` in it.

### Running

To run the code for any year and day run:

```
npm run build
```
