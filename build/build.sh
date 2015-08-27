#!/usr/bin/env bash
enterTime=$(node -e 'console.log(Date.now())')

rm -rf ./output

# 1. scan *.ts
#printf "scan..."; start=$(node -e 'console.log(Date.now())')
find . -name "*.ts" -type f > ./ts-files.txt
#echo "$(($(node -e 'console.log(Date.now())')-start))"ms

# 2. tsc *.ts
#printf "tsc..."; start=$(node -e 'console.log(Date.now())')
tsc @./ts-files.txt -m amd -t es5 --sourceMap
#echo "$(($(node -e 'console.log(Date.now())')-start))"ms

# 3. fis
#printf "fis..."; start=$(node -e 'console.log(Date.now())')
fis3 release -r ./ -f ./build/fis-conf.js -d ./output
#echo "$(($(node -e 'console.log(Date.now())')-start))"ms

# 4. clear .js and .js.map from tsc
#printf "clear..."; start=$(node -e 'console.log(Date.now())')
sed 's/\.ts$/.js/' ts-files.txt | awk '{system("rm "$0)}'
sed 's/\.ts$/.js.map/' ts-files.txt | awk '{system("rm "$0)}'
rm ./ts-files.txt
#echo "$(($(node -e 'console.log(Date.now())')-start))"ms

echo ""
echo build time: "$(($(node -e 'console.log(Date.now())')-enterTime))"ms
