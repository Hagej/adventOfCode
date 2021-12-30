import sys


def parse(file):
    rows = [x for x in file]
    result = []
    for r in rows:
        l, w, h = r.split("x")
        result.append((int(l), int(w), int(h)))

    return result


def solve(data):
    result_one = 0
    result_two = 0

    for (l, w, h) in data:
        # Part one
        s1 = l * w
        s2 = w * h
        s3 = h * l
        result_one += 2 * s1 + 2 * s2 + 2 * s3 + min(s1, s2, s3)

        # Part two
        p = min(2 * l + 2 * w, 2 * w + 2 * h, 2 * h + 2 * l)
        result_two += p + l * w * h

    return (result_one, result_two)


if __name__ == "__main__":
    infile = sys.argv[1] if len(sys.argv) > 1 else "input"
    with open(infile) as file:
        data = parse(file)
    (result_one, result_two) = solve(data)

    print(f"Part one: {result_one}")
    print(f"Part two: {result_two}")

    assert result_one == 1588178
    assert result_two == 3783758
