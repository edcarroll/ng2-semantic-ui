import {NgModule} from '@angular/core';
import {SUI_TABS_DIRECTIVES} from "./tabset";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [CommonModule],
    declarations: SUI_TABS_DIRECTIVES,
    exports: SUI_TABS_DIRECTIVES
})
export class SuiTabsModule {}
