import { IPartialLocaleValues } from "./interfaces/values";

/**
 * locale : Portuguese (pt)
 * author : Fernando Niwes : https://github.com/fniwes
 */

const pt:IPartialLocaleValues = {
    datepicker: {
        months: [
            "janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ],
        monthsShort: [
            "jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"
        ],
        weekdays: [
            "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
        ],
        weekdaysShort: [
            "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"
        ],
        weekdaysNarrow: [
            "D", "1", "2", "3", "4", "5", "S"
        ],
        formats: {
            time: "HH:mm",
            datetime: "D MMMM [de] YYYY HH:mm",
            date: "D [de] MMMM [de] YYYY",
            month: "MMMM [de] YYYY",
            year: "YYYY"
        },
        firstDayOfWeek: 1
    },
    search: {
        placeholder: "Pesquisar...",
        noResults: {
            header: "Sem resultados",
            message: "Sua pesquisa não retornou resultados."
        }
    },
    select: {
        noResultsMessage: "Sem resultados",
        single: {
            placeholder: "Escolha uma opção"
        },
        multi: {
            placeholder: "Escolher...",
            maxSelectedMessage: "Max #{max} opçãoes",
            selectedMessage: "#{count} selections"
        }
    }
};

export default pt;
