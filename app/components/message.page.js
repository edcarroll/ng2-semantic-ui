System.register(['@angular/core', "../internal/page-title.component", './../internal/example.component', "../internal/api.component", "./message/message.example"], function(exports_1, context_1) {
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
    var core_1, page_title_component_1, example_component_1, api_component_1, message_example_1;
    var MessageComponentPage;
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
            function (message_example_1_1) {
                message_example_1 = message_example_1_1;
            }],
        execute: function() {
            MessageComponentPage = (function () {
                function MessageComponentPage() {
                    this.api = [
                        {
                            selector: "<sui-message>",
                            properties: [
                                {
                                    name: "dismissible",
                                    description: "Sets whether or not the message has a dismiss button.",
                                    defaultValue: "true"
                                }
                            ],
                            events: [
                                {
                                    name: "onDismiss",
                                    description: "Fires when the message is dismissed by the user."
                                }
                            ]
                        }
                    ];
                }
                MessageComponentPage = __decorate([
                    core_1.Component({
                        selector: 'message-component-page',
                        directives: [page_title_component_1.PageTitle, example_component_1.Example, api_component_1.Api, message_example_1.MESSAGE_EXAMPLES],
                        templateUrl: "app/components/message.page.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], MessageComponentPage);
                return MessageComponentPage;
            }());
            exports_1("MessageComponentPage", MessageComponentPage);
        }
    }
});
//# sourceMappingURL=message.page.js.map