System.register(['angular2/core'], function(exports_1, context_1) {
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
    var Api;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Api = (function () {
                function Api() {
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Api.prototype, "api", void 0);
                Api = __decorate([
                    core_1.Component({
                        selector: 'api',
                        directives: [],
                        template: "\n<div class=\"api-object\" *ngFor=\"#object of api;\">\n    <h3 class=\"ui header\">{{ object.selector }}</h3>\n    <div class=\"ui segments\">\n        <div class=\"ui segment\" *ngIf=\"object.properties\">\n            <h4 class=\"ui header\">\n                <i class=\"options icon\"></i>\n                <div class=\"content\">Properties</div>\n            </h4>\n            <div class=\"ui list\">\n                <div class=\"item\" *ngFor=\"#property of object.properties\">\n                    <div class=\"content\">\n                        <div class=\"header\">\n                            <code>{{ property.name }}</code>&nbsp;\n                            <div class=\"ui teal tiny horizontal label\" *ngIf=\"property.defaultValue\" title=\"Default Value\">{{ property.defaultValue }}</div>\n                            <div class=\"ui red tiny horizontal label\" *ngIf=\"property.required\">required</div>\n                        </div>\n                        <div class=\"description\" [innerHTML]=\"property.description\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"ui segment\" *ngIf=\"object.events\">\n            <h4 class=\"ui header\">\n                <i class=\"lightning icon\"></i>\n                <div class=\"content\">Events</div>\n            </h4>\n            <div class=\"ui list\">\n                <div class=\"item\" *ngFor=\"#event of object.events\">\n                    <div class=\"content\">\n                        <div class=\"header\">\n                            <code>{{ event.name }}</code>\n                        </div>\n                        <div class=\"description\" [innerHTML]=\"event.description\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>    \n</div>\n"
                    }), 
                    __metadata('design:paramtypes', [])
                ], Api);
                return Api;
            }());
            exports_1("Api", Api);
        }
    }
});
//# sourceMappingURL=api.component.js.map