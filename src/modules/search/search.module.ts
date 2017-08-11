import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiDropdownModule } from "../dropdown";
import { SuiLocalizationModule } from "../../behaviors/localization";
import { SuiUtilityModule } from "../../misc/util";
import { SuiSearch } from "./components/search";
import { SuiSearchResult } from "./components/search-result";

const imports = [
    CommonModule,
    FormsModule
];

const declarations = [
    SuiSearch,
    SuiSearchResult
];

const exports = [
    SuiSearch
];

@NgModule({
    imports: [
        ...imports,
        SuiDropdownModule.forRoot(),
        SuiLocalizationModule.forRoot(),
        SuiUtilityModule.forRoot()
    ],
    declarations,
    exports
})
export class SuiSearchRootModule {}

@NgModule({
    imports: [
        ...imports,
        SuiDropdownModule,
        SuiLocalizationModule,
        SuiUtilityModule
    ],
    declarations,
    exports
})
export class SuiSearchModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiSearchRootModule
        };
    }
}
