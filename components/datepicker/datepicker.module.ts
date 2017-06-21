import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiCalendarYearView } from "./views/year-view";
import { SuiCalendarMonthView } from "./views/month-view";
import { SuiCalendarItem } from "./directives/calendar-item";
import { SuiCalendarDateView } from "./views/date-view";
import { SuiUtilityModule } from "../util/util.module";
import { SuiDatepickerDirective } from "./datepicker.directive";
import { SuiDatepicker, SuiDatepickerValueAccessor } from "./datepicker";
import { SuiCalendarHourView } from "./views/hour-view";
import { SuiCalendarMinuteView } from "./views/minute-view";

@NgModule({
    imports: [
        CommonModule,
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
        SuiDatepickerValueAccessor,
        SuiDatepickerDirective
    ],
    exports: [
        SuiDatepicker,
        SuiDatepickerValueAccessor,
        SuiDatepickerDirective
    ],
    entryComponents: [
        SuiDatepicker
    ]
})
export class SuiDatepickerModule {}
