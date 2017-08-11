import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiDimmerModule } from "../dimmer";
import { SuiTransitionModule } from "../transition";
import { SuiUtilityModule } from "../../misc/util";
import { SuiModalService } from "./services/modal.service";
import { SuiModal } from "./components/modal";

const imports = [
    CommonModule
];

const declarations = [
    SuiModal
];

const entryComponents = [
    SuiModal
];

const exports = [
    SuiModal
];

@NgModule({
    imports: [
        ...imports,
        SuiDimmerModule.forRoot(),
        SuiTransitionModule.forRoot(),
        SuiUtilityModule.forRoot()
    ],
    declarations,
    entryComponents,
    exports
})
export class SuiModalRootModule {}

@NgModule({
    imports: [
        ...imports,
        SuiDimmerModule,
        SuiTransitionModule,
        SuiUtilityModule
    ],
    declarations,
    entryComponents,
    exports
})
export class SuiModalModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiModalRootModule
        };
    }
}
