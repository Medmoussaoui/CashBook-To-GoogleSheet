import { Request, Response } from "express";
import { AppConstants } from "../constant";
import { readFilesSync } from "../utils/read-files";
import { CashBookConvertor } from "../controller/cash-book-convertor";
import { GoogleSheetsApi } from "./google-sheets";
import { unlink } from "fs/promises";

export class AddDataController {

    noFileFounds(res: Response): void {
        res.status(404).send("No file found")
    }

    async getRowsData(files: string[], dirPath: string): Promise<any[]> {
        let allRows = [];
        for (let file of files) {
            const cashBook = new CashBookConvertor(dirPath, file);
            const rows = await cashBook.selectRows();
            allRows.push(...rows.slice());
        }
        return allRows;
    }

    async removeFiles(files: string[]): Promise<any[]> {
        let uploadsPath = AppConstants.uploadsPath();
        let deletedFiles = [];
        for (let file of files) {
            try {
                await unlink(uploadsPath + "/" + file);
                deletedFiles.push({ file: file, success: true });
            } catch (err) {
                deletedFiles.push({ file: file, success: false });
            }
        }
        return deletedFiles;
    }

    async successAddDataToGoogleSheets(res: Response, files: string[]) {
        const status = await this.removeFiles(files);
        res.send({
            "addDataStatus": "DONE",
            "remove-Files": status
        });
    }

    async post(req: Request, res: Response) {

        const spreadsheetId = "1hIiyuJzr9EWB8_EVZhRzlFfIyhVAwGzy-nqaqlvev14";
        const dirPath = AppConstants.uploadsPath();
        const files = await readFilesSync(dirPath);

        if (files.length == 0) {
            return this.noFileFounds(res);
        }

        let rows = await this.getRowsData(files, dirPath);
        
        let spreadSheets = new GoogleSheetsApi();
        const result = await spreadSheets.append({
            range: "11/30/2022!B:H",
            spreadsheetId: spreadsheetId,
            values: rows,
        });

        if (result == "DONE") {
            return this.successAddDataToGoogleSheets(res, files);
        }

        res.send({ "addDataStatus": result });
    }
}0