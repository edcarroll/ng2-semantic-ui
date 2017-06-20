export interface IDateUtil {
    startOfYear(date:Date):Date;
    startOfMonth(date:Date):Date;
    startOfDay(date:Date):Date;
    startOfHour(date:Date):Date;
    startOfMinute(date:Date):Date;
    minutesEqual(date1:Date, date2:Date):boolean;
    hoursEqual(date1:Date, date2:Date):boolean;
    datesEqual(date1:Date, date2:Date):boolean;
    monthsEqual(date1:Date, date2:Date):boolean;
    yearsEqual(date1:Date, date2:Date):boolean;
    clone(date:Date):Date;
}

export const DateUtil:IDateUtil = {
    startOfYear(date:Date):Date {
        DateUtil.startOfMonth(date);
        date.setMonth(0);

        return date;
    },
    startOfMonth(date:Date):Date {
        DateUtil.startOfDay(date);
        date.setDate(1);

        return date;
    },
    startOfDay(date:Date):Date {
        DateUtil.startOfHour(date);
        date.setHours(0);

        return date;
    },
    startOfHour(date:Date):Date {
        DateUtil.startOfMinute(date);
        date.setMinutes(0);

        return date;
    },
    startOfMinute(date:Date):Date {
        date.setMilliseconds(0);
        date.setSeconds(0);

        return date;
    },

    minutesEqual(date1:Date, date2:Date):boolean {
        let equal = true;
        equal = equal && DateUtil.hoursEqual(date1, date2);
        equal = equal && date1.getMinutes() === date2.getMinutes();
        return equal;
    },
    hoursEqual(date1:Date, date2:Date):boolean {
        let equal = true;
        equal = equal && DateUtil.datesEqual(date1, date2);
        equal = equal && date1.getHours() === date2.getHours();
        return equal;
    },
    datesEqual(date1:Date, date2:Date):boolean {
        let equal = true;
        equal = equal && DateUtil.monthsEqual(date1, date2);
        equal = equal && date1.getDate() === date2.getDate();
        return equal;
    },
    monthsEqual(date1:Date, date2:Date):boolean {
        let equal = true;
        equal = equal && DateUtil.yearsEqual(date1, date2);
        equal = equal && date1.getMonth() === date2.getMonth();
        return equal;
    },
    yearsEqual(date1:Date, date2:Date):boolean {
        let equal = true;
        equal = equal && date1.getFullYear() === date2.getFullYear();
        return equal;
    },

    clone(date:Date):Date {
        return new Date(date.toString());
    }
};
