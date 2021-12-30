from io import TextIOWrapper
import sys


def parse(file: TextIOWrapper):
    result = []
    rows = [x.replace("turn ", "").replace("through ", "") for x in file]

    for r in rows:
        inst, fr, to = r.split(" ")
        fx, fy = fr.split(",")
        tx, ty = to.split(",")

        result.append((inst, (int(fx), int(fy)), (int(tx), int(ty))))
    return result


def solve(data):
    result_one, result_two = 0, 0

    grid = [[0] * 1000 for r in range(1000)]

    for (inst, fr, to) in data:
        if inst == "on":
            val = 1
        if inst == "off":
            val = 0
        for y in range(fr[1], to[1] + 1):
            for x in range(fr[0], to[0] + 1):
                if inst == "toggle":
                    grid[y][x] = (grid[y][x] + 1) % 2
                else:
                    grid[y][x] = val
    for row in grid:
        result_one += sum(row)

    grid = [[0] * 1000 for r in range(1000)]

    for (inst, fr, to) in data:
        if inst == "on":
            val = 1
        elif inst == "off":
            val = -1
        elif inst == "toggle":
            val = 2
        for y in range(fr[1], to[1] + 1):
            for x in range(fr[0], to[0] + 1):
                grid[y][x] = max(grid[y][x] + val, 0)
    for row in grid:
        result_two += sum(row)

    return (result_one, result_two)


if __name__ == "__main__":
    infile = sys.argv[1] if len(sys.argv) > 1 else "input"
    with open(infile) as file:
        data = parse(file)
    (result_one, result_two) = solve(data)

    print(f"Part one: {result_one}")
    print(f"Part two: {result_two}")

    assert result_one == 543903
    assert result_two == 14687245
