import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiDropdownModule } from "../dropdown";
import { SuiLocalizationModule } from "../../behaviors/localization";
import { SuiUtilityModule } from "../../misc/util";
import { SuiSearch } from "./components/search";
import { SuiSearchResult } from "./components/search-result";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SuiDropdownModule,
        SuiLocalizationModule,
        SuiUtilityModule
    ],
    declarations: [
        SuiSearch,
        SuiSearchResult
    ],
    exports: [
        SuiSearch
    ]
})
export class SuiSearchModule {}
