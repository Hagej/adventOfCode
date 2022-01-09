import sys
from collections import defaultdict
import random


def parse(file):
    rows, molecule = file.read().strip().split("\n\n")

    mapping = defaultdict(lambda: set())

    for row in rows.split("\n"):
        fr, to = row.split(" => ")
        mapping[fr].add(to)

    return [mapping, molecule]


def solve(data: list):
    result_one, result_two = 0, 0

    mapping, molecule = data
    molecules = set()
    i = 0
    while i < len(molecule):
        if molecule[i] in mapping:
            for mol in mapping[molecule[i]]:
                newMolecule = f"{molecule[0:i]}{mol}{molecule[i+1:]}"
                molecules.add(newMolecule)
            i += 1
            continue

        pair = f"{molecule[i]}{molecule[i+1]}"
        if pair in mapping:
            for mol in mapping[pair]:
                newMolecule = f"{molecule[0:i]}{mol}{molecule[i+2:]}"
                molecules.add(newMolecule)
            i += 1
        i += 1
    result_one = len(molecules)

    rev_mapping = []

    for key, values in mapping.items():
        for val in values:
            rev_mapping.append((val, key))

    rev_mapping.sort(key=lambda x: len(x[0]))
    rev_mapping.reverse()
    mol = molecule

    count = 0
    while mol != "e":
        replaced = False

        for lhs, rhs in rev_mapping:
            if lhs in mol:
                replaced = True
                mol = mol.replace(lhs, rhs, 1)
                count += 1
                break
        if not replaced:
            mol = molecule
            random.shuffle(rev_mapping)
            count = 0
    result_two = count

    return (result_one, result_two)


if __name__ == "__main__":
    infile = sys.argv[1] if len(sys.argv) > 1 else "input"
    with open(infile) as file:
        data = parse(file)
    (result_one, result_two) = solve(data)

    print(f"Part one: {result_one}")
    print(f"Part two: {result_two}")

    assert result_one == 576
    assert result_two == 207
