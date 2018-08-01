import { IPartialLocaleValues } from "./interfaces/values";

/**
 * locale : Hebrew (he)
 * author : David limkys : https://github.com/gotenxds
 */

const he:IPartialLocaleValues = {
    datepicker: {
        months: [
            "ינואר", "פבואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
        ],
        monthsShort: [
            "ינו", "פבו", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ"
        ],
        weekdays: [
            "ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"
        ],
        weekdaysShort: [
            "ראש", "שני", "שלי", "רבי", "חמי", "שיש", "שבת"
        ],
        weekdaysNarrow: [
            "ר", "ש", "ש", "ר", "ח", "ש", "ש"
        ],
        formats: {
            time: "HH:mm",
            datetime: "D MMMM YYYY HH:mm",
            date: "D MMMM YYYY",
            month: "MMMM YYYY",
            year: "YYYY"
        },
        firstDayOfWeek: 0
    },
    search: {
        placeholder: "חפש...",
        noResults: {
            header: "אין תוצאות",
            message: "החיפוש שלך לא אחזיר תוצאות."
        }
    },
    select: {
        noResultsMessage: "אין תוצאות",
        single: {
            placeholder: "בחר אחד"
        },
        multi: {
            placeholder: "בחר...",
            maxSelectedMessage: "מקסימום #{max} אפשרויות",
            selectedMessage: "#{count} selections"
        }
    }
};

export default he;
