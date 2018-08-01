import { IPartialLocaleValues } from "./interfaces/values";

/**
 * locale : Dutch (nl)
 * author : Martijn Melchers : https://github.com/martijnmelchers
 */

const nl:IPartialLocaleValues = {
    datepicker: {
        months: [
            "Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"
        ],
        monthsShort: [
            "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"
        ],
        weekdays: [
            "Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"
        ],
        weekdaysShort: [
            "Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"
        ],
        weekdaysNarrow: [
            "Z", "M", "D", "W", "D", "V", "Z"
        ],
		/* Dutch does not have a translation for am/pm */
        timesOfDay: [
            "a.m.", "p.m."
        ],
        timesOfDayUppercase: [
            "AM", "PM"
        ],
        timesOfDayLowercase: [
            "am", "pm"
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
        placeholder: "Zoeken...",
        noResults: {
            header: "Geen resultaten",
            message: "Er zijn geen resultaten gevonden."
        }
    },
    select: {
        noResultsMessage: "Geen resultation",
        single: {
            placeholder: "Selecteer een"
        },
        multi: {
            placeholder: "Selecteren...",
            maxSelectedMessage: "Max #{max} selecteren",
            selectedMessage: "#{count} geselecteerd"
        }
    }
};

export default nl;
