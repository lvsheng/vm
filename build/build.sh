#!/usr/bin/env bash
rm -rf ./output

#mkdir output
#find . -name "*.ts" -type f > ./ts-files.txt
#tsc @./ts-files.txt -m amd -t es5 --sourceMap
#rm ./ts-files.txt

fis3 release -r ./ -f ./build/fis-conf.js -d ./output
