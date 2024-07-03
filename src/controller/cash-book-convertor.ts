import { syncConvertCsvFileTojson } from "../utils/convert-csv-to-json";
import { ServesConverter } from "./seves_converter";


export class CashBookConvertor {
    dirPath: string;
    fileName: string;

    constructor(dirPath: string, fileName: string) {
        this.dirPath = dirPath;
        this.fileName = fileName;
    }

    getCsvFilePath() {
        return (this.dirPath + "/" + this.fileName);
    }

    getBookName(): string {
        let haifenIndex = this.fileName.indexOf("-");
        const bookName = this.fileName.slice(0, (haifenIndex - 2)).trim();
        return bookName;
    }

    async selectRows(): Promise<any[][]> {
        const csvFilePath = this.getCsvFilePath();
        const dataJson = await syncConvertCsvFileTojson(csvFilePath);
        const bookName = this.getBookName();
        const rows = []
        for (let row of dataJson) {
            const serves = new ServesConverter(row, bookName);
            rows.push(serves.values.slice());
        }
        return rows;
    }
}


