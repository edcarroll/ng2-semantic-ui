import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiSearch, SuiSearchValueAccessor } from "./components/search";

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
