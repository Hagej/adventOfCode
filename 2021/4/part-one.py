import sys


def find_bingo(board):
    rows = [0] * 5
    cols = [0] * 5
    for i in range(0, 5):
        for j in range(0, 5):
            if board[i][j][1]:
                rows[i] += 1
                cols[i] += 1
                if 5 in rows or 5 in cols:
                    return True
    return False


if __name__ == "__main__":
    with open(sys.argv[1], encoding="utf-8") as f:
        groups = f.read().strip().split("\n\n")

    numbers, groups = groups[0].split(","), groups[1:]
    numbers = [int(x) for x in numbers]

    boards = []
    for g in groups:
        rows = []
        for r in g.replace("  ", " ").split("\n"):
            values = []
            for v in r.strip().split(" "):

                values.append([int(v), False])
            rows.append(values)
        boards.append(rows)

    for n in numbers:
        for i in range(len(boards)):
            for j in range(len(boards[i])):
                boards[i][j] = [[x[0], True] if x[0] == n else x for x in boards[i][j]]
            if find_bingo(boards[i]):
                board_sum = 0
                for r in boards[i]:
                    board_sum += sum([x[0] for x in r if x[1] is not True])
                print(board_sum * n)
                exit()
