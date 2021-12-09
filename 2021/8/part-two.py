import sys


def findValue(output: set, one, four):
    if len(output) == 2:
        return 1
    if len(output) == 3:
        return 7
    if len(output) == 4:
        return 4
    if len(output) == 7:
        return 8
    if len(output) == 5:
        if len(output.intersection(one)) == 2:
            return 3
        if len(output.intersection(four)) == 2:
            return 2
        return 5
    if len(output.intersection(one)) == 1:
        return 6
    if len(output.intersection(four)) == 4:
        return 9
    return 0


if __name__ == "__main__":
    with open(sys.argv[1], encoding="utf-8") as f:
        rows = [x for x in f]

    values = []
    for r in rows:
        split = r.strip().split(" | ")
        values.append([split[0].strip().split(" "), split[1].strip().split(" ")])

    result = 0
    for row in values:
        number = 0
        for output in row[1]:
            s = set(output)
            one = set(next(r for r in row[0] if len(r) == 2))
            four = set(next(r for r in row[0] if len(r) == 4))
            number = number * 10 + findValue(s, one, four)
        result += number

    print(result)
