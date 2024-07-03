import csvtojson from "csvtojson";


export function syncConvertCsvFileTojson(csvFilePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
        csvtojson().fromFile(csvFilePath).then((json) => {
            resolve(json);
        });
    });
}