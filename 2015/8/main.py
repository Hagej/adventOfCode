import sys


def parse(file):
    rows = [x.strip() for x in file]
    return rows


def solve(data):
    result_one, result_two = 0, 0

    for row in data:
        result_one += len(row) - len(eval(row))
        result_two += len(repr(row).replace('"', '\\"')) - len(row)

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
