import sys
from collections import defaultdict
from itertools import permutations


def parse(file):
    rows = [x.strip() for x in file]

    result = defaultdict(lambda: {})
    for row in rows:
        cities, dist = row.split(" = ")
        fr, to = cities.split(" to ")
        result[fr][to] = int(dist)
        result[to][fr] = int(dist)
    return result


def solve(data):
    result_one, result_two = sys.maxsize, 0

    perms = list(permutations(data.keys()))
    for perm in perms:
        dist = 0
        for i in range(len(perm) - 1):
            dist += data[perm[i]][perm[i + 1]]
        result_one = min(result_one, dist)
        result_two = max(result_two, dist)

    return (result_one, result_two)


if __name__ == "__main__":
    infile = sys.argv[1] if len(sys.argv) > 1 else "input"
    with open(infile) as file:
        data = parse(file)
    (result_one, result_two) = solve(data)

    print(f"Part one: {result_one}")
    print(f"Part two: {result_two}")

    assert result_one == 1
    assert result_two == 1
