System.register(['angular2/core', "../internal/page-title.component", './../internal/example.component', "../internal/api.component", "./rating/rating.examples"], function(exports_1, context_1) {
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
    var core_1, page_title_component_1, example_component_1, api_component_1, rating_examples_1;
    var RatingComponentPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (page_title_component_1_1) {
                page_title_component_1 = page_title_component_1_1;
            },
            function (example_component_1_1) {
                example_component_1 = example_component_1_1;
            },
            function (api_component_1_1) {
                api_component_1 = api_component_1_1;
            },
            function (rating_examples_1_1) {
                rating_examples_1 = rating_examples_1_1;
            }],
        execute: function() {
            RatingComponentPage = (function () {
                function RatingComponentPage() {
                    this.api = [
                        {
                            selector: "<sui-rating>",
                            properties: [
                                {
                                    name: "max",
                                    description: "Sets the highest value the rating allows as input.",
                                    defaultValue: "5"
                                },
                                {
                                    name: "ngModel",
                                    description: "Bind the rating value to the value of the provided variable."
                                },
                                {
                                    name: "isReadonly",
                                    description: "Sets whether or not the rating is read-only. This only affects the UI, <code>[ngModel]</code> changes will still display.",
                                    defaultValue: "false"
                                }
                            ],
                            events: [
                                {
                                    name: "ngModelChange",
                                    description: "Fires whenever the rating value is changed. <code>[(ngModel)]</code> syntax is supported."
                                },
                                {
                                    name: "valueChange",
                                    description: "Fires whenever the rating value is changed."
                                }
                            ]
                        },
                    ];
                }
                RatingComponentPage = __decorate([
                    core_1.Component({
                        selector: 'rating-component-page',
                        directives: [page_title_component_1.PageTitle, example_component_1.Example, api_component_1.Api, rating_examples_1.RATING_EXAMPLES],
                        templateUrl: "app/components/rating.page.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], RatingComponentPage);
                return RatingComponentPage;
            }());
            exports_1("RatingComponentPage", RatingComponentPage);
        }
    }
});
//# sourceMappingURL=rating.page.js.map