import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiCalendarYearView } from "./views/year-view";
import { SuiCalendarMonthView } from "./views/month-view";
import { SuiCalendarItem } from "./directives/calendar-item";
import { SuiCalendarDateView } from "./views/date-view";
import { SuiUtilityModule } from "../util/util.module";
import { SuiDatepickerDirective, SuiDatepickerDirectiveValueAccessor } from "./directives/datepicker.directive";
import { SuiDatepicker } from "./components/datepicker";
import { SuiCalendarHourView } from "./views/hour-view";
import { SuiCalendarMinuteView } from "./views/minute-view";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SuiUtilityModule
    ],
    declarations: [
        SuiCalendarItem,

        SuiCalendarYearView,
        SuiCalendarMonthView,
        SuiCalendarDateView,
        SuiCalendarHourView,
        SuiCalendarMinuteView,

        SuiDatepicker,
        SuiDatepickerDirective,
        SuiDatepickerDirectiveValueAccessor
    ],
    exports: [
        SuiDatepickerDirective,
        SuiDatepickerDirectiveValueAccessor
    ],
    entryComponents: [
        SuiDatepicker
    ]
})
export class SuiDatepickerModule {}
