import sys

if __name__ == "__main__":
    result = 0
    with open(sys.argv[1], encoding="utf-8") as f:
        rows = [x.rstrip() for x in f]

    amount = len(rows)
    gamma_rate, epsilon_rate = "", ""

    for i in range(0, len(rows[0])):
        sum = 0
        for r in rows:
            sum += int(r[i])

        gamma_rate += "1" if sum > amount / 2 else "0"
        epsilon_rate += "0" if sum > amount / 2 else "1"

    result = int(gamma_rate, 2) * int(epsilon_rate, 2)

    print(result)
