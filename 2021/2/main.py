import sys

def parse(file):
    _rows = [x.strip().split() for x in file]
    rows = []
    for row in _rows:
        rows.append((row[0], int(row[1])))
    return rows

def solve(data):
    hp = 0
    vp = 0
    depth = 0

    for (i, a) in data:
        if(i == "forward"):
            hp += a
            depth += vp * a
        elif(i == "down"):
            vp += a
        elif(i == "up"):
            vp -= a

    return (hp * vp, hp * depth)


if __name__ == "__main__":
    infile = sys.argv[1] if len(sys.argv) > 1 else "input"
    with open(infile) as file:
        data = parse(file)

    (result_one, result_two) = solve(data)
    
    print(f"Part one: {result_one}")
    print(f"Part two: {result_two}")

    assert result_one == 2070300
    assert result_two == 2078985210
