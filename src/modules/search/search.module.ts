import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiDropdownModule } from "../dropdown/dropdown.module";
import { SuiLocalizationModule } from "../localization/localization.module";
import { SuiSearch, SuiSearchValueAccessor } from "./search";
import { SearchService, LookupFn } from "./search.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SuiDropdownModule,
        SuiLocalizationModule
    ],
    declarations: [
        SuiSearch,
        SuiSearchValueAccessor
    ],
    exports: [
        SuiSearch,
        SuiSearchValueAccessor
    ]
})
export class SuiSearchModule {}

export {SearchService, LookupFn};
