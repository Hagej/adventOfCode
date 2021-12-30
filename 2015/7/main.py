import sys
from collections import defaultdict


def parse(file):
    rows = [x.strip() for x in file]
    result = []
    for r in rows:
        cmd, tar = r.split(" -> ")
        cmd = cmd.split()
        result.append((cmd, tar))
    return result


def runWires(data, second=False):
    for (cmd, tar) in data:
        if tar == "b" and second:
            D[tar] = second
            continue
        if len(cmd) == 1 and (cmd[0].isnumeric() or cmd[0] in D):
            D[tar] = int(cmd[0]) if cmd[0].isnumeric() else D[cmd[0]]
        elif len(cmd) == 2 and (cmd[1].isnumeric() or cmd[1] in D):
            D[tar] = int(cmd[1]) ^ 65535 if cmd[1].isnumeric() else D[cmd[1]] ^ 65535
        elif len(cmd) == 3:
            left = None
            right = None

            if cmd[1] == "AND":

                if cmd[0].isnumeric() or cmd[0] in D:
                    left = int(cmd[0]) if cmd[0].isnumeric() else D[cmd[0]]
                if cmd[2].isnumeric() or cmd[2] in D:
                    right = int(cmd[2]) if cmd[2].isnumeric() else D[cmd[2]]
                if not (left is None or right is None):
                    D[tar] = left & right

            elif cmd[1] == "OR":

                if cmd[0].isnumeric() or cmd[0] in D:
                    left = int(cmd[0]) if cmd[0].isnumeric() else D[cmd[0]]
                if cmd[2].isnumeric() or cmd[2] in D:
                    right = int(cmd[2]) if cmd[2].isnumeric() else D[cmd[2]]
                if not (left is None or right is None):
                    D[tar] = left | right

            elif cmd[1] == "LSHIFT" and cmd[0] in D:
                D[tar] = D[cmd[0]] * 2 ** int(cmd[2])
            elif cmd[1] == "RSHIFT" and cmd[0] in D:
                D[tar] = D[cmd[0]] // 2 ** int(cmd[2])


def solve(data):
    result_one, result_two = 0, 0

    global D
    D = dict()
    while "a" not in D:
        runWires(data)
    result_one = D["a"]
    D = {}
    print(D)
    while "a" not in D:
        runWires(data, result_one)
    result_two = D["a"]

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
