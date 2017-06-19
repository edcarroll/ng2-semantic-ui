import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiYearpicker } from "./yearpicker";
import { SuiMonthpicker } from "./monthpicker";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SuiYearpicker,
        SuiMonthpicker
    ],
    exports: [
        SuiYearpicker,
        SuiMonthpicker
    ]
})
export class SuiDatepickerModule {}
