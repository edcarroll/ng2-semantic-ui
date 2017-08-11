import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransitionModule } from "../../modules/transition";
import { SuiMessage } from "./components/message";

const imports = [
    CommonModule
];

const declarations = [
    SuiMessage
];

const exports = [
    SuiMessage
];

@NgModule({
    imports: [
        ...imports,
        SuiTransitionModule.forRoot()
    ],
    declarations,
    exports
})
export class SuiMessageRootModule {}

@NgModule({
    imports: [
        ...imports,
        SuiTransitionModule
    ],
    declarations,
    exports
})
export class SuiMessageModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiMessageRootModule
        };
    }
}
