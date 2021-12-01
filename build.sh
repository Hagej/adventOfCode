BASE_PATH=$(pwd)

BLUE='\033[0;34m'
NC='\033[0m'

LANG='ts'
read -r YEAR DAY <<< "$(date +'%Y %-d')"
while getopts 'y:d:l:' arg; do
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
    esac
done

run_with_input() {
    FILE="${1:-input.txt}"
    NAME="${2:-INPUT}"
    if [ -f "$FILE" ]; then
        echo -e "RUNNING USING $NAME DATA\n"
        if [ "${LANG}" == "ts" ]; then
            result=$(node index.js $FILE)
        elif [ "${LANG}" == "py" ]; then
            result=$(python3 main.py $FILE)
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

if [ "$LANG" == 'ts' ]; then 
    tsc index.ts 
fi

run_with_input "debug.txt" "DEBUG"

run_with_input 

cd "$BASE_PATH"
