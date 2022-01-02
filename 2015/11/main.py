import sys


def parse(file):
    rows = [x.strip() for x in file][0]
    return rows


illegalChars = [105, 108, 111]


def sanitizeInput(text: str):
    for i, char in enumerate(text):
        charInt = ord(char)
        if charInt in illegalChars:
            end = "a" * (len(text) - i - 1)
            text = f"{text[0:i]}{chr(charInt + 1)}{end}"
            print(text)
            break
    return text


def incStr(text: str):
    for i in range(len(text) - 1, -1, -1):
        charInt = ord(text[i])
        charInt = (charInt - 97 + 1) % 26 + 97
        if charInt in illegalChars:
            charInt += 1
        text = f"{text[0:i]}{chr(charInt)}{text[i+1:]}"
        if charInt != 97:
            break

    return text


def solve(data):
    result_one, result_two = 0, 0

    data = sanitizeInput(data)

    while True:
        data = incStr(data)
        inARow = 1
        inARowMax = 0
        pairs = set()

        it = iter(data)
        next(it)

        i = 0
        while i < len(data) - 1:

            pair = f"{data[i]}{data[i + 1]}"
            if ord(pair[0]) == ord(pair[1]) - 1:
                inARow += 1
            else:
                inARowMax = max(inARowMax, inARow)
                inARow = 1
            if pair[0] == pair[1] and pair not in pairs:
                pairs.add(pair)
            if data == "ghjaabcc":
                print(inARow, inARowMax, pairs)
            i += 1

        if len(pairs) >= 2 and inARowMax >= 3:
            if result_one == 0:
                result_one = data
            else:
                result_two = data
                break

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
