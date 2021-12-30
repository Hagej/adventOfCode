import sys


def parse(file):
    rows = [x.strip() for x in file][0]
    return rows


def solve(data):
    result_one, result_two = 0, 0

    cur = data
    for x in range(50):
        next = ""
        for i, char in enumerate(cur):
            if i == 0:
                c = int(char)
                count = 1
            elif char == cur[i - 1]:
                count += 1
            else:
                next += f"{count}{c}"
                count = 1
                c = int(char)

        cur = f"{next}{count}{c}"
        if x == 39:
            result_one = len(cur)

    result_two = len(cur)

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
