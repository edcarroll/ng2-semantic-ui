import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransitionModule } from "../transition/transition.module";
import { SuiPopupDirective } from "./popup.directive";
import { SuiPopup } from "./popup";
import { SuiPopupArrow } from "./popup-arrow";
import { IPopupConfig, PopupTrigger, PopupConfig } from "./popup-config";
import { PositioningPlacement } from "../util/positioning.service";
import { SuiPopupConfig } from "./popup.service";
import { IPopup } from "./popup-base.directive";

@NgModule({
    imports: [
        CommonModule,
        SuiTransitionModule
    ],
    declarations: [
        SuiPopupDirective,
        SuiPopupArrow,
        SuiPopup
    ],
    exports: [
        SuiPopupDirective,
        SuiPopup
    ],
    providers: [
        SuiPopupConfig
    ],
    entryComponents: [
        SuiPopup
    ]
})

export class SuiPopupModule {}

export {
    IPopup,
    SuiPopupConfig,
    IPopupConfig,
    PopupTrigger,
    PositioningPlacement as PopupPlacement
};
