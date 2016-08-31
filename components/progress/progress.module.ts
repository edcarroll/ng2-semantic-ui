import {NgModule} from '@angular/core';
import {SUI_PROGRESS_DIRECTIVES} from "./progress";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [CommonModule],
    declarations: SUI_PROGRESS_DIRECTIVES,
    exports: SUI_PROGRESS_DIRECTIVES
})
export class SuiProgressModule {}
