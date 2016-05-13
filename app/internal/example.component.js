System.register(['@angular/core', "ng2-semantic-ui/ng2-semantic-ui", "ng2-prism/codeblock", "ng2-prism/languages"], function(exports_1, context_1) {
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
    var core_1, ng2_semantic_ui_1, codeblock_1, languages_1;
    var Example;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_semantic_ui_1_1) {
                ng2_semantic_ui_1 = ng2_semantic_ui_1_1;
            },
            function (codeblock_1_1) {
                codeblock_1 = codeblock_1_1;
            },
            function (languages_1_1) {
                languages_1 = languages_1_1;
            }],
        execute: function() {
            Example = (function () {
                function Example() {
                    this.detail = false;
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Example.prototype, "code", void 0);
                Example = __decorate([
                    core_1.Component({
                        selector: 'example',
                        directives: [ng2_semantic_ui_1.Collapse, codeblock_1.Codeblock, languages_1.Markup],
                        template: "\n<div class=\"example\">\n    <div class=\"info\">\n        <ng-content select=\"[info]\"></ng-content>\n        <i class=\"icon code\" (click)=\"detail = !detail\" title=\"View code\"></i>\n    </div>\n    <div class=\"html ui top attached segment\">\n        <ng-content select=\"[result]\"></ng-content>\n        <div class=\"ui top attached label\">\n            Example\n            <i class=\"edit icon visible\" (click)=\"detail = !detail\"></i>\n        </div>\n    </div>\n    <div [suiCollapse]=\"!detail\">\n        <div class=\"annotation transition visible\">\n            <div class=\"ui instructive bottom attached segment\">\n                <codeblock [src]=\"code\"></codeblock>\n            </div>\n        </div>\n    </div>\n</div>\n"
                    }), 
                    __metadata('design:paramtypes', [])
                ], Example);
                return Example;
            }());
            exports_1("Example", Example);
        }
    }
});
//# sourceMappingURL=example.component.js.map