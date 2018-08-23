import { IPartialLocaleValues } from "./interfaces/values";

/**
 * locale : German (de)
 * author : Ciara Ward : https://github.com/ciaraward
 */

const de:IPartialLocaleValues = {
    datepicker: {
        months: [
            "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"
        ],
        monthsShort: [
            "Jan", "Febr", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"
        ],
        weekdays: [
            "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"
        ],
        weekdaysShort: [
            "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"
        ],
        weekdaysNarrow: [
            "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"
        ],
        formats: {
            time: "HH:mm",
            datetime: "D. MMMM YYYY HH:mm",
            date: "D. MMMM YYYY",
            month: "MMMM YYYY",
            year: "YYYY"
        },
        firstDayOfWeek: 1
    },
    search: {
        placeholder: "Suchen...",
        noResults: {
            header: "Keine Ergebnisse",
            message: "Ihre Suche ergab keine Ergebnisse."
        }
    },
    select: {
        noResultsMessage: "Keine Ergebnisse",
        single: {
            placeholder: "Eintrag auswählen..."
        },
        multi: {
            placeholder: "Einträge auswählen...",
            maxSelectedMessage: "Höchstens #{max} Einträge",
            selectedMessage: "#{count} Einträge ausgewählt"
        }
    }
};

export default de;
