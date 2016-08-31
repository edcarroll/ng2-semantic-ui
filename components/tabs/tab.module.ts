import {NgModule} from '@angular/core';
import {SUI_TABS_DIRECTIVES} from "./tabset";

@NgModule({
    declarations: SUI_TABS_DIRECTIVES,
    exports: SUI_TABS_DIRECTIVES
})
export class SuiTabsModule {}
