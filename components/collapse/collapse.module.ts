import {NgModule} from '@angular/core';
import {SUI_COLLAPSE_DIRECTIVES} from './collapse';

@NgModule({
    declarations: SUI_COLLAPSE_DIRECTIVES,
    exports: SUI_COLLAPSE_DIRECTIVES
})
export class SuiCollapseModule {}
