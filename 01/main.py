import sys

if __name__ == "__main__":
    with open(sys.argv[1], encoding="utf-8") as f:
        rows = [int(x) for x in f]

    result = 0

    prev = sys.maxsize
    for r in range(0, len(rows) - 2):
        cur = rows[r] + rows[r + 1] + rows[r + 2]
        if cur > prev:
            result += 1
        prev = cur

    print(result)
