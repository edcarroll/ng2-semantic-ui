import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiRating, SuiRatingValueAccessor } from "./components/rating";
var SuiRatingModule = /** @class */ (function () {
    function SuiRatingModule() {
    }
    SuiRatingModule.decorators = [
        { type: NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    SuiRatingModule.ctorParameters = function () { return []; };
    return SuiRatingModule;
}());
export { SuiRatingModule };
//# sourceMappingURL=rating.module.js.map