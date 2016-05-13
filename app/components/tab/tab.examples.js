System.register(['@angular/core', 'ng2-semantic-ui/ng2-semantic-ui'], function(exports_1, context_1) {
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
    var core_1, ng2_semantic_ui_1;
    var TabExampleStandard, TabExampleProperties, TabExampleDynamic, TabExampleStyled, TAB_EXAMPLES;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_semantic_ui_1_1) {
                ng2_semantic_ui_1 = ng2_semantic_ui_1_1;
            }],
        execute: function() {
            TabExampleStandard = (function () {
                function TabExampleStandard() {
                }
                TabExampleStandard = __decorate([
                    core_1.Component({
                        selector: 'tab-example-standard',
                        directives: [ng2_semantic_ui_1.TAB_DIRECTIVES],
                        templateUrl: "app/components/tab/standard.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TabExampleStandard);
                return TabExampleStandard;
            }());
            exports_1("TabExampleStandard", TabExampleStandard);
            TabExampleProperties = (function () {
                function TabExampleProperties() {
                    this.alert = function () {
                        window.alert("You've chosen the alert tab!");
                    };
                }
                TabExampleProperties = __decorate([
                    core_1.Component({
                        selector: 'tab-example-properties',
                        directives: [ng2_semantic_ui_1.CHECKBOX_DIRECTIVES, ng2_semantic_ui_1.TAB_DIRECTIVES],
                        templateUrl: "app/components/tab/properties.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TabExampleProperties);
                return TabExampleProperties;
            }());
            exports_1("TabExampleProperties", TabExampleProperties);
            TabExampleDynamic = (function () {
                function TabExampleDynamic() {
                    this.tabs = [
                        { header: "1st", content: "Dynamic content" },
                        { header: "2nd", content: "More content" },
                        { header: "3rd", content: "Even more content" }
                    ];
                }
                TabExampleDynamic.prototype.addTab = function () {
                    this.tabs.push({
                        header: "New",
                        content: "Another dynamic tab"
                    });
                };
                ;
                TabExampleDynamic.prototype.removeTab = function () {
                    this.tabs.pop();
                };
                TabExampleDynamic = __decorate([
                    core_1.Component({
                        selector: 'tab-example-dynamic',
                        directives: [ng2_semantic_ui_1.TAB_DIRECTIVES],
                        templateUrl: "app/components/tab/dynamic.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TabExampleDynamic);
                return TabExampleDynamic;
            }());
            exports_1("TabExampleDynamic", TabExampleDynamic);
            TabExampleStyled = (function () {
                function TabExampleStyled() {
                    this.pointing = true;
                }
                TabExampleStyled = __decorate([
                    core_1.Component({
                        selector: 'tab-example-styled',
                        directives: [ng2_semantic_ui_1.CHECKBOX_DIRECTIVES, ng2_semantic_ui_1.TAB_DIRECTIVES],
                        templateUrl: "app/components/tab/styled.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TabExampleStyled);
                return TabExampleStyled;
            }());
            exports_1("TabExampleStyled", TabExampleStyled);
            exports_1("TAB_EXAMPLES", TAB_EXAMPLES = [TabExampleStandard, TabExampleProperties, TabExampleDynamic, TabExampleStyled]);
        }
    }
});
//# sourceMappingURL=tab.examples.js.map