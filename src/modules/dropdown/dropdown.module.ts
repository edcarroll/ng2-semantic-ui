import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiDropdown } from "./directives/dropdown";
import { SuiDropdownMenu, SuiDropdownMenuItem } from "./directives/dropdown-menu";
import { DropdownService, DropdownAutoCloseType } from "./services/dropdown.service";

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
