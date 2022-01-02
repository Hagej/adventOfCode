from collections import defaultdict
import sys
import re


def parse(file):
    rows = [x.strip() for x in file]

    result = []
    for row in rows:
        speed, sprint, rest = re.findall("\d+", row)
        row = row.split()
        deer = row[0]
        result.append((deer, int(speed), int(sprint), int(rest)))
    return result


def solve(data):
    result_one, result_two = 0, 0

    D = defaultdict(lambda: (0, 0, 0, 0))

    for i in range(2503):
        for (deer, speed, sprint, rest) in data:
            (distance, sprintTime, restTime, score) = D[deer]
            if sprintTime == sprint:
                if restTime + 1 == rest:
                    D[deer] = (distance, 0, 0, score)
                else:
                    D[deer] = (distance, sprintTime, restTime + 1, score)
            else:
                D[deer] = (distance + speed, sprintTime + 1, restTime, score)
        maxDeer = []
        maxDist = 0
        for deer in data:
            if D[deer[0]][0] > maxDist:
                maxDeer = [deer[0]]
                maxDist = D[deer[0]][0]
            elif D[deer[0]][0] == maxDist:
                maxDeer.append(deer[0])
        for deer in maxDeer:
            (distance, sprintTime, restTime, score) = D[deer]
            D[deer] = (distance, sprintTime, restTime, score + 1)

    for deer in D.values():
        result_one = max(result_one, deer[0])
        result_two = max(result_two, deer[3])

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
