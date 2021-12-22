from os import umask
import sys


def parse(file):
    rows = [x.strip() for x in file]
    return rows


vowel = {"a", "e", "i", "o", "u"}
naughtyPairs = {"ab", "cd", "pq", "xy"}


def solve(data):
    result1 = 0
    result2 = 0

    for row in data:
        l = len(row)
        hasDouble = False
        naughty = False
        vowels = 0
        for c in range(l):
            if c < l - 1:
                pair = f"{row[c]}{row[c + 1]}"
                if pair in naughtyPairs:
                    naughty = True
                    break
                if pair[0] == pair[1]:
                    hasDouble = True
            if row[c] in vowel:
                vowels += 1
        if not naughty and vowels >= 3 and hasDouble:
            result1 += 1

    for row in data:
        l = len(row)
        pairFound = False
        duplicateFound = False

        for c in range(l - 2):
            if not pairFound:
                pair = f"{row[c]}{row[c+1]}"
                for d in range(c + 2, l - 1):
                    pair2 = f"{row[d]}{row[d+1]}"
                    if pair == pair2:
                        pairFound = True
                        break
            if not duplicateFound and row[c] == row[c + 2]:
                duplicateFound = True
        if pairFound and duplicateFound:
            result2 += 1

    return (result1, result2)


if __name__ == "__main__":
    infile = sys.argv[1] if len(sys.argv) > 1 else "input"
    with open(infile) as file:
        data = parse(file)
    (result_one, result_two) = solve(data)

    print(f"Part one: {result_one}")
    print(f"Part two: {result_two}")

    assert result_one == 1
    assert result_two == 1
