System.register(['angular2/core', "../internal/page-title.component", './../internal/example.component', "../internal/api.component", "./tab/tab.examples"], function(exports_1, context_1) {
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
    var core_1, page_title_component_1, example_component_1, api_component_1, tab_examples_1;
    var TabComponentPage;
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
            function (tab_examples_1_1) {
                tab_examples_1 = tab_examples_1_1;
            }],
        execute: function() {
            TabComponentPage = (function () {
                function TabComponentPage() {
                    this.api = [
                        {
                            selector: "<sui-tabset>"
                        },
                        {
                            selector: "[suiTabHeader]",
                            properties: [
                                {
                                    name: "suiTabHeader",
                                    description: "Specifies the ID so the content can be linked to a <code>[suiTabContent]</code>. This must be unique.",
                                    required: true
                                },
                                {
                                    name: "isActive",
                                    description: "Sets whether the tab is active. Supports being set to <code>false</code> at which time the closest available tab is activated.",
                                    defaultValue: "false"
                                },
                                {
                                    name: "isDisabled",
                                    description: "Sets whether not the tab is disabled. If the tab is active when it is disabled, the closest available tab is activated.",
                                    defaultValue: "false"
                                }
                            ],
                            events: [
                                {
                                    name: "isActiveChange",
                                    description: "Fires when the tab's active status is changed. Using the <code>[(isActive)]</code> syntax is recommended so that the value is updated when the active tab changes."
                                },
                                {
                                    name: "onActivate",
                                    description: "Fires when the tab becomes active."
                                }
                            ]
                        },
                        {
                            selector: "[suiTabContent]",
                            properties: [
                                {
                                    name: "suiTabContent",
                                    description: "Specifies the ID so the content can be linked to a <code>[suiTabHeader]</code>. This must be unique.",
                                    required: true
                                }
                            ]
                        }
                    ];
                }
                TabComponentPage = __decorate([
                    core_1.Component({
                        selector: 'tab-component-page',
                        directives: [page_title_component_1.PageTitle, example_component_1.Example, api_component_1.Api, tab_examples_1.TAB_EXAMPLES],
                        templateUrl: "app/components/tab.page.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TabComponentPage);
                return TabComponentPage;
            }());
            exports_1("TabComponentPage", TabComponentPage);
        }
    }
});
//# sourceMappingURL=tab.page.js.map