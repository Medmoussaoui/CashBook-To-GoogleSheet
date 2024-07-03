import path from "path";

export class AppConstants {
    static uploadsPath = () => path.join(__dirname, "uploads")
}