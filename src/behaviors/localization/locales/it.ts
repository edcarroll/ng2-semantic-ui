import { IPartialLocaleValues } from "./interfaces/values";

/**
 * locale : Italian (it)
 * author : Massimo Costa : https://github.com/mcosta74
 */

const it:IPartialLocaleValues = {
    datepicker: {
        months: [
            "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
        ],
        monthsShort: [
            "Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"
        ],
        weekdays: [
            "Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"
        ],
        weekdaysShort: [
            "Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"
        ],
        weekdaysNarrow: [
            "D", "L", "M", "M", "G", "V", "S"
        ],
        formats: {
            time: "HH:mm",
            datetime: "D MMMM YYYY HH:mm",
            date: "D MMMM YYYY",
            month: "MMMM YYYY",
            year: "YYYY"
        },
        firstDayOfWeek: 1
    },
    search: {
        placeholder: "Cerca...",
        noResults: {
            header: "Nessun risultato",
            message: "La tua ricerca non ha trovato risultati."
        }
    },
    select: {
        noResultsMessage: "Nessun risultato",
        single: {
            placeholder: "Scegli uno"
        },
        multi: {
            placeholder: "Scegli...",
            maxSelectedMessage: "Puoi effettuare fino a #{max} scelte.",
            selectedMessage: "#{count} scelte"
        }
    }
};

export default it;
