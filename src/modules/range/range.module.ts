import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiRange } from "./components/range";

@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [
        SuiRange
    ],
    exports: [
        SuiRange
    ]
})
export class SuiRangeModule {}
