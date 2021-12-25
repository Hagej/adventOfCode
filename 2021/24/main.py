import sys

def parse(file):
    rows = [x for x in file]
    return rows

def solve(data):
    result = 0

    return result


if __name__ == "__main__":
    infile = sys.argv[1] if len(sys.argv) > 1 else "input"
    with open(infile) as file:
        data = parse(file)
    (result_one, result_two) = solve(data)
    
    print(f"Part one: {result_one}")
    print(f"Part two: {result_two}")

    assert result_one == 1
    assert result_two == 1
