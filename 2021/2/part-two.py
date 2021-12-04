import sys

if __name__ == "__main__":
    with open(sys.argv[1], encoding="utf-8") as f:
        _rows = [x.split() for x in f]
        rows = []
        for row in _rows:
            i, a = row[0], int(row[1])
            rows.append((i,a))
        
    hp = 0
    depth = 0
    aim = 0

    for row in rows:
        i, a = row[0], row[1]
        if(i == "forward"):
            hp += a
            depth += aim * a
        if(i == "down"):
            aim += a
        if(i == "up"):
            aim -= a

    result = hp * depth

    print(result)