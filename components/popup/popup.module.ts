import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SuiTransitionModule} from "../transition/transition.module";
import {SuiPopupDirective, IPopup} from './popup.directive';
import {SuiPopup} from './popup';
import {SuiPopupArrow} from './popup-arrow';
import {IPopupOptions, PopupTrigger} from './popup-config';
import {PositioningPlacement} from '../util/positioning.service';

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
    entryComponents: [
        SuiPopup
    ]
})

export class SuiPopupModule {}

export {IPopup, IPopupOptions, PopupTrigger, PositioningPlacement as PopupPlacement};