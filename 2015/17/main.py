import sys
from itertools import combinations


def parse(file):
    rows = [int(x.strip()) for x in file]
    return rows


def solve(data: list):
    result_one, result_two = 0, 0

    data.sort()
    s = 0
    maxAmount = 0
    while s < 150:
        s += data[maxAmount]
        maxAmount += 1

    least = len(data)
    for i in range(maxAmount - 1):
        c = combinations(data, i)
        for comb in c:
            if sum(comb) == 150:
                result_one += 1
                if least > i:
                    least = i
                if i == least:
                    result_two += 1

    return (result_one, result_two)


if __name__ == "__main__":
    infile = sys.argv[1] if len(sys.argv) > 1 else "input"
    with open(infile) as file:
        data = parse(file)
    (result_one, result_two) = solve(data)

    print(f"Part one: {result_one}")
    print(f"Part two: {result_two}")

    assert result_one == 1638
    assert result_two == 17
