
const fs = require('fs');

function readJsonFromFile(filePath){
    const json = fs.readFileSync(filePath, 'utf8');
    return json;
}

function fromJsonToCsv(json){

    // '[
    //     {
    //         "name": "lorenzo",
    //         "surname": "puppo",
    //         "yob": "1995",
    //         "gender": "m"
    //     },
    //     {
    //         "name": "hugo",
    //         "surname": "martinez",
    //         "yob": "1994",
    //         "gender": "m"
    //     },
    //     {
    //         "name": "sara",
    //         "surname": "de prà",
    //         "yob": "1989",
    //         "gender": "f"
    //     }
    // ]'

    const array = convertJsonToJs(json);

    // [
    //     {
    //         name: "lorenzo",
    //         surname: "puppo",
    //         yob: "1995",
    //         gender: "m"
    //     },
    //     {
    //         name: "hugo",
    //         surname: "martinez",
    //         yob: "1994",
    //         gender: "m"
    //     },
    //     {
    //         name: "sara",
    //         surname: "de prà",
    //         yob: "1989",
    //         gender: "f"
    //     }
    // ]

    const keys = getKeysFromFirstObject(array);

    // ["name", "surname", "yob", "gender"]

    const values = getValuesFromFirstObject(array);

    // [["lorenzo","puppo","1995","m"],
    //  ["hugo","martinez","1994","m"],
    //  ["sara","de prà","1989","f"]]

    const csv = createCsv(keys, values);

    // name,surname,yob,gender
    // lorenzo,puppo,1995,m
    // hugo,martinez,1994,m
    // sara,de prà,1989,f
    
    return csv;
}

function writeCsvToFile(filePath, content){
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
    const jsonData = readJsonFromFile(originPath);

    const csv = fromJsonToCsv(jsonData);

    console.log(csv);
    const destinationPath = getDestinationPath()
    writeCsvToFile(destinationPath, json);
}

main()