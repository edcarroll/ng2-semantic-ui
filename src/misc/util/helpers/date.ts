import { Util } from "./util";

export enum DatePrecision {
    Decade = 0,
    Year = 1,
    Month = 2,
    Date = 3,
    Hour = 4,
    Minute = 5
}

export const DateUtil = {
    startOf(precision:DatePrecision, date:Date, resetAll:boolean = false):Date {
        switch (precision) {
            case DatePrecision.Decade:
                const start = Math.floor(date.getFullYear() / 10) * 10 + 1;
                date.setFullYear(start);
                if (!resetAll) {
                    break;
                }
                // falls through
            case DatePrecision.Year:
                date.setMonth(0);
                if (!resetAll) {
                    break;
                }
                // falls through
            case DatePrecision.Month:
                date.setDate(1);
                if (!resetAll) {
                    break;
                }
                // falls through
            case DatePrecision.Date:
                date.setHours(0);
                if (!resetAll) {
                    break;
                }
                // falls through
            case DatePrecision.Hour:
                date.setMinutes(0);
                if (!resetAll) {
                    break;
                }
                // falls through
            case DatePrecision.Minute:
                date.setSeconds(0, 0);
        }

        return date;
    },

    endOf(precision:DatePrecision, date:Date):Date {
        switch (precision) {
            case DatePrecision.Year:
                date.setMonth(12, 0);
                // falls through
            case DatePrecision.Month:
                date.setMonth(date.getMonth() + 1, 0);
                // falls through
            case DatePrecision.Date:
                date.setHours(23, 59, 59, 999);
                break;
            case DatePrecision.Hour:
                date.setMinutes(59, 59, 999);
                break;
            case DatePrecision.Minute:
                date.setSeconds(59, 999);
                break;
        }

        return date;
    },

    equal(precision:DatePrecision, a:Date, b:Date):boolean {
        let equal = true;
        switch (precision) {
            case DatePrecision.Minute:
                equal = equal && a.getMinutes() === b.getMinutes();
                // falls through
            case DatePrecision.Hour:
                equal = equal && a.getHours() === b.getHours();
                // falls through
            case DatePrecision.Date:
                equal = equal && a.getDate() === b.getDate();
                // falls through
            case DatePrecision.Month:
                equal = equal && a.getMonth() === b.getMonth();
                // falls through
            case DatePrecision.Year:
                equal = equal && a.getFullYear() === b.getFullYear();
        }
        return equal;
    },

    next(precision:DatePrecision, date:Date):Date {
        return DateUtil.add(precision, date, 1);
    },

    add(precision:DatePrecision, date:Date, i:number):Date {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        switch (precision) {
            case DatePrecision.Decade:
                date.setFullYear(year + i * 10);
                if (date.getMonth() !== month) {
                    date.setDate(0);
                }
                break;
            case DatePrecision.Year:
                date.setFullYear(year + i);
                if (date.getMonth() !== month) {
                    date.setDate(0);
                }
                break;
            case DatePrecision.Month:
                date.setMonth(month + i);
                if (date.getMonth() !== Util.Math.mod(month + i, 12)) {
                    date.setDate(0);
                }
                break;
            case DatePrecision.Date:
                date.setDate(day + i);
                break;
            case DatePrecision.Hour:
                date.setHours(date.getHours() + i);
                break;
            case DatePrecision.Minute:
                date.setMinutes(date.getMinutes() + i);
                break;
        }
        return date;
    },

    previous(precision:DatePrecision, date:Date):Date {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        switch (precision) {
            case DatePrecision.Decade:
                date.setFullYear(year - 10);
                if (date.getMonth() !== month) {
                    date.setDate(0);
                }
                break;
            case DatePrecision.Year:
                date.setFullYear(year - 1);
                if (date.getMonth() !== month) {
                    date.setDate(0);
                }
                break;
            case DatePrecision.Month:
                date.setMonth(month - 1);
                if (date.getMonth() !== Util.Math.mod(month - 1, 12)) {
                    date.setDate(0);
                }
                break;
            case DatePrecision.Date:
                date.setDate(day - 1);
                break;
            case DatePrecision.Hour:
                const hours = date.getHours();
                date.setHours(hours - 1);
                if (date.getHours() !== Util.Math.mod(hours - 1, 24)) {
                    date.setHours(hours - 2);
                }
                break;
            case DatePrecision.Minute:
                const minutes = date.getMinutes();
                date.setMinutes(minutes - 1);
        }
        return date;
    },

    clone(date:Date):Date {
        return new Date(date.getTime());
    }
};
