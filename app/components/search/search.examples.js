System.register(['@angular/core', 'ng2-semantic-ui/ng2-semantic-ui'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
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
    var SearchExampleStandard, SearchExampleRemote, SEARCH_EXAMPLES;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_semantic_ui_1_1) {
                ng2_semantic_ui_1 = ng2_semantic_ui_1_1;
            }],
        execute: function() {
            SearchExampleStandard = (function () {
                function SearchExampleStandard() {
                    this.icon = true;
                }
                Object.defineProperty(SearchExampleStandard.prototype, "options", {
                    //noinspection JSMethodCanBeStatic
                    get: function () {
                        return SearchExampleStandard.standardOptions;
                    },
                    enumerable: true,
                    configurable: true
                });
                //noinspection JSMethodCanBeStatic
                SearchExampleStandard.prototype.alertSelected = function (selectedItem) {
                    alert("You chose '" + selectedItem + "'!");
                };
                SearchExampleStandard.standardOptions = ["Apple", "Bird", "Car", "Dog", "Elephant", "Finch", "Gate",
                    "Horrify", "Indigo", "Jelly", "Keep", "Lemur", "Manifest", "None", "Orange", "Peel", "Quest",
                    "Resist", "Suspend", "Terrify", "Underneath", "Violet", "Water", "Xylophone", "Yellow", "Zebra"];
                SearchExampleStandard = __decorate([
                    core_1.Component({
                        selector: 'search-example-standard',
                        directives: [ng2_semantic_ui_1.CHECKBOX_DIRECTIVES, ng2_semantic_ui_1.SEARCH_DIRECTIVES],
                        templateUrl: "app/components/search/standard.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], SearchExampleStandard);
                return SearchExampleStandard;
            }());
            exports_1("SearchExampleStandard", SearchExampleStandard);
            SearchExampleRemote = (function (_super) {
                __extends(SearchExampleRemote, _super);
                function SearchExampleRemote() {
                    _super.apply(this, arguments);
                }
                SearchExampleRemote.prototype.optionsSearch = function (query) {
                    var options = SearchExampleStandard.standardOptions.map(function (o) { return ({ title: o }); });
                    return new Promise(function (resolve, reject) {
                        var results = options.filter(function (o) {
                            return o.title.slice(0, query.length).toLowerCase() == query.toLowerCase();
                        });
                        setTimeout(function () {
                            resolve(results);
                        }, 300);
                    });
                };
                SearchExampleRemote = __decorate([
                    core_1.Component({
                        selector: 'search-example-remote',
                        directives: [ng2_semantic_ui_1.SEARCH_DIRECTIVES],
                        templateUrl: "app/components/search/remote.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], SearchExampleRemote);
                return SearchExampleRemote;
            }(SearchExampleStandard));
            exports_1("SearchExampleRemote", SearchExampleRemote);
            exports_1("SEARCH_EXAMPLES", SEARCH_EXAMPLES = [SearchExampleStandard, SearchExampleRemote]);
        }
    }
});
//# sourceMappingURL=search.examples.js.map