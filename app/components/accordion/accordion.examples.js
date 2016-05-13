System.register(['@angular/core', '../../../../components/accordion'], function(exports_1, context_1) {
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
    var core_1, accordion_1;
    var AccordionExampleStandard, AccordionExampleStyled, ACCORDION_EXAMPLES;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (accordion_1_1) {
                accordion_1 = accordion_1_1;
            }],
        execute: function() {
            // import {ACCORDION_DIRECTIVES} from 'ng2-semantic-ui/ng2-semantic-ui';
            AccordionExampleStandard = (function () {
                function AccordionExampleStandard() {
                }
                AccordionExampleStandard = __decorate([
                    core_1.Component({
                        selector: 'accordion-example-standard',
                        directives: [accordion_1.ACCORDION_DIRECTIVES],
                        templateUrl: "app/components/accordion/standard.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], AccordionExampleStandard);
                return AccordionExampleStandard;
            }());
            exports_1("AccordionExampleStandard", AccordionExampleStandard);
            AccordionExampleStyled = (function () {
                function AccordionExampleStyled() {
                }
                AccordionExampleStyled = __decorate([
                    core_1.Component({
                        selector: 'accordion-example-styled',
                        directives: [accordion_1.ACCORDION_DIRECTIVES],
                        templateUrl: "app/components/accordion/styled.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], AccordionExampleStyled);
                return AccordionExampleStyled;
            }());
            exports_1("AccordionExampleStyled", AccordionExampleStyled);
            exports_1("ACCORDION_EXAMPLES", ACCORDION_EXAMPLES = [AccordionExampleStandard, AccordionExampleStyled]);
        }
    }
});
//# sourceMappingURL=accordion.examples.js.map