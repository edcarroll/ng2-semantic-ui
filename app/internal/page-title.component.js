System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var PageTitle;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            PageTitle = (function () {
                function PageTitle() {
                    this.classes = true;
                }
                __decorate([
                    core_1.HostBinding('class.ui'),
                    core_1.HostBinding('class.masthead'),
                    core_1.HostBinding('class.vertical'),
                    core_1.HostBinding('class.segment'), 
                    __metadata('design:type', Object)
                ], PageTitle.prototype, "classes", void 0);
                PageTitle = __decorate([
                    core_1.Component({
                        selector: 'page-title',
                        directives: [],
                        template: "\n<div class=\"ui container\">\n    <h1 class=\"ui header\">\n        <ng-content select=\"[header]\"></ng-content>\n        <div class=\"sub header\">\n            <iframe class=\"github\" src=\"https://ghbtns.com/github-btn.html?user=edcarroll&repo=ng2-semantic-ui&type=star&count=true\" frameborder=\"0\" scrolling=\"0\" width=\"170px\" height=\"20px\"></iframe>\n            <ng-content select=\"[sub-header]\"></ng-content>\n        </div>\n    </h1>\n</div>\n",
                        styles: [":host { display: block; }"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], PageTitle);
                return PageTitle;
            }());
            exports_1("PageTitle", PageTitle);
        }
    }
});
//# sourceMappingURL=page-title.component.js.map