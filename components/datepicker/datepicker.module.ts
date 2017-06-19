import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiYearpicker } from "./yearpicker";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SuiYearpicker
    ],
    exports: [
        SuiYearpicker
    ]
})
export class SuiDatepickerModule {}
