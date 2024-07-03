import { readdir } from "fs";

export async function readFilesSync(direPath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        readdir(direPath, (err, files) => {
            if (err) return reject(Promise.reject(err));
            return resolve(files);
        });
    });
}