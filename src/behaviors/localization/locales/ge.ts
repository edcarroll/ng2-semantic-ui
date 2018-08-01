import { IPartialLocaleValues } from "./interfaces/values";

/**
 * locale : Georgian (ge)
 * author : Vaso Gazdeliani : https://github.com/vaso991
 */

const ge:IPartialLocaleValues = {
    datepicker: {
        months: [
            "იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი",
            "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"
        ],
        monthsShort: [
            "იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოემ", "დეკ"
        ],
        weekdays: [
            "კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"
        ],
        weekdaysShort: [
            "კვ", "ორ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"
        ],
        weekdaysNarrow: [
            "კ", "ორ", "ს", "ოთ", "ხ", "პ", "შ"
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
        placeholder: "ძებნა...",
        noResults: {
            header: "მონაცემები არ მოიძებნა",
            message: "თქვენმა ძებნამ არ დააბრუნა შედეგი."
        }
    },
    select: {
        noResultsMessage: "მონაცემები არ მოიძებნა",
        single: {
            placeholder: "აირჩიე"
        },
        multi: {
            placeholder: "აირჩიე...",
            maxSelectedMessage: "მაქსიმუმ #{max}",
            selectedMessage: "არჩეულია #{count}"
        }
    }
};

export default ge;
