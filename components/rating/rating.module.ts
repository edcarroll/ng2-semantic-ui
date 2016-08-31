import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {SUI_RATING_DIRECTIVES} from "./rating";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: SUI_RATING_DIRECTIVES,
    exports: SUI_RATING_DIRECTIVES
})
export class SuiRatingModule {}
