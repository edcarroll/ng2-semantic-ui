import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiDropdownModule } from "../dropdown/dropdown.module";
import { SuiTransitionModule } from "../transition/transition.module";
import { SuiSearch, SuiSearchValueAccessor } from "./search";
import { SearchService, LookupFn } from "./search.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SuiDropdownModule
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
