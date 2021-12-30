import sys
import hashlib


def parse(file):
    rows = [x.strip() for x in file][0]
    return rows


def solve(data: str):
    result_one, result_two = 0, 0

    i = 0
    while True:
        val = data + str(i)
        hash = hashlib.md5(val.encode()).hexdigest()
        if result_one == 0 and hash.startswith("00000"):
            result_one = i
        if hash.startswith("000000"):
            result_two = i
            break
        i += 1

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
