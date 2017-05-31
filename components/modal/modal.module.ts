import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SuiDimmerModule} from '../dimmer/dimmer.module';
import {SuiModalService} from './modal.service';
import {SuiModal} from './modal';
import {SuiTransitionModule} from '../transition/transition.module';

@NgModule({
    imports: [
        CommonModule,
        SuiDimmerModule,
        SuiTransitionModule
    ],
    declarations: [
        SuiModal
    ],
    exports: [
        SuiModal
    ],
    providers: [
        SuiModalService
    ]
})
export class SuiModalModule {}