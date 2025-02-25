

function readCsvFromFile(filePath){

}

function fromCsvToJson(csv){
    // `name,surname,yob,gender
    //  lorenzo,puppo,1995,m
    //  hugo,martinez,1994,m
    //  sara,de prà,1989,f`
    const arrayOfStringRows = splitCsvInRows(csv);
    // ["name,surname,yob,gender",
    //  "lorenzo,puppo,1995,m",
    //  "hugo,martinez,1994,m",
    //  "sara,de prà,1989,f"]
    const arrayOfSplittedRows = splitRows(arrayOfStringRows);
    // [["name","surname","yob","gender"],
    // ["lorenzo","puppo","1995","m"],
    // ["hugo","martinez","1994","m"],
    // ["sara","de prà","1989","f"]]
    const keys = getKeysFromFirsLine(arrayOfSplittedRows);
    //["name","surname","yob","gender"]
    const values = getValues(arrayOfSplittedRows);
    // [["lorenzo","puppo","1995","m"],
    // ["hugo","martinez","1994","m"],
    // ["sara","de prà","1989","f"]]
    const arrayFromEntries = createArrayOfEntries(keys, values);
    // [
    //     {
    //         name: "lorenzo",
    //         surname: "puppo",
    //         yob: 1995,
    //         gender: 'm'
    //     },
    //     {
    //         name: "hugo",
    //         surname: "martinez",
    //         yob: 1994,
    //         gender: 'm'
    //     },
    //     {
    //         name: "sara",
    //         surname: "de pra",
    //         yob: 1989,
    //         gender: 'f'
    //     }
    // ]
    const json = convertArrayToJson(arrayFromEntries)
    // '[
    //     {
    //         "name": "lorenzo",
    //         "surname": "puppo",
    //         "yob": 1995,
    //         "gender": 'm'
    //     },
    //     {
    //         "name": "hugo",
    //         "surname": "martinez",
    //         "yob": 1994,
    //         "gender": 'm'
    //     },
    //     {
    //         "name": "sara",
    //         "surname": "de pra",
    //         "yob": 1989,
    //         "gender": 'f'
    //     }
    // ]'

    return json
}


function main(){

    const csvData = readCsvFromFile('./data/test1.csv');

    console.log(csvData);

    // const json = fromCsvToJson(csvData);

    // writeJsonToFile(filePath, json);
}

main()