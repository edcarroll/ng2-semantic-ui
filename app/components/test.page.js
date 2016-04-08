System.register(['angular2/core', "../internal/page-title.component", '../../../components/checkbox'], function(exports_1, context_1) {
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
    var core_1, page_title_component_1, checkbox_1;
    var TestComponentPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (page_title_component_1_1) {
                page_title_component_1 = page_title_component_1_1;
            },
            function (checkbox_1_1) {
                checkbox_1 = checkbox_1_1;
            }],
        execute: function() {
            TestComponentPage = (function () {
                function TestComponentPage() {
                    this.test = "b";
                    this.checkbox = true;
                }
                TestComponentPage = __decorate([
                    core_1.Component({
                        selector: 'test-component-page',
                        directives: [page_title_component_1.PageTitle, checkbox_1.CHECKBOX_DIRECTIVES],
                        template: "\n<page-title>\n    <div header>Test</div>\n    <div sub-header>\n        <p>Test component!</p>\n    </div>\n</page-title>\n<div class=\"ui main container\">\n    <div class=\"ui dividing right rail\"></div>\n    <h2 class=\"ui dividing header\">Examples</h2>\n\n    <div class=\"ui segment\">\n        <sui-radio-button name=\"test\" value=\"a\" [(ngModel)]=\"test\">\n            Hello {{ test }}\n        </sui-radio-button>\n        <br>\n        <sui-radio-button name=\"test\" value=\"b\" [isReadonly]=\"checkbox\" [(ngModel)]=\"test\" class=\"slider\">\n            Hello {{ test }}\n        </sui-radio-button>\n    </div>\n    \n    <div class=\"ui compact segment\">\n        <sui-checkbox name=\"test\" [isDisabled]=\"test != 'a'\" [(ngModel)]=\"checkbox\" class=\"fitted\">\n            \n        </sui-checkbox>\n    </div>\n    \n    <div class=\"ui segment\">\n        <button class=\"ui primary button\" (click)=\"test = 'b'\">Set radio to 'b'</button>\n    </div>\n</div>\n"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TestComponentPage);
                return TestComponentPage;
            }());
            exports_1("TestComponentPage", TestComponentPage);
        }
    }
});
//# sourceMappingURL=test.page.js.map