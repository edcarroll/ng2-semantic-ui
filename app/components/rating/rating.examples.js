System.register(['@angular/core', '../../../../components/checkbox', '../../../../components/rating'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, checkbox_1, rating_1;
    var RatingExampleStandard, RatingExampleStyled, RATING_EXAMPLES;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (checkbox_1_1) {
                checkbox_1 = checkbox_1_1;
            },
            function (rating_1_1) {
                rating_1 = rating_1_1;
            }],
        execute: function() {
            // import {CHECKBOX_DIRECTIVES, RATING_DIRECTIVES} from 'ng2-semantic-ui/ng2-semantic-ui';
            RatingExampleStandard = (function () {
                function RatingExampleStandard() {
                    this.rating = 3;
                }
                RatingExampleStandard = __decorate([
                    core_1.Component({
                        selector: 'rating-example-standard',
                        directives: [checkbox_1.CHECKBOX_DIRECTIVES, rating_1.RATING_DIRECTIVES],
                        templateUrl: "app/components/rating/standard.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], RatingExampleStandard);
                return RatingExampleStandard;
            }());
            exports_1("RatingExampleStandard", RatingExampleStandard);
            RatingExampleStyled = (function () {
                function RatingExampleStyled() {
                }
                RatingExampleStyled = __decorate([
                    core_1.Component({
                        selector: 'rating-example-styled',
                        directives: [rating_1.RATING_DIRECTIVES],
                        templateUrl: "app/components/rating/styled.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], RatingExampleStyled);
                return RatingExampleStyled;
            }());
            exports_1("RatingExampleStyled", RatingExampleStyled);
            exports_1("RATING_EXAMPLES", RATING_EXAMPLES = [RatingExampleStandard, RatingExampleStyled]);
        }
    }
});
//# sourceMappingURL=rating.examples.js.map