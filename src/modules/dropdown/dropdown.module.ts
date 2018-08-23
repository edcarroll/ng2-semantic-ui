import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransitionModule } from "../transition/internal";
import { SuiDropdown } from "./directives/dropdown";
import { SuiDropdownMenu, SuiDropdownMenuItem } from "./directives/dropdown-menu";

@NgModule({
    imports: [
        CommonModule,
        SuiTransitionModule
    ],
    declarations: [
        SuiDropdown,
        SuiDropdownMenu,
        SuiDropdownMenuItem
    ],
    exports: [
        SuiDropdown,
        SuiDropdownMenu,
        SuiDropdownMenuItem
    ]
})
export class SuiDropdownModule {}
