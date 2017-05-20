import {NgModule} from '@angular/core';
import {SuiDimmer} from './dimmer';
import {CommonModule} from "@angular/common";
import {SuiTransitionModule} from '../transition/transition.module';

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
