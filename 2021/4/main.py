import sys


import sys


def parse(file):
    groups = file.read().strip().split("\n\n")
    return groups


def solve(data):
    numbers, groups = [int(x) for x in data[0].split(",")], data[1:]
    boards = []
    for g in groups:
        rows = []
        for r in g.replace("  ", " ").split("\n"):
            values = []
            for v in r.strip().split(" "):
                values.append([int(v), False])
            rows.append(values)
        boards.append(rows)

    bingo = set()
    for n in numbers:
        for i in range(len(boards)):
            if i in bingo:
                continue
            for j in range(len(boards[i])):
                boards[i][j] = [[x[0], True] if x[0] == n else x for x in boards[i][j]]
            if find_bingo(boards[i]):
                bingo.add(i)
                if len(bingo) == 1:
                    result1 = calc_boardsum(boards[i]) * n
                elif len(bingo) == len(boards):
                    result2 = calc_boardsum(boards[i]) * n

    return (result1, result2)


def find_bingo(board):
    for i in range(0, 5):
        row = col = True
        for j in range(0, 5):
            row = row and board[i][j][1]
            col = col and board[j][i][1]
            if not row and not col:
                break
        else:
            return True
    return False


def calc_boardsum(board):
    boardsum = 0
    for r in board:
        boardsum += sum([x[0] for x in r if x[1] is not True])
    return boardsum


if __name__ == "__main__":
    infile = sys.argv[1] if len(sys.argv) > 1 else "input"
    with open(infile) as file:
        data = parse(file)
    (result_one, result_two) = solve(data)

    print(f"Part one: {result_one}")
    print(f"Part two: {result_two}")

    assert result_one == 41668
    assert result_two == 10478
