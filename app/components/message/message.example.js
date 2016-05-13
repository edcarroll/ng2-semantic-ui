System.register(['@angular/core', '../../../../components/message'], function(exports_1, context_1) {
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
    var core_1, message_1;
    var MessageExampleStandard, MessageExampleNoDismiss, MESSAGE_EXAMPLES;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (message_1_1) {
                message_1 = message_1_1;
            }],
        execute: function() {
            // import {MESSAGE_DIRECTIVES} from 'ng2-semantic-ui/ng2-semantic-ui';
            MessageExampleStandard = (function () {
                function MessageExampleStandard() {
                }
                MessageExampleStandard = __decorate([
                    core_1.Component({
                        selector: 'message-example-standard',
                        directives: [message_1.MESSAGE_DIRECTIVES],
                        templateUrl: "app/components/message/standard.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], MessageExampleStandard);
                return MessageExampleStandard;
            }());
            exports_1("MessageExampleStandard", MessageExampleStandard);
            MessageExampleNoDismiss = (function () {
                function MessageExampleNoDismiss() {
                }
                MessageExampleNoDismiss = __decorate([
                    core_1.Component({
                        selector: 'message-example-no-dismiss',
                        directives: [message_1.MESSAGE_DIRECTIVES],
                        templateUrl: "app/components/message/no-dismiss.example.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], MessageExampleNoDismiss);
                return MessageExampleNoDismiss;
            }());
            exports_1("MessageExampleNoDismiss", MessageExampleNoDismiss);
            exports_1("MESSAGE_EXAMPLES", MESSAGE_EXAMPLES = [MessageExampleStandard, MessageExampleNoDismiss]);
        }
    }
});
//# sourceMappingURL=message.example.js.map