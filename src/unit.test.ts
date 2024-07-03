import { AppConstants } from "./constant";
import { CashBookConvertor } from "./controller/cash-book-convertor";


async function unitTest() {
    const fileName = "MOHAMED 19-01-2023@CashBook_DugzKMNO.csv";
    const dirPath = AppConstants.uploadsPath();
    const cashBookInstance = new CashBookConvertor(dirPath, fileName);
    const rows = await cashBookInstance.selectRows();
    console.log(rows);
}



unitTest();