export class DateUtils {
    public static get initialDate():Date {
        const d = new Date();

        d.setFullYear(0);
        this.startOfYear(d);

        return d;
    }

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

    public static clone(date:Date):Date {
        return new Date(date.toString());
    }
}
