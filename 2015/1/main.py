import sys


def parse(file):
    rows = [x for x in file][0]
    return rows


def solve(data):
    result_two = None
    floor = 0
    for i, char in enumerate(data):
        if char == "(":
            floor += 1
        elif char == ")":
            floor -= 1
            if result_two == None and floor == -1:
                result_two = i + 1

    result_one = floor
    return (result_one, result_two)


if __name__ == "__main__":
    infile = sys.argv[1] if len(sys.argv) > 1 else "input"
    with open(infile) as file:
        data = parse(file)
    (result_one, result_two) = solve(data)

    print(f"Part one: {result_one}")
    print(f"Part two: {result_two}")

    assert result_one == 138
    assert result_two == 1771
