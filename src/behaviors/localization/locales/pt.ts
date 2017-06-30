import { IPartialLocaleValues } from "../interfaces/values";

/**
 * locale : Portuguese (pt)
 * author : Fernando Niwes : https://github.com/fniwes
 */

const pt:IPartialLocaleValues = {
    datepicker: {
        months: [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ],
        monthsShort: [
            "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
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
            maxSelectedMessage: "Max #{max} opçãoes"
        }
    }
};

export default pt;
