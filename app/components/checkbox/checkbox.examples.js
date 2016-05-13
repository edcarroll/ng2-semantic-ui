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
    var CheckboxExampleStandard, CheckboxExampleRadioButton, CheckboxExampleStyled, CHECKBOX_EXAMPLES;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_semantic_ui_1_1) {
                ng2_semantic_ui_1 = ng2_semantic_ui_1_1;
            }],
        execute: function() {
            CheckboxExampleStandard = (function () {
                function CheckboxExampleStandard() {
                    this.eCheck = true;
                }
                CheckboxExampleStandard = __decorate([
                    core_1.Component({
                        selector: 'checkbox-example-standard',
                        directives: [ng2_semantic_ui_1.CHECKBOX_DIRECTIVES],
                        templateUrl: "app/components/checkbox/standard.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], CheckboxExampleStandard);
                return CheckboxExampleStandard;
            }());
            exports_1("CheckboxExampleStandard", CheckboxExampleStandard);
            CheckboxExampleRadioButton = (function () {
                function CheckboxExampleRadioButton() {
                    this.eRadio = "world";
                }
                CheckboxExampleRadioButton = __decorate([
                    core_1.Component({
                        selector: 'checkbox-example-radio-button',
                        directives: [ng2_semantic_ui_1.CHECKBOX_DIRECTIVES],
                        templateUrl: "app/components/checkbox/radio.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], CheckboxExampleRadioButton);
                return CheckboxExampleRadioButton;
            }());
            exports_1("CheckboxExampleRadioButton", CheckboxExampleRadioButton);
            CheckboxExampleStyled = (function () {
                function CheckboxExampleStyled() {
                }
                CheckboxExampleStyled = __decorate([
                    core_1.Component({
                        selector: 'checkbox-example-styled',
                        directives: [ng2_semantic_ui_1.CHECKBOX_DIRECTIVES],
                        templateUrl: "app/components/checkbox/styled.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], CheckboxExampleStyled);
                return CheckboxExampleStyled;
            }());
            exports_1("CheckboxExampleStyled", CheckboxExampleStyled);
            exports_1("CHECKBOX_EXAMPLES", CHECKBOX_EXAMPLES = [CheckboxExampleStandard, CheckboxExampleRadioButton, CheckboxExampleStyled]);
        }
    }
});
//# sourceMappingURL=checkbox.examples.js.map