import sys

def parse(file):
    rows = [int(x) for x in file]
    return rows

def solve(data):
    result1 = 0
    result2 = 0
    prev1 = sys.maxsize
    prev2 = sys.maxsize
    for r in range(len(data)):
        if(r < len(data)-2):
            cur2 = data[r] + data[r + 1] + data[r + 2]
            if(cur2 > prev2):
                result2 += 1
            prev2 = cur2    
        
        if data[r] > prev1:
            result1 += 1
        prev1 = data[r]
    return (result1, result2)

if __name__ == "__main__":
    infile = sys.argv[1] if len(sys.argv) > 1 else "input"
    with open(infile) as file:
        data = parse(file)
    (result_one, result_two) = solve(data)
    
    print(f"Part one: {result_one}")
    print(f"Part two: {result_two}")

    assert result_one == 1139
    assert result_two == 1103
    
