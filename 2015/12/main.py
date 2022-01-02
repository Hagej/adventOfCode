import sys
import json


def parse(file):
    rows = [x.strip() for x in file][0]
    return rows


def recSum(data, illegal=[]):
    if type(data) is int:
        return data
    if type(data) is list:
        sum = 0
        for item in data:
            sum += recSum(item, illegal)
        return sum
    if type(data) is dict:
        for item in data.values():
            if item in illegal:
                return 0
        sum = 0
        for item in data.values():
            sum += recSum(item, illegal)
        return sum
    return 0


def solve(data):
    result_one, result_two = 0, 0

    text = json.loads(data)

    result_one = recSum(text)
    result_two = recSum(text, illegal=["red"])

    return (result_one, result_two)


if __name__ == "__main__":
    infile = sys.argv[1] if len(sys.argv) > 1 else "input"
    with open(infile) as file:
        data = parse(file)
    (result_one, result_two) = solve(data)

    print(f"Part one: {result_one}")
    print(f"Part two: {result_two}")

    assert result_one == 156366
    assert result_two == 96852
