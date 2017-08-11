import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiRating, SuiRatingValueAccessor } from "./components/rating";

const imports = [
    FormsModule,
    CommonModule
];

const declarations = [
    SuiRating,
    SuiRatingValueAccessor
];

const exports = [
    SuiRating,
    SuiRatingValueAccessor
];

@NgModule({
    imports: [
        ...imports
    ],
    declarations,
    exports
})
export class SuiRatingRootModule {}

@NgModule({
    imports: [
        ...imports
    ],
    declarations,
    exports
})
export class SuiRatingModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiRatingRootModule
        };
    }
}
