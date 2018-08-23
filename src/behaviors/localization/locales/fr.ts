import { IPartialLocaleValues } from "./interfaces/values";

/**
 * locale : French (fr)
 * author : Ciara Ward : https://github.com/ciaraward
 */

const fr:IPartialLocaleValues = {
    datepicker: {
        months: [
            "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ],
        monthsShort: [
            "Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"
        ],
        weekdays: [
            "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"
        ],
        weekdaysShort: [
            "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"
        ],
        weekdaysNarrow: [
            "Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"
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
        placeholder: "Cherche...",
        noResults: {
            header: "Aucun Résultats",
            message: "Votre recherche n'a pas donné de résultats."
        }
    },
    select: {
        noResultsMessage: "Aucun résultats",
        single: {
            placeholder: "Choisissez-en un"
        },
        multi: {
            placeholder: "Choisissez-en...",
            maxSelectedMessage: "Max #{max} sélections",
            selectedMessage: "#{count} selections"
        }
    }
};

export default fr;
