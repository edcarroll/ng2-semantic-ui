import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiProgressCircular } from "./components/progress-circular";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SuiProgressCircular
    ],
    exports: [
        SuiProgressCircular
    ]
})
export class SuiProgressCircularModule {}
