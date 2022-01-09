import sys


def parse(file):
    rows = [x.strip().replace(":", "").replace(",", "") for x in file]

    return rows


def solve(data):

    result_one, result_two = 0, 0

    input = {
        "children": 3,
        "cats": 7,
        "samoyeds": 2,
        "pomeranians": 3,
        "akitas": 0,
        "vizslas": 0,
        "goldfish": 5,
        "trees": 3,
        "cars": 2,
        "perfumes": 1,
    }

    greater = ["cats", "trees"]
    lesser = ["pomeranians", "goldfish"]

    for row in data:
        row = row.split()
        sue = int(row[1])
        result = True
        for i in range(1, 4):
            if input[row[i * 2]] != int(row[i * 2 + 1]):
                result = False
                break

        if result:
            result_one = sue

        result = True
        for i in range(1, 4):
            label = row[i * 2]
            if label in greater:
                if input[label] >= int(row[i * 2 + 1]):
                    result = False
                    break
            elif label in lesser:
                if input[label] <= int(row[i * 2 + 1]):
                    result = False
                    break
            elif input[row[i * 2]] != int(row[i * 2 + 1]):
                result = False
                break
        if result:
            result_two = sue

    return (result_one, result_two)


if __name__ == "__main__":
    infile = sys.argv[1] if len(sys.argv) > 1 else "input"
    with open(infile) as file:
        data = parse(file)
    (result_one, result_two) = solve(data)

    print(f"Part one: {result_one}")
    print(f"Part two: {result_two}")

    assert result_one == 213
    assert result_two == 323
