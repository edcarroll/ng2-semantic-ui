import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiCalendarYearView } from "./year-view";
import { SuiCalendarMonthView } from "./month-view";
import { SuiCalendarItem } from "./calendar-item";
import { SuiCalendarDateView } from "./date-view";
import { SuiUtilityModule } from "../util/util.module";

@NgModule({
    imports: [
        CommonModule,
        SuiUtilityModule
    ],
    declarations: [
        SuiCalendarYearView,
        SuiCalendarMonthView,
        SuiCalendarDateView,
        SuiCalendarItem
    ],
    exports: [
        // Delete all of these!
        SuiCalendarYearView,
        SuiCalendarMonthView,
        SuiCalendarDateView
    ]
})
export class SuiDatepickerModule {}
