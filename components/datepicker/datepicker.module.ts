import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiYearpicker } from "./yearpicker";
import { SuiMonthpicker } from "./monthpicker";
import { SuiCalendarItem } from "./calendar-item";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SuiYearpicker,
        SuiMonthpicker,
        SuiCalendarItem
    ],
    exports: [
        // Delete all of these!
        SuiYearpicker,
        SuiMonthpicker
    ]
})
export class SuiDatepickerModule {}
