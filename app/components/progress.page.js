System.register(['angular2/core', "../internal/page-title.component", './../internal/example.component', "../internal/api.component", "./progress/progress.examples"], function(exports_1, context_1) {
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
    var core_1, page_title_component_1, example_component_1, api_component_1, progress_examples_1;
    var ProgressComponentPage;
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
            function (progress_examples_1_1) {
                progress_examples_1 = progress_examples_1_1;
            }],
        execute: function() {
            ProgressComponentPage = (function () {
                function ProgressComponentPage() {
                    this.api = [
                        {
                            selector: "<sui-progress>",
                            properties: [
                                {
                                    name: "value",
                                    description: "Sets whether or not the element is collapsed. Values not in <code>[0, ..., maximum]</code> are automatically bounded.",
                                    defaultValue: "0"
                                },
                                {
                                    name: "maximum",
                                    description: "Sets the maximum value. When <code>value > maximum</code> the progress bar is full. Use the 1st example to try out this functionality.",
                                    defaultValue: "100"
                                },
                                {
                                    name: "progress",
                                    description: "Whether or not the current progress label is displayed.",
                                    defaultValue: "true"
                                },
                                {
                                    name: "precision",
                                    description: "Sets the number of decimal places on the current progress label.",
                                    defaultValue: "0"
                                },
                                {
                                    name: "autoSuccess",
                                    description: "Sets whether or not the progress bar automatically turns green when <code>value == maximum</code>.",
                                    defaultValue: "true"
                                },
                            ]
                        }
                    ];
                }
                ProgressComponentPage = __decorate([
                    core_1.Component({
                        selector: 'progress-component-page',
                        directives: [page_title_component_1.PageTitle, example_component_1.Example, api_component_1.Api, progress_examples_1.PROGRESS_EXAMPLES],
                        templateUrl: "app/components/progress.page.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProgressComponentPage);
                return ProgressComponentPage;
            }());
            exports_1("ProgressComponentPage", ProgressComponentPage);
        }
    }
});
//# sourceMappingURL=progress.page.js.map