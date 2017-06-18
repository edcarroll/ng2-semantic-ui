import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiDimmerModule } from "../dimmer/dimmer.module";
import { SuiTransitionModule } from "../transition/transition.module";
import { SuiUtilityModule } from "../util/util.module";
import { SuiModalService } from "./modal.service";
import { SuiModal, IModal } from "./modal";
import { Modal, ModalResult, ModalControls } from "./modal-controls";
import { ActiveModal, SuiActiveModal } from "./active-modal";
import { ModalConfig, TemplateModalConfig, ComponentModalConfig, ModalSize } from "./modal-config";
import { ModalTemplate } from "./modal-template";

@NgModule({
    imports: [
        CommonModule,
        SuiDimmerModule,
        SuiTransitionModule,
        SuiUtilityModule
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

export {
    SuiModalService,
    Modal as SuiModal,
    IModal,
    ModalResult,
    ModalControls,
    SuiActiveModal,
    ModalConfig,
    TemplateModalConfig,
    ComponentModalConfig,
    ModalTemplate,
    ModalSize
};
