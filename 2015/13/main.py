import re
import sys
from collections import defaultdict
from itertools import permutations


def parse(file):
    rows = [x.strip().replace("lose ", "-").replace(".", "") for x in file]

    result = defaultdict(lambda: {})
    for row in rows:
        happiness = re.findall("\-?\d+", row)[0]
        rows = row.split()
        fr = rows[0]
        to = rows[-1]
        result[fr][to] = int(happiness)
    return result


def solve(data):
    result_one, result_two = 0, 0

    perms = permutations(data.keys())

    for perm in perms:
        happiness = 0
        for i in range(-1, len(perm) - 1):
            L = perm[i]
            R = perm[i + 1]
            happiness += data[R][L]
            happiness += data[L][R]
        result_one = max(result_one, happiness)

    data["you"] = {}
    for key in data.keys():
        data[key]["you"] = 0
        data["you"][key] = 0

    perms = permutations(data.keys())

    for perm in perms:
        happiness = 0
        for i in range(-1, len(perm) - 1):
            L = perm[i]
            R = perm[i + 1]
            happiness += data[R][L]
            happiness += data[L][R]
        result_two = max(result_two, happiness)

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
