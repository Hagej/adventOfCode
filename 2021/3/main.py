import sys


def parse(file):
    rows = [x.strip() for x in file]
    return rows


def solve(data):

    amount = len(data)
    gamma_rate, epsilon_rate = "", ""

    l = len(data[0])
    for i in range(l):
        sum = 0
        for r in data:
            sum += int(r[i])

        gamma_rate += "1" if sum > amount / 2 else "0"
        epsilon_rate += "0" if sum > amount / 2 else "1"

    result1 = int(gamma_rate, 2) * int(epsilon_rate, 2)

    oxygen, water = data, data

    for i in range(l):
        if len(oxygen) == 1:
            break
        values = [0, 0]
        for o in oxygen:
            values[int(o[i])] += 1
        if values[0] <= values[1]:
            oxygen = list(filter(lambda r: r[i] == "1", oxygen))
        else:
            oxygen = list(filter(lambda r: r[i] == "0", oxygen))

    for i in range(l):
        if len(water) == 1:
            break
        values = [0, 0]
        for w in water:
            values[int(w[i])] += 1
        if values[0] > values[1]:
            water = list(filter(lambda r: r[i] == "1", water))
        else:
            water = list(filter(lambda r: r[i] == "0", water))

    result2 = int(oxygen[0], 2) * int(water[0], 2)

    return (result1, result2)


if __name__ == "__main__":
    infile = sys.argv[1] if len(sys.argv) > 1 else "input"
    with open(infile) as file:
        data = parse(file)

    (result_one, result_two) = solve(data)

    print(f"Part one: {result_one}")
    print(f"Part two: {result_two}")

    assert result_one == 2595824
    assert result_two == 2135254
