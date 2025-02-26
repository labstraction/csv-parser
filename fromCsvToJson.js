
const fs = require('fs');

function readCsvFromFile(filePath){
    const csv = fs.readFileSync(filePath, 'utf8');
    return csv;
}

function splitCsvInRows(csv){
    const splittedCsv = csv.split(/\r?\n/);
    return splittedCsv;
}

function splitRows(arrayOfString){
    const splittedRowsArray = [];
    for (const row of arrayOfString) {
        const splittedRow = row.split(',')
        splittedRowsArray.push(splittedRow)
    }
    return splittedRowsArray;
}

function getKeysFromFirsLine(arrayOfSplittedLines){
    const keys = arrayOfSplittedLines[0];
    return keys;
}

function getValues(arrayOfSplittedLines){
    const values = arrayOfSplittedLines.slice(1)
    return values;
}

function createEntry(keys, valueArray){
    const entry = {};

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = valueArray[i]

        entry[key] = value
    }

    return entry;
}

function createArrayOfEntries(keys, values){

    const arrayOfEntries = [];

    for (let i = 0; i < values.length; i++) {
        const valueArray = values[i];
        
        const entry = createEntry(keys, valueArray);

        arrayOfEntries.push(entry);
    }

    return arrayOfEntries;
}

function convertArrayToJson(array){
    const json = JSON.stringify(array);
    return json;
}

function fromCsvToJson(csv){

    const arrayOfStringRows = splitCsvInRows(csv);
    // ["name,surname,yob,gender",
    //  "lorenzo,puppo,1995,m",
    //  "hugo,martinez,1994,m",
    //  "sara,de prà,1989,f"]
    const arrayOfSplittedRows = splitRows(arrayOfStringRows);
    // // [["name","surname","yob","gender"],
    // // ["lorenzo","puppo","1995","m"],
    // // ["hugo","martinez","1994","m"],
    // // ["sara","de prà","1989","f"]]
    const keys = getKeysFromFirsLine(arrayOfSplittedRows);
    // //["name","surname","yob","gender"]
    const values = getValues(arrayOfSplittedRows);
    // // [["lorenzo","puppo","1995","m"],
    // // ["hugo","martinez","1994","m"],
    // // ["sara","de prà","1989","f"]]
    const arrayFromEntries = createArrayOfEntries(keys, values);
    // // [
    // //     {
    // //         name: "lorenzo",
    // //         surname: "puppo",
    // //         yob: 1995,
    // //         gender: 'm'
    // //     },
    // //     {
    // //         name: "hugo",
    // //         surname: "martinez",
    // //         yob: 1994,
    // //         gender: 'm'
    // //     },
    // //     {
    // //         name: "sara",
    // //         surname: "de pra",
    // //         yob: 1989,
    // //         gender: 'f'
    // //     }
    // // ]
    const json = convertArrayToJson(arrayFromEntries)
    // // '[
    // //     {
    // //         "name": "lorenzo",
    // //         "surname": "puppo",
    // //         "yob": 1995,
    // //         "gender": 'm'
    // //     },
    // //     {
    // //         "name": "hugo",
    // //         "surname": "martinez",
    // //         "yob": 1994,
    // //         "gender": 'm'
    // //     },
    // //     {
    // //         "name": "sara",
    // //         "surname": "de pra",
    // //         "yob": 1989,
    // //         "gender": 'f'
    // //     }
    // // ]'
    
    return json
}

function writeJsonToFile(filePath, content){
    fs.writeFileSync(filePath, content)
}

function getOriginPath() {
    const firstArg = process.argv[2]
    const secondArg = process.argv[3]

    if (!firstArg) {
        console.log('per fare funzionare la funzione devi inserire un arg per origine e destinazione')
        process.exit(1)
    }

    if (!secondArg) {
        console.log('manca la destinazione dove salvare il file ')
        process.exit(1)
    }
    return firstArg
}

function getDestinationPath(){
    return process.argv[3]
}

function main(){

    const originPath = getOriginPath()

    const csvData = readCsvFromFile(originPath);

    // const csvData = readCsvFromFile('./data/test2.csv');

    const json = fromCsvToJson(csvData);

    console.log(json);

    const destinationPath = getDestinationPath()
    writeJsonToFile(destinationPath, json);

    // writeJsonToFile('./output/test2.json', json);
}

main()