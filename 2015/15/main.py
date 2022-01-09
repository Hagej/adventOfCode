import re
import sys


def parse(file):
    rows = [x.strip() for x in file]
    result = []
    for row in rows:
        name, line = row.split(":")
        capacity, durability, flavor, texture, calories = re.findall("\-?\d+", line)
        result.append(
            (
                name,
                int(capacity),
                int(durability),
                int(flavor),
                int(texture),
                int(calories),
            )
        )

    return result


def solve(data):
    result_one, result_two = 0, 0

    for x in range(101):
        for y in range(101 - x):
            for z in range(101 - x - y):
                w = 100 - x - y - z
                if x + y + z + w != 100:
                    continue

                capacity = max(
                    x * data[0][1] + y * data[1][1] + z * data[2][1] + w * data[3][1],
                    0,
                )
                durability = max(
                    x * data[0][2] + y * data[1][2] + z * data[2][2] + w * data[3][2],
                    0,
                )
                flavor = max(
                    x * data[0][3] + y * data[1][3] + z * data[2][3] + w * data[3][3],
                    0,
                )
                texture = max(
                    x * data[0][4] + y * data[1][4] + z * data[2][4] + w * data[3][4],
                    0,
                )

                calories = (
                    x * data[0][5] + y * data[1][5] + z * data[2][5] + w * data[3][5]
                )

                result_one = max(result_one, capacity * durability * flavor * texture)
                if calories == 500:
                    result_two = max(
                        result_two, capacity * durability * flavor * texture
                    )

    return (result_one, result_two)


if __name__ == "__main__":
    infile = sys.argv[1] if len(sys.argv) > 1 else "input"
    with open(infile) as file:
        data = parse(file)
    (result_one, result_two) = solve(data)

    print(f"Part one: {result_one}")
    print(f"Part two: {result_two}")

    assert result_one == 13882464
    assert result_two == 11171160
