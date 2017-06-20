import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiCalendarYearView } from "./views/year-view";
import { SuiCalendarMonthView } from "./views/month-view";
import { SuiCalendarItem } from "./calendar-item";
import { SuiCalendarDateView } from "./views/date-view";
import { SuiUtilityModule } from "../util/util.module";
import { SuiDatepickerDirective } from "./datepicker.directive";
import { SuiDatepicker } from "./datepicker";
import { SuiCalendarHourView } from "./views/hour-view";

@NgModule({
    imports: [
        CommonModule,
        SuiUtilityModule
    ],
    declarations: [
        SuiCalendarYearView,
        SuiCalendarMonthView,
        SuiCalendarDateView,
        SuiCalendarHourView,
        SuiCalendarItem,
        SuiDatepicker,
        SuiDatepickerDirective
    ],
    exports: [
        SuiDatepicker,
        SuiDatepickerDirective
    ],
    entryComponents: [
        SuiDatepicker
    ]
})
export class SuiDatepickerModule {}
