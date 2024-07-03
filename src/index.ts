import express from "express";
import { AddDataController } from "./controller/add-data-to-google-sheets-controller";

const app = express();

// Write rows into spreedSheet
const constroller = new AddDataController();
app.post('/', (req, res) => constroller.post(req, res));



app.listen(8000, () => console.log("Server lisening on port 4000 ..."));