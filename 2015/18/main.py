import sys


def parse(file):
    rows = [x.strip() for x in file]
    result = []
    for r in rows:
        row = []
        for c in r:
            row.append(c == "#")

        result.append(row)
    return result


def solve(data):
    result_one, result_two = 0, 0

    dirs = [
        (-1, -1),
        (-1, 0),
        (-1, 1),
        (0, -1),
        (0, 1),
        (1, -1),
        (1, 0),
        (1, 1),
    ]
    corners = [(0, 0), (0, 99), (99, 0), (99, 99)]

    empty = [[False] * 100 for r in range(100)]
    cur_one = data
    cur_two = data
    for i in range(100):
        next = [x[:] for x in empty]
        c_next = [x[:] for x in empty]

        for y in range(100):
            for x in range(100):
                nbrs_one = 0
                nbrs_two = 0
                for dy, dx in dirs:
                    YY = y + dy
                    XX = x + dx
                    if YY < 0 or YY >= 100 or XX < 0 or XX >= 100:
                        continue
                    nbrs_one += cur_one[YY][XX]
                    nbrs_two += cur_two[YY][XX]
                if (cur_one[y][x] and nbrs_one in [2, 3]) or (
                    not cur_one[y][x] and nbrs_one == 3
                ):
                    next[y][x] = True
                if (cur_two[y][x] and nbrs_two in [2, 3]) or (
                    not cur_two[y][x] and nbrs_two == 3
                ):
                    c_next[y][x] = True
        cur_one = next
        cur_two = c_next
        for y, x in corners:
            cur_two[y][x] = True

    for i in range(100):
        result_one += sum(cur_one[i])
        result_two += sum(cur_two[i])

    return (result_one, result_two)


if __name__ == "__main__":
    infile = sys.argv[1] if len(sys.argv) > 1 else "input"
    with open(infile) as file:
        data = parse(file)
    (result_one, result_two) = solve(data)

    print(f"Part one: {result_one}")
    print(f"Part two: {result_two}")

    assert result_one == 768
    assert result_two == 781
