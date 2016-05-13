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
    var DimmerExampleStandard, DimmerExampleVariations, DIMMER_EXAMPLES;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_semantic_ui_1_1) {
                ng2_semantic_ui_1 = ng2_semantic_ui_1_1;
            }],
        execute: function() {
            DimmerExampleStandard = (function () {
                function DimmerExampleStandard() {
                    this.isClickable = true;
                }
                DimmerExampleStandard = __decorate([
                    core_1.Component({
                        selector: 'dimmer-example-standard',
                        directives: [ng2_semantic_ui_1.CHECKBOX_DIRECTIVES, ng2_semantic_ui_1.DIMMER_DIRECTIVES],
                        templateUrl: "app/components/dimmer/standard.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], DimmerExampleStandard);
                return DimmerExampleStandard;
            }());
            exports_1("DimmerExampleStandard", DimmerExampleStandard);
            DimmerExampleVariations = (function () {
                function DimmerExampleVariations() {
                    this.isClickable = true;
                }
                DimmerExampleVariations = __decorate([
                    core_1.Component({
                        selector: 'dimmer-example-variations',
                        directives: [ng2_semantic_ui_1.DIMMER_DIRECTIVES],
                        templateUrl: "app/components/dimmer/variations.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], DimmerExampleVariations);
                return DimmerExampleVariations;
            }());
            exports_1("DimmerExampleVariations", DimmerExampleVariations);
            exports_1("DIMMER_EXAMPLES", DIMMER_EXAMPLES = [DimmerExampleStandard, DimmerExampleVariations]);
        }
    }
});
//# sourceMappingURL=dimmer.examples.js.map