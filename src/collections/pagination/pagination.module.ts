import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SuiPagination } from "./components/pagination";

const imports = [
    CommonModule
];

const declarations = [
    SuiPagination
];

const exports = [
    SuiPagination
];

@NgModule({
    imports: [
        ...imports
    ],
    declarations,
    exports
})
export class SuiPaginationRootModule {}

@NgModule({
    imports: [
        ...imports
    ],
    declarations,
    exports
})
export class SuiPaginationModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiPaginationModule
        };
    }
}
