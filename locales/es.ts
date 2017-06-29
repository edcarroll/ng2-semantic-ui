import { IPartialLocaleValues } from "../src/localization/interfaces/values";

const es:IPartialLocaleValues = {
    datepicker: {
        months: [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ],
        monthsShort: [
            "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
        ],
        weekdays: [
            "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
        ],
        weekdaysShort: [
            "Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"
        ],
        weekdaysNarrow: [
            "D", "L", "M", "M", "J", "V", "S"
        ],
        firstDayOfWeek: 1,
        formats: {
            time: "HH:mm",
            datetime: "DD-MMM-YYYY HH:mm",
            date: "DD-MMM-YYYY",
            month: "MMMM YYYY",
            year: "YYYY"
        }
    }
};

export default es;
