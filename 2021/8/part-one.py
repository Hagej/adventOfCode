import sys

if __name__ == "__main__":
    with open(sys.argv[1], encoding="utf-8") as f:
        rows = [x for x in f]

    values = []
    for r in rows:
        split = r.strip().split(" | ")
        values.append([split[0].strip().split(" "), split[1].strip().split(" ")])

    result = 0
    for v in values:
        result += sum([1 for o in v[1] if len(o) in [2, 3, 4, 7]])

    print(result)
