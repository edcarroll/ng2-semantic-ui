import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiRating, SuiRatingValueAccessor } from "./components/rating";

@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [
        SuiRating,
        SuiRatingValueAccessor
    ],
    exports: [
        SuiRating,
        SuiRatingValueAccessor
    ]
})
export class SuiRatingModule {}
