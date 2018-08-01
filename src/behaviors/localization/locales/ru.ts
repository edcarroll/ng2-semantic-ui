import { IPartialLocaleValues } from "./interfaces/values";

/**
 * locale : Russian (ru)
 * author : Maksim Moiseikin : https://github.com/maksim-m
 */

const ru:IPartialLocaleValues = {
    datepicker: {
        months: [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ],
        monthsShort: [
            "Янв", "Февр", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Ноя", "Дек"
        ],
        weekdays: [
            "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"
        ],
        weekdaysShort: [
            "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
        ],
        weekdaysNarrow: [
            "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
        ],
        formats: {
            time: "HH:mm",
            datetime: "DD.MM.YYYY HH:mm",
            date: "DD.MM.YYYY",
            month: "MMMM YYYY",
            year: "YYYY"
        },
        firstDayOfWeek: 1
    },
    search: {
        placeholder: "Поиск...",
        noResults: {
            header: "Нет результатов",
            message: "Поиск не дал результатов."
        }
    },
    select: {
        noResultsMessage: "Нет результатов",
        single: {
            placeholder: "Выберите одно значение"
        },
        multi: {
            placeholder: "Выберите...",
            maxSelectedMessage: "Не более #{max} значений",
            selectedMessage: "#{count} selections"
        }
    }
};

export default ru;
