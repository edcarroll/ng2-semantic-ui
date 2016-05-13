System.register(['@angular/core', "../internal/page-title.component", './../internal/example.component', "../internal/api.component", "./search/search.examples"], function(exports_1, context_1) {
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
    var core_1, page_title_component_1, example_component_1, api_component_1, search_examples_1;
    var SearchComponentPage;
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
            function (search_examples_1_1) {
                search_examples_1 = search_examples_1_1;
            }],
        execute: function() {
            SearchComponentPage = (function () {
                function SearchComponentPage() {
                    this.api = [
                        {
                            selector: "<sui-search>",
                            properties: [
                                {
                                    name: "placeholder",
                                    description: "Sets the placeholder string on the search box.",
                                    defaultValue: "Search..."
                                },
                                {
                                    name: "options",
                                    description: "Sets the options available to the search component. Can either be an array or a function that takes a query and returns a Promise for remote lookup."
                                },
                                {
                                    name: "optionsField",
                                    description: "Sets the property name that the search element uses to display each option. Supports dot notation for nested properties."
                                },
                                {
                                    name: "searchDelay",
                                    description: "Sets the amount of time in milliseconds to wait after the last keypress before running a search.",
                                    defaultValue: "200"
                                },
                                {
                                    name: "icon",
                                    description: "Sets whether or not the search displays an icon. Loading state is automatically applied when searching.",
                                    defaultValue: "true"
                                },
                                {
                                    name: "ngModel",
                                    description: "Bind the search selected item to the value of the provided variable."
                                }
                            ],
                            events: [
                                {
                                    name: "ngModelChange",
                                    description: "Fires whenever the search's selected item is changed. <code>[(ngModel)]</code> syntax is supported."
                                },
                                {
                                    name: "onItemSelected",
                                    description: "Fires whenever the search's selected item is changed. The selected value is passed as <code>$event</code>."
                                }
                            ]
                        }
                    ];
                }
                SearchComponentPage = __decorate([
                    core_1.Component({
                        selector: 'search-component-page',
                        directives: [page_title_component_1.PageTitle, example_component_1.Example, api_component_1.Api, search_examples_1.SEARCH_EXAMPLES],
                        templateUrl: "app/components/search.page.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], SearchComponentPage);
                return SearchComponentPage;
            }());
            exports_1("SearchComponentPage", SearchComponentPage);
        }
    }
});
//# sourceMappingURL=search.page.js.map