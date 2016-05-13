System.register(['@angular/core', '../../../../components/checkbox', '../../../../components/progress'], function(exports_1, context_1) {
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
    var core_1, checkbox_1, progress_1;
    var ProgressExampleStandard, ProgressExampleVariations, PROGRESS_EXAMPLES;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (checkbox_1_1) {
                checkbox_1 = checkbox_1_1;
            },
            function (progress_1_1) {
                progress_1 = progress_1_1;
            }],
        execute: function() {
            // import {CHECKBOX_DIRECTIVES, PROGRESS_DIRECTIVES} from 'ng2-semantic-ui/ng2-semantic-ui';
            ProgressExampleStandard = (function () {
                function ProgressExampleStandard() {
                    this.value = 55;
                    this.progress = true;
                    this.maximum = 100;
                    this.precision = 0;
                }
                ProgressExampleStandard = __decorate([
                    core_1.Component({
                        selector: 'progress-example-standard',
                        directives: [checkbox_1.CHECKBOX_DIRECTIVES, progress_1.PROGRESS_DIRECTIVES],
                        templateUrl: "app/components/progress/standard.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProgressExampleStandard);
                return ProgressExampleStandard;
            }());
            exports_1("ProgressExampleStandard", ProgressExampleStandard);
            ProgressExampleVariations = (function () {
                function ProgressExampleVariations() {
                    this.value = 55;
                    this.changingValue = -20;
                    this.randomValue = 0;
                    this.updateChangingValue();
                    this.randomValue = Math.floor(Math.random() * 100) + 1;
                }
                ProgressExampleVariations.prototype.updateChangingValue = function () {
                    var _this = this;
                    setTimeout(function () {
                        if (_this.changingValue > 120) {
                            _this.changingValue = -20;
                        }
                        else {
                            _this.changingValue += 2;
                        }
                        _this.updateChangingValue();
                    }, 75);
                };
                ProgressExampleVariations = __decorate([
                    core_1.Component({
                        selector: 'progress-example-variations',
                        directives: [progress_1.PROGRESS_DIRECTIVES],
                        templateUrl: "app/components/progress/variations.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProgressExampleVariations);
                return ProgressExampleVariations;
            }());
            exports_1("ProgressExampleVariations", ProgressExampleVariations);
            exports_1("PROGRESS_EXAMPLES", PROGRESS_EXAMPLES = [ProgressExampleStandard, ProgressExampleVariations]);
        }
    }
});
//# sourceMappingURL=progress.examples.js.map