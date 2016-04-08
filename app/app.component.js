System.register(['angular2/core', "angular2/router", './home/getting-started.page', "./components/test.page", "./components/accordion.page", "./components/checkbox.page", "./components/collapse.page", "./components/dropdown.page"], function(exports_1, context_1) {
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
    var core_1, router_1, getting_started_page_1, test_page_1, accordion_page_1, checkbox_page_1, collapse_page_1, dropdown_page_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (getting_started_page_1_1) {
                getting_started_page_1 = getting_started_page_1_1;
            },
            function (test_page_1_1) {
                test_page_1 = test_page_1_1;
            },
            function (accordion_page_1_1) {
                accordion_page_1 = accordion_page_1_1;
            },
            function (checkbox_page_1_1) {
                checkbox_page_1 = checkbox_page_1_1;
            },
            function (collapse_page_1_1) {
                collapse_page_1 = collapse_page_1_1;
            },
            function (dropdown_page_1_1) {
                dropdown_page_1 = dropdown_page_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.test = "hi";
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        templateUrl: 'app/app.component.html'
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/',
                            name: 'GettingStarted',
                            component: getting_started_page_1.GettingStartedPage,
                            useAsDefault: true
                        },
                        {
                            path: '/components/test',
                            name: 'TestComponent',
                            component: test_page_1.TestComponentPage
                        },
                        {
                            path: '/components/accordion',
                            name: 'AccordionComponent',
                            component: accordion_page_1.AccordionComponentPage
                        },
                        {
                            path: '/components/checkbox',
                            name: 'CheckboxComponent',
                            component: checkbox_page_1.CheckboxComponentPage
                        },
                        {
                            path: '/components/collapse',
                            name: 'CollapseComponent',
                            component: collapse_page_1.CollapseComponentPage
                        },
                        {
                            path: '/components/dropdown',
                            name: 'DropdownComponent',
                            component: dropdown_page_1.DropdownComponentPage
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map