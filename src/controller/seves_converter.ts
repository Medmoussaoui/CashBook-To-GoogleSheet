import { ServesModule } from "../module/Serves-Module";

export class ServesConverter {
    private serves: any;
    bookName: string;
    servesModule: ServesModule = {};
    values: any[] = [];

    constructor(serves: any, bookName: string) {
        this.serves = serves
        this.bookName = bookName;
        this.initialServesModule();
        this.initialValues();
    }

    private setCustomer(): string {
        if (this.bookName == this.bookName.toUpperCase()) {
            return this.bookName;
        }
        return "";
    }

    private setPrice(): number {
        const cashOut = parseInt(this.serves["Cash Out"]);
        const cashIn = parseInt(this.serves["Cash In"]);
        if (cashOut.toString() != "NaN") return cashOut;
        if (cashIn.toString() != "NaN") return cashIn;
        return 0;
    }

    private setMerchandise(): string {
        if (this.serves["Cash Out"] != "") return "Paye";
        return this.serves["Category"];
    }

    private setNote(): string {
        const remark = (this.serves["Remark"] as string);
        if (this.bookName != this.bookName.toUpperCase()) {
            return remark;
        }

        let markIndex = remark.indexOf("?");
        if (markIndex >= 0) {
            return remark.slice((markIndex + 1), remark.length).trim();
        }

        let bracketIndex = remark.indexOf("(");
        let endIndex = remark.indexOf(")");

        if (bracketIndex >= 0) {
            endIndex = (endIndex == -1) ? remark.length : endIndex;
            return remark.slice((bracketIndex + 1), endIndex).trim();
        }
        return "";
    }

    private extractBoatNameFromRemarkFaild(): string {
        const remark = (this.serves["Remark"] as string);

        let markIndex = remark.indexOf("?");
        if (markIndex >= 0) {
            return remark.slice(0, (markIndex - 1)).trim();
        }

        let bracketIndex = remark.indexOf("(");
        if (bracketIndex >= 0) {
            return remark.slice(0, (bracketIndex - 1)).trim();
        }
        return remark;
    }

    private setBoatName(): string {
        if (this.bookName == this.bookName.toUpperCase()) {
            return this.extractBoatNameFromRemarkFaild();
        }
        return this.bookName;
    }

    private initialServesModule(): void {
        this.servesModule = {
            customer: this.setCustomer(),
            boatName: this.setBoatName(),
            merchandise: this.setMerchandise(),
            price: this.setPrice(),
            Paye: "",
            note: this.setNote(),
            date: this.serves["Date"]
        };
    }

    private initialValues(): void {
        this.values = [
            this.servesModule.customer,
            this.servesModule.boatName,
            this.servesModule.merchandise,
            this.servesModule.price,
            this.servesModule.Paye,
            this.servesModule.note,
            this.servesModule.date,
        ]
    }
}