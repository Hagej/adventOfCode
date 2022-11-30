# echo "bash fetch_input.sh" | at 06:00
if [ -f .env ]; then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

read -r YEAR DAY <<< "$(date +'%Y %-d')"
while getopts 'y:d:l:' arg; do
    case $arg in
        y)
            YEAR=${OPTARG}
            ;;
        d)
            DAY=${OPTARG}
            ;;
    esac
done
URL="https://adventofcode.com/${YEAR}/day/${DAY}/input"
DIR="${YEAR}/${DAY}"
FILE="${DIR}/input"
echo "$YEAR $DAY"

mkdir -p "${YEAR}/${DAY}"
curl "${URL}" -H "cookie: session=${AOC_SESSION_COOKIE}" -o "${FILE}" -v

cp -a frame/. "${YEAR}/${DAY}"