BASE_PATH=$(pwd)

BLUE='\033[0;34m'
NC='\033[0m'

LANG='ts'
read -r YEAR DAY <<< "$(date +'%Y %-d')"
while getopts 'y:d:l:f:' arg; do
    case $arg in
        y)
            YEAR=${OPTARG}
            ;;
        d)
            DAY=${OPTARG}
            ;;
        l)
            LANG=${OPTARG}
            ;;
        f)
            FILE=${OPTARG}
    esac
done

run_with_input() {
    INPUT="${1:-input}"
    NAME="${2:-INPUT}"
    if [ -f "$INPUT" ]; then
        echo -e "RUNNING USING $NAME DATA\n"
        if [ "${LANG}" == "ts" ]; then
            result=$(node $FILE.js $INPUT)
        elif [ "${LANG}" == "py" ]; then
            result=$(python3 $FILE.py $INPUT)
        else 
            echo "Language ${LANG} not supported!"    
            exit 1
        fi
        echo -e "RESULT: ${BLUE}$result${NC}\n" 
    else 
        echo -e "NO $NAME DATA FOUND\n"
    fi
}

echo -e "Building and running in: $BASE_PATH/$YEAR/$DAY\n"
cd "$BASE_PATH/$YEAR/$DAY"

if [ -z ${FILE+x} ]; then
    if [ -f "part-two.$LANG" ]; then
        FILE="part-two"
    elif [ -f "part-one.$LANG" ]; then
        FILE="part-one"
    fi
fi

if [ "$LANG" == 'ts' ]; then 
    tsc --downlevelIteration --target=es2021 $FILE.ts
fi

run_with_input "debug" "DEBUG"

run_with_input 

cd "$BASE_PATH"
