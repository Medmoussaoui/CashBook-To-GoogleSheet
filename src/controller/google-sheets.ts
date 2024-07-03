import { Compute, GoogleAuth } from "google-auth-library";
import { JSONClient } from "google-auth-library/build/src/auth/googleauth";
import { google, sheets_v4 } from "googleapis";
import { AppendDataOpions } from "../module/apped-data-options";


export class GoogleSheetsApi {
    auth: GoogleAuth<JSONClient>;

    constructor() {
        this.auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets"
        });
    }

    async getClient(): Promise<JSONClient | Compute> {
        return await this.auth.getClient();
    }

    async getGoogleSheetsInstance(): Promise<sheets_v4.Sheets> {
        const client = await this.getClient();
        return google.sheets({ version: "v4", auth: client });
    }

    async append(params: AppendDataOpions): Promise<string> {
        try {
            const googleSheets = await this.getGoogleSheetsInstance();
            googleSheets.spreadsheets.values.append({
                auth: this.auth,
                spreadsheetId: params.spreadsheetId,
                range: params.range,
                valueInputOption: "USER_ENTERED",
                requestBody: { values: params.values }
            });
            return "DONE";
        } catch (err) {
            return "ERROR";
        }
    }
}
