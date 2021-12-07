import sys

if __name__ == "__main__":
    result = 0
    with open(sys.argv[1], encoding="utf-8") as f:
        rows = [x.rstrip() for x in f]

    oxygen, water = rows, rows

    l = len(rows[0])
    for i in range(0, l):
        if len(oxygen) == 1:
            break
        values = [0, 0]
        for o in oxygen:
            values[int(o[i])] += 1
        if values[0] <= values[1]:
            oxygen = list(filter(lambda r: r[i] == "1", oxygen))
        else:
            oxygen = list(filter(lambda r: r[i] == "0", oxygen))

    for i in range(0, l):
        if len(water) == 1:
            break
        values = [0, 0]
        for w in water:
            values[int(w[i])] += 1
        if values[0] > values[1]:
            water = list(filter(lambda r: r[i] == "1", water))
        else:
            water = list(filter(lambda r: r[i] == "0", water))

    result = int(oxygen[0], 2) * int(water[0], 2)

    print(result)
