System.register(['angular2/core', "../internal/page-title.component", 'ng2-prism/codeblock', "ng2-prism/languages"], function(exports_1, context_1) {
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
    var core_1, page_title_component_1, codeblock_1, languages_1;
    var GettingStartedPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (page_title_component_1_1) {
                page_title_component_1 = page_title_component_1_1;
            },
            function (codeblock_1_1) {
                codeblock_1 = codeblock_1_1;
            },
            function (languages_1_1) {
                languages_1 = languages_1_1;
            }],
        execute: function() {
            GettingStartedPage = (function () {
                function GettingStartedPage() {
                }
                GettingStartedPage = __decorate([
                    core_1.Component({
                        selector: 'getting-started-page',
                        directives: [page_title_component_1.PageTitle, codeblock_1.Codeblock, languages_1.Typescript, languages_1.Markup],
                        templateUrl: "app/home/getting-started.page.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], GettingStartedPage);
                return GettingStartedPage;
            }());
            exports_1("GettingStartedPage", GettingStartedPage);
        }
    }
});
//# sourceMappingURL=getting-started.page.js.map