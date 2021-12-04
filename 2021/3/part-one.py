import sys

if __name__ == "__main__":
    result = 0
    with open(sys.argv[1], encoding="utf-8") as f:
        rows = [x for x in f]
        
    print(result)