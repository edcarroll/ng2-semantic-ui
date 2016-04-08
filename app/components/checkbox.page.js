System.register(['angular2/core', "../internal/page-title.component", "../internal/example.component", "../internal/api.component", './checkbox/checkbox.examples'], function(exports_1, context_1) {
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
    var core_1, page_title_component_1, example_component_1, api_component_1, checkbox_examples_1;
    var CheckboxComponentPage;
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
            function (checkbox_examples_1_1) {
                checkbox_examples_1 = checkbox_examples_1_1;
            }],
        execute: function() {
            CheckboxComponentPage = (function () {
                function CheckboxComponentPage() {
                    this.api = [
                        {
                            selector: "<sui-checkbox>",
                            properties: [
                                {
                                    name: "name",
                                    description: "Sets the name on the <code>&lt;sui-checkbox&gt;</code> component."
                                },
                                {
                                    name: "ngModel",
                                    description: "Bind the checkbox value to the value of the provided variable."
                                },
                                {
                                    name: "isDisabled",
                                    description: " Sets whether or not the checkbox is disabled. (This only affects the UI, state can still be changed programatically)",
                                    defaultValue: "false"
                                },
                                {
                                    name: "isReadonly",
                                    description: "Sets whether or not the checkbox is read-only. (UI only, as above)",
                                    defaultValue: "false"
                                }
                            ],
                            events: [
                                {
                                    name: "ngModelChange",
                                    description: "Fires whenever the checkbox check is changed. <code>[(ngModel)]</code> syntax is supported."
                                },
                                {
                                    name: "checkChange",
                                    description: "Fires whenever the checkbox check is changed."
                                }
                            ]
                        },
                        {
                            selector: "<sui-radio-button>",
                            properties: [
                                {
                                    name: "name",
                                    description: "Sets the name on the <code>&lt;sui-radio-button&gt;</code> component."
                                },
                                {
                                    name: "value",
                                    description: "Sets the value that selecting this radio button returns. Supports binding any object."
                                },
                                {
                                    name: "ngModel",
                                    description: "Bind the radio button value to the value of the provided variable.",
                                    required: true
                                },
                                {
                                    name: "isDisabled",
                                    description: " Sets whether or not the radio button is disabled. (This only affects the UI, state can still be changed programatically)",
                                    defaultValue: "false"
                                },
                                {
                                    name: "isReadonly",
                                    description: "Sets whether or not the radio button is read-only. (UI only, as above)",
                                    defaultValue: "false"
                                }
                            ],
                            events: [
                                {
                                    name: "ngModelChange",
                                    description: "Fires whenever the radio button check is changed. <code>[(ngModel)]</code> syntax is supported."
                                },
                                {
                                    name: "currentValueChange",
                                    description: "Fires whenever the radio button check is changed."
                                }
                            ]
                        }
                    ];
                }
                CheckboxComponentPage = __decorate([
                    core_1.Component({
                        selector: 'checkbox-component-page',
                        directives: [page_title_component_1.PageTitle, example_component_1.Example, api_component_1.Api, checkbox_examples_1.CHECKBOX_EXAMPLES],
                        templateUrl: 'app/components/checkbox.page.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], CheckboxComponentPage);
                return CheckboxComponentPage;
            }());
            exports_1("CheckboxComponentPage", CheckboxComponentPage);
        }
    }
});
//# sourceMappingURL=checkbox.page.js.map