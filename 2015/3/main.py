import sys


def parse(file):
    row = [x for x in file][0]
    return row


def solve(data):
    result_one, result_two = 0, 0

    dirs = {"<": (-1, 0), "v": (0, 1), "^": (0, -1), ">": (1, 0)}

    x, y = 0, 0
    visited = {(0, 0)}

    for char in data:
        dir = dirs[char]
        x += dir[0]
        y += dir[1]
        visited.add((x, y))

    result_one = len(visited)
    sx, sy = 0, 0
    rx, ry = 0, 0
    visited = {(0, 0)}

    santasTurn = True
    for char in data:
        dir = dirs[char]
        if santasTurn:
            sx += dir[0]
            sy += dir[1]
            visited.add((sx, sy))
        else:
            rx += dir[0]
            ry += dir[1]
            visited.add((rx, ry))

        santasTurn = not santasTurn

    result_two = len(visited)

    return (result_one, result_two)


if __name__ == "__main__":
    infile = sys.argv[1] if len(sys.argv) > 1 else "input"
    with open(infile) as file:
        data = parse(file)
    (result_one, result_two) = solve(data)

    print(f"Part one: {result_one}")
    print(f"Part two: {result_two}")

    assert result_one == 2081
    assert result_two == 2341
