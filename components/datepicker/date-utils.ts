export class DateUtils {
    public static startOfYear(date:Date):Date {
        this.startOfMonth(date);
        date.setMonth(0);

        return date;
    }

    public static startOfMonth(date:Date):Date {
        this.startOfDay(date);
        date.setDate(1);

        return date;
    }

    public static startOfDay(date:Date):Date {
        this.startOfHour(date);
        date.setHours(0);

        return date;
    }

    public static startOfHour(date:Date):Date {
        this.startOfMinute(date);
        date.setMinutes(0);

        return date;
    }

    public static startOfMinute(date:Date):Date {
        date.setMilliseconds(0);
        date.setSeconds(0);

        return date;
    }

    public static datesEqual(date1:Date, date2:Date):boolean {
        let equal = true;
        equal = equal && this.monthsEqual(date1, date2);
        equal = equal && date1.getDate() === date2.getDate();
        return equal;
    }

    public static monthsEqual(date1:Date, date2:Date):boolean {
        let equal = true;
        equal = equal && date1.getFullYear() === date2.getFullYear();
        equal = equal && date1.getMonth() === date2.getMonth();
        return equal;
    }

    public static timesEqual(date1:Date, date2:Date):boolean {
        let equal = true;
        equal = equal && this.datesEqual(date1, date2);
        equal = equal && date1.getHours() === date2.getHours();
        equal = equal && date1.getMinutes() === date2.getMinutes();
        equal = equal && date1.getSeconds() === date2.getSeconds();
        return equal;
    }

    public static clone(date:Date):Date {
        return new Date(date.toString());
    }
}
