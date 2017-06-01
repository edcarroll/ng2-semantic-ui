import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SuiDimmerModule} from '../dimmer/dimmer.module';
import {SuiTransitionModule} from '../transition/transition.module';
import {SuiModalService} from './modal.service';
import {SuiModal} from './modal';
import {Modal, ModalResult, ModalControls} from './modal-controls';
import {ActiveModal} from './active-modal';
import {ModalConfig, TemplateModalConfig, ComponentModalConfig} from './modal-config';
import {ModalTemplate} from './modal-template';

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
    ],
    entryComponents: [
        SuiModal
    ]
})
export class SuiModalModule {}

export {SuiModalService, Modal as SuiModal, ModalResult, ModalControls, ActiveModal as SuiActiveModal, ModalConfig, TemplateModalConfig, ComponentModalConfig, ModalTemplate};