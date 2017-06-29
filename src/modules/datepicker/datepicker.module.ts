import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiCalendarYearView } from "./views/year-view";
import { SuiCalendarMonthView } from "./views/month-view";
import { SuiCalendarItem } from "./directives/calendar-item";
import { SuiCalendarDateView } from "./views/date-view";
import { SuiDatepicker, DatepickerMode } from "./components/datepicker";
import { SuiCalendarHourView } from "./views/hour-view";
import { SuiCalendarMinuteView } from "./views/minute-view";
import { SuiDatepickerInputDirective } from "./directives/input.directive";
import {
    SuiDatepickerDirective, SuiDatepickerDirectiveValueAccessor,
    SuiDatepickerDirectiveValidator
} from "./directives/datepicker.directive";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SuiPopupModule,
        SuiLocalizationModule,
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
        SuiDatepickerDirectiveValueAccessor,
        SuiDatepickerDirectiveValidator,
        SuiDatepickerInputDirective
    ],
    exports: [
        SuiDatepickerDirective,
        SuiDatepickerDirectiveValueAccessor,
        SuiDatepickerDirectiveValidator,
        SuiDatepickerInputDirective
    ],
    entryComponents: [
        SuiDatepicker
    ]
})
export class SuiDatepickerModule {}
