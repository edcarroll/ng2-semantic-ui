import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransitionModule } from "../transition/internal";
import { SuiDimmer } from "./components/dimmer";

@NgModule({
    imports: [
        CommonModule,
        SuiTransitionModule
    ],
    declarations: [
        SuiDimmer
    ],
    exports: [
        SuiDimmer
    ]
})
export class SuiDimmerModule {}
