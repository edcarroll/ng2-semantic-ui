System.register(['angular2/core', 'ng2-semantic-ui/ng2-semantic-ui'], function(exports_1, context_1) {
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
    var DropdownExampleStandard, DropdownExampleStyled, DROPDOWN_EXAMPLES;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_semantic_ui_1_1) {
                ng2_semantic_ui_1 = ng2_semantic_ui_1_1;
            }],
        execute: function() {
            DropdownExampleStandard = (function () {
                function DropdownExampleStandard() {
                }
                DropdownExampleStandard = __decorate([
                    core_1.Component({
                        selector: 'dropdown-example-standard',
                        directives: [ng2_semantic_ui_1.CHECKBOX_DIRECTIVES, ng2_semantic_ui_1.DROPDOWN_DIRECTIVES],
                        templateUrl: "app/components/dropdown/standard.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], DropdownExampleStandard);
                return DropdownExampleStandard;
            }());
            exports_1("DropdownExampleStandard", DropdownExampleStandard);
            DropdownExampleStyled = (function () {
                function DropdownExampleStyled() {
                }
                DropdownExampleStyled = __decorate([
                    core_1.Component({
                        selector: 'dropdown-example-styled',
                        directives: [ng2_semantic_ui_1.DROPDOWN_DIRECTIVES],
                        templateUrl: "app/components/dropdown/styled.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], DropdownExampleStyled);
                return DropdownExampleStyled;
            }());
            exports_1("DropdownExampleStyled", DropdownExampleStyled);
            exports_1("DROPDOWN_EXAMPLES", DROPDOWN_EXAMPLES = [DropdownExampleStandard, DropdownExampleStyled]);
        }
    }
});
//# sourceMappingURL=dropdown.examples.js.map