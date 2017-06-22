export enum DatePrecision {
    Year,
    Month,
    Date,
    Hour,
    Minute
}

export const DateUtil = {
    startOf(precision:DatePrecision, date:Date, resetAll:boolean = false):Date {
        switch (precision) {
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
                date.setHours(24, 0, 0, 0);
                break;
            case DatePrecision.Hour:
                date.setMinutes(60, 0, 0);
                break;
            case DatePrecision.Minute:
                date.setSeconds(60, 0);
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

    clone(date:Date):Date {
        return new Date(date.getTime());
    },

    rewriteTimezone(date:Date):Date {
        date.setTime(date.getTime() - new Date().getTimezoneOffset() * 60000);
        return date;
    }
};
