System.register(['@angular/core', "../internal/page-title.component", '../../../components/checkbox', "../../../components/select", "../../../components/template"], function(exports_1, context_1) {
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
    var core_1, page_title_component_1, checkbox_1, select_1, template_1;
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
            },
            function (select_1_1) {
                select_1 = select_1_1;
            },
            function (template_1_1) {
                template_1 = template_1_1;
            }],
        execute: function() {
            TestComponentPage = (function () {
                function TestComponentPage() {
                    this.options = [{ test: "Example" }, { test: "Test" }, { test: "What" }, { test: "No" }, { test: "Benefit" }, { test: "Oranges" }, { test: "Artemis" }, { test: "Teeeest" }];
                    this.placeholder = "Select Weirdness";
                    this.testOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                    this.selected = 6;
                    this.selectedItems = [3, 6];
                }
                TestComponentPage.prototype.optionsSearch = function (query) {
                    var options = [{ test: "Example" }, { test: "Test" }, { test: "What" }, { test: "No" }, { test: "Benefit" }, { test: "Oranges" }, { test: "Artemis" }, { test: "Teeeest" }];
                    return new Promise(function (resolve, reject) {
                        var results = options.filter(function (o) {
                            return o.test.slice(0, query.length).toLowerCase() == query.toLowerCase();
                        });
                        setTimeout(function () {
                            resolve(results);
                        }, 300);
                    });
                };
                TestComponentPage = __decorate([
                    core_1.Component({
                        selector: 'test-component-page',
                        directives: [page_title_component_1.PageTitle, checkbox_1.CHECKBOX_DIRECTIVES, template_1.TEMPLATE_DIRECTIVES, select_1.SELECT_DIRECTIVES],
                        template: "\n<page-title>\n    <div header>Test</div>\n    <div sub-header>\n        <p>Test component!</p>\n    </div>\n</page-title>\n<div class=\"ui main container\">\n    <div class=\"ui dividing right rail\"></div>\n    <h2 class=\"ui dividing header\">Examples</h2>\n    <div class=\"ui segment\">\n        <sui-select [placeholder]=\"placeholder\" [options]=\"testOptions\" [(ngModel)]=\"selected\" [isSearchable]=\"true\" #select>\n            <sui-select-option *ngFor=\"let result of select.results\" [value]=\"result\"><i class=\"af flag\"></i>{{ result }}</sui-select-option>\n        </sui-select>\n    </div>\n    <div class=\"ui segment\">\n        <p>Selected option: {{ selected | json }}</p>\n    </div>\n    <div class=\"ui segment\">\n        <sui-select class=\"fluid\" [options]=\"testOptions\" [(ngModel)]=\"selectedItems\" [isSearchable]=\"true\" [allowMultiple]=\"true\" [maxSelected]=\"3\" #multiSelect>\n            <sui-select-option *ngFor=\"let result of multiSelect.results\" [value]=\"result\"><i class=\"af flag\"></i>{{ result }}</sui-select-option>\n        </sui-select>\n    </div>\n    <div class=\"ui segment\">\n        <p>Selected items: {{ selectedItems | json }}</p>\n    </div>\n</div>\n"
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