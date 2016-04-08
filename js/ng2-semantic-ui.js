System.registerDynamic("ng2-semantic-ui/components/accordion/accordion.component", ["angular2/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var Accordion = (function() {
    function Accordion() {
      this.closeOthers = true;
      this.classes = true;
      this.panels = [];
    }
    Accordion.prototype.closeOtherPanels = function(openGroup) {
      if (!this.closeOthers) {
        return;
      }
      this.panels.forEach(function(group) {
        if (group !== openGroup) {
          group.isOpen = false;
        }
      });
    };
    Accordion.prototype.addPanel = function(group) {
      this.panels.push(group);
    };
    Accordion.prototype.removePanel = function(group) {
      var index = this.panels.indexOf(group);
      if (index !== -1) {
        this.panels.splice(index, 1);
      }
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Accordion.prototype, "closeOthers", void 0);
    __decorate([core_1.HostBinding('class.ui'), core_1.HostBinding('class.accordion'), __metadata('design:type', Object)], Accordion.prototype, "classes", void 0);
    Accordion = __decorate([core_1.Component({
      selector: 'sui-accordion',
      template: "<ng-content></ng-content>",
      styles: ["\n/* Fix for general styling issues */\n:host {\n    display: block;\n}\n/* Fix for styled border issue */\n:host.styled sui-accordion-panel:first-child .title {\n    border-top: none\n}\n"]
    }), __metadata('design:paramtypes', [])], Accordion);
    return Accordion;
  }());
  exports.Accordion = Accordion;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/accordion/accordion-panel.component", ["angular2/core", "angular2/common", "./accordion.component", "./../collapse"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('angular2/core');
  var common_1 = $__require('angular2/common');
  var accordion_component_1 = $__require('./accordion.component');
  var collapse_1 = $__require('./../collapse');
  var AccordionPanel = (function() {
    function AccordionPanel(accordion) {
      this.isOpenChange = new core_1.EventEmitter(false);
      this._isOpen = false;
      this.accordion = accordion;
    }
    Object.defineProperty(AccordionPanel.prototype, "isOpen", {
      get: function() {
        return this._isOpen;
      },
      set: function(value) {
        this._isOpen = value;
        if (value) {
          this.accordion.closeOtherPanels(this);
        }
        this.isOpenChange.emit(this._isOpen);
      },
      enumerable: true,
      configurable: true
    });
    AccordionPanel.prototype.ngOnInit = function() {
      this.accordion.addPanel(this);
    };
    AccordionPanel.prototype.ngOnDestroy = function() {
      this.accordion.removePanel(this);
    };
    AccordionPanel.prototype.toggleOpen = function(event) {
      event.preventDefault();
      if (!this.isDisabled) {
        this.isOpen = !this.isOpen;
      }
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], AccordionPanel.prototype, "isDisabled", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], AccordionPanel.prototype, "isOpen", null);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], AccordionPanel.prototype, "isOpenChange", void 0);
    AccordionPanel = __decorate([core_1.Component({
      selector: 'sui-accordion-panel',
      directives: [collapse_1.Collapse, common_1.NgClass],
      template: "\n<div class=\"title\" [ngClass]=\"{ active: isOpen }\" (click)=\"toggleOpen($event)\">\n    <ng-content select=\"[title]\"></ng-content>\n</div>\n<div [suiCollapse]=\"!isOpen\">\n    <div class=\"content\" [ngClass]=\"{ active: isOpen }\">\n        <ng-content select=\"[content]\"></ng-content>\n    </div>\n</div>\n",
      styles: [".content { padding: .5em 0 1em } :host:last-child .content { padding-bottom: 0 }"]
    }), __param(0, core_1.Inject(accordion_component_1.Accordion)), __metadata('design:paramtypes', [accordion_component_1.Accordion])], AccordionPanel);
    return AccordionPanel;
  }());
  exports.AccordionPanel = AccordionPanel;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/accordion", ["./accordion/accordion.component", "./accordion/accordion-panel.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var accordion_component_1 = $__require('./accordion/accordion.component');
  var accordion_panel_component_1 = $__require('./accordion/accordion-panel.component');
  var accordion_component_2 = $__require('./accordion/accordion.component');
  exports.Accordion = accordion_component_2.Accordion;
  var accordion_panel_component_2 = $__require('./accordion/accordion-panel.component');
  exports.AccordionPanel = accordion_panel_component_2.AccordionPanel;
  exports.ACCORDION_DIRECTIVES = [accordion_component_1.Accordion, accordion_panel_component_1.AccordionPanel];
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/checkbox/checkbox.component", ["angular2/core", "angular2/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var common_1 = $__require('angular2/common');
  var Checkbox = (function() {
    function Checkbox() {
      this.classes = true;
      this.checked = false;
      this.checkChange = new core_1.EventEmitter(false);
      this.isDisabled = false;
      this.isReadonly = false;
    }
    Object.defineProperty(Checkbox.prototype, "checkedAttribute", {
      get: function() {
        return this.checked ? "" : null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Checkbox.prototype, "isDisabledAttribute", {
      get: function() {
        return this.isDisabled ? "disabled" : null;
      },
      enumerable: true,
      configurable: true
    });
    Checkbox.prototype.onClick = function() {
      if (!this.isDisabled && !this.isReadonly) {
        this.toggle();
      }
    };
    Checkbox.prototype.toggle = function() {
      this.checked = !this.checked;
      this.checkChange.emit(this.checked);
    };
    Checkbox.prototype.writeValue = function(value) {
      var _this = this;
      setTimeout(function() {
        _this.checked = value;
      });
    };
    __decorate([core_1.HostBinding('class.ui'), core_1.HostBinding('class.checkbox'), __metadata('design:type', Object)], Checkbox.prototype, "classes", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], Checkbox.prototype, "name", void 0);
    __decorate([core_1.HostBinding('class.checked'), __metadata('design:type', Boolean)], Checkbox.prototype, "checked", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Checkbox.prototype, "checkChange", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Checkbox.prototype, "isDisabled", void 0);
    __decorate([core_1.HostBinding('class.read-only'), core_1.Input(), __metadata('design:type', Boolean)], Checkbox.prototype, "isReadonly", void 0);
    __decorate([core_1.HostListener('click'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], Checkbox.prototype, "onClick", null);
    Checkbox = __decorate([core_1.Component({
      selector: 'sui-checkbox',
      template: "\n<input class=\"hidden\" type=\"checkbox\" [attr.name]=\"name\" [attr.checked]=\"checkedAttribute\" [attr.disabled]=\"isDisabledAttribute\">\n<label>\n    <ng-content></ng-content>\n</label>\n"
    }), __metadata('design:paramtypes', [])], Checkbox);
    return Checkbox;
  }());
  exports.Checkbox = Checkbox;
  var CUSTOM_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function() {
      return CheckboxValueAccessor;
    }),
    multi: true
  });
  var CheckboxValueAccessor = (function() {
    function CheckboxValueAccessor(host) {
      this.host = host;
      this.onChange = function() {};
      this.onTouched = function() {};
    }
    CheckboxValueAccessor.prototype.writeValue = function(value) {
      this.host.writeValue(!!value);
    };
    CheckboxValueAccessor.prototype.registerOnChange = function(fn) {
      this.onChange = fn;
    };
    CheckboxValueAccessor.prototype.registerOnTouched = function(fn) {
      this.onTouched = fn;
    };
    CheckboxValueAccessor = __decorate([core_1.Directive({
      selector: 'sui-checkbox',
      host: {'(checkChange)': 'onChange($event)'},
      providers: [CUSTOM_VALUE_ACCESSOR]
    }), __metadata('design:paramtypes', [Checkbox])], CheckboxValueAccessor);
    return CheckboxValueAccessor;
  }());
  exports.CheckboxValueAccessor = CheckboxValueAccessor;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/checkbox/radiobutton.component", ["angular2/core", "angular2/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var common_1 = $__require('angular2/common');
  var RadioButton = (function() {
    function RadioButton() {
      this.classes = true;
      this.value = "";
      this.isDisabled = false;
      this.isReadonly = false;
      this.checked = false;
      this.currentValueChange = new core_1.EventEmitter(false);
    }
    Object.defineProperty(RadioButton.prototype, "checkedAttribute", {
      get: function() {
        return this.checked ? "" : null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(RadioButton.prototype, "isDisabledAttribute", {
      get: function() {
        return this.isDisabled ? "disabled" : null;
      },
      enumerable: true,
      configurable: true
    });
    RadioButton.prototype.onClick = function() {
      if (!this.isDisabled && !this.isReadonly) {
        this.currentValue = this.value;
        this.currentValueChange.emit(this.currentValue);
        this.update();
      }
    };
    RadioButton.prototype.update = function() {
      var _this = this;
      setTimeout(function() {
        _this.checked = _this.currentValue == _this.value;
      });
    };
    RadioButton.prototype.writeValue = function(value) {
      this.currentValue = value;
      this.update();
    };
    __decorate([core_1.HostBinding('class.ui'), core_1.HostBinding('class.radio'), core_1.HostBinding('class.checkbox'), __metadata('design:type', Object)], RadioButton.prototype, "classes", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], RadioButton.prototype, "name", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Object)], RadioButton.prototype, "value", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], RadioButton.prototype, "isDisabled", void 0);
    __decorate([core_1.HostBinding('class.read-only'), core_1.Input(), __metadata('design:type', Boolean)], RadioButton.prototype, "isReadonly", void 0);
    __decorate([core_1.HostBinding('class.checked'), __metadata('design:type', Boolean)], RadioButton.prototype, "checked", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], RadioButton.prototype, "currentValueChange", void 0);
    __decorate([core_1.HostListener('click'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], RadioButton.prototype, "onClick", null);
    RadioButton = __decorate([core_1.Component({
      selector: 'sui-radio-button[ngModel]',
      directives: [],
      template: "\n<input class=\"hidden\" type=\"checkbox\" [attr.name]=\"name\" [attr.value]=\"value\" [attr.checked]=\"checkedAttribute\" [attr.disabled]=\"isDisabledAttribute\">\n<label>\n    <ng-content></ng-content>\n</label>\n"
    }), __metadata('design:paramtypes', [])], RadioButton);
    return RadioButton;
  }());
  exports.RadioButton = RadioButton;
  var CUSTOM_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function() {
      return RadioButtonValueAccessor;
    }),
    multi: true
  });
  var RadioButtonValueAccessor = (function() {
    function RadioButtonValueAccessor(host) {
      this.host = host;
      this.onChange = function() {};
      this.onTouched = function() {};
    }
    RadioButtonValueAccessor.prototype.writeValue = function(value) {
      this.host.writeValue(value);
    };
    RadioButtonValueAccessor.prototype.registerOnChange = function(fn) {
      this.onChange = fn;
    };
    RadioButtonValueAccessor.prototype.registerOnTouched = function(fn) {
      this.onTouched = fn;
    };
    RadioButtonValueAccessor = __decorate([core_1.Directive({
      selector: 'sui-radio-button',
      host: {'(currentValueChange)': 'onChange($event)'},
      providers: [CUSTOM_VALUE_ACCESSOR]
    }), __metadata('design:paramtypes', [RadioButton])], RadioButtonValueAccessor);
    return RadioButtonValueAccessor;
  }());
  exports.RadioButtonValueAccessor = RadioButtonValueAccessor;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/checkbox", ["./checkbox/checkbox.component", "./checkbox/radiobutton.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var checkbox_component_1 = $__require('./checkbox/checkbox.component');
  var radiobutton_component_1 = $__require('./checkbox/radiobutton.component');
  var checkbox_component_2 = $__require('./checkbox/checkbox.component');
  exports.Checkbox = checkbox_component_2.Checkbox;
  exports.CheckboxValueAccessor = checkbox_component_2.CheckboxValueAccessor;
  var radiobutton_component_2 = $__require('./checkbox/radiobutton.component');
  exports.RadioButton = radiobutton_component_2.RadioButton;
  exports.RadioButtonValueAccessor = radiobutton_component_2.RadioButtonValueAccessor;
  exports.CHECKBOX_DIRECTIVES = [checkbox_component_1.Checkbox, checkbox_component_1.CheckboxValueAccessor, radiobutton_component_1.RadioButton, radiobutton_component_1.RadioButtonValueAccessor];
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/collapse/collapse.component", ["angular2/core", "angular2/src/animate/animation_builder"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var animation_builder_1 = $__require('angular2/src/animate/animation_builder');
  var Collapse = (function() {
    function Collapse(_ab, _el) {
      this.display = "none";
      this.isExpanded = true;
      this.isCollapsed = false;
      this.isCollapsing = false;
      this.transitionDuration = 300;
      this._ab = _ab;
      this._el = _el;
    }
    Object.defineProperty(Collapse.prototype, "suiCollapse", {
      get: function() {
        return this.isExpanded;
      },
      set: function(value) {
        this.isExpanded = value;
        this.isCollapsed = !this.isExpanded;
        this.toggle();
      },
      enumerable: true,
      configurable: true
    });
    Collapse.prototype.ngOnInit = function() {
      this.animation = this._ab.css();
      this.animation.setDuration(this.transitionDuration);
    };
    Collapse.prototype.toggle = function() {
      if (this.isExpanded) {
        this.hide();
      } else {
        this.show();
      }
    };
    Collapse.prototype.hide = function() {
      var _this = this;
      this.isCollapsing = true;
      this.isExpanded = false;
      setTimeout(function() {
        _this.animation.setFromStyles({
          height: _this._el.nativeElement.scrollHeight + 'px',
          padding: "0 1px 0 1px",
          margin: "0 -1px 0 -1px"
        }).setToStyles({
          height: '0',
          overflow: 'hidden'
        });
        _this.animation.start(_this._el.nativeElement).onComplete(function() {
          if (_this._el.nativeElement.offsetHeight === 0) {
            _this.display = 'none';
          }
          _this.isCollapsing = false;
          _this.isCollapsed = true;
        });
      }, 4);
    };
    Collapse.prototype.show = function() {
      var _this = this;
      this.isCollapsing = true;
      this.isCollapsed = false;
      this.display = '';
      setTimeout(function() {
        _this.animation.setFromStyles({
          height: _this._el.nativeElement.offsetHeight,
          overflow: 'hidden'
        }).setToStyles({
          height: _this._el.nativeElement.scrollHeight + 'px',
          padding: "0 1px 0 1px",
          margin: "0 -1px 0 -1px"
        });
        _this.animation.start(_this._el.nativeElement).onComplete(function() {
          _this.isCollapsing = false;
          _this.isExpanded = true;
        });
      }, 4);
    };
    __decorate([core_1.HostBinding('style.display'), __metadata('design:type', String)], Collapse.prototype, "display", void 0);
    __decorate([core_1.HostBinding('class.expanded'), __metadata('design:type', Boolean)], Collapse.prototype, "isExpanded", void 0);
    __decorate([core_1.HostBinding('class.collapsed'), __metadata('design:type', Boolean)], Collapse.prototype, "isCollapsed", void 0);
    __decorate([core_1.HostBinding('class.collapsing'), __metadata('design:type', Boolean)], Collapse.prototype, "isCollapsing", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], Collapse.prototype, "transitionDuration", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean), __metadata('design:paramtypes', [Boolean])], Collapse.prototype, "suiCollapse", null);
    Collapse = __decorate([core_1.Directive({selector: '[suiCollapse]'}), __metadata('design:paramtypes', [animation_builder_1.AnimationBuilder, core_1.ElementRef])], Collapse);
    return Collapse;
  }());
  exports.Collapse = Collapse;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/collapse", ["./collapse/collapse.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var collapse_component_1 = $__require('./collapse/collapse.component');
  exports.COLLAPSE_DIRECTIVES = collapse_component_1.Collapse;
  var collapse_component_2 = $__require('./collapse/collapse.component');
  exports.Collapse = collapse_component_2.Collapse;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/dimmer/dimmer.component", ["angular2/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var Dimmer = (function() {
    function Dimmer() {
      this.classes = true;
      this.isClickable = true;
      this.isDimmed = false;
      this.isDimmedChange = new core_1.EventEmitter(false);
    }
    Dimmer.prototype.click = function() {
      if (this.isClickable) {
        this.isDimmed = false;
        this.isDimmedChange.emit(this.isDimmed);
      }
    };
    __decorate([core_1.HostBinding('class.ui'), core_1.HostBinding('class.dimmer'), __metadata('design:type', Object)], Dimmer.prototype, "classes", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Dimmer.prototype, "isClickable", void 0);
    __decorate([core_1.HostBinding('class.active'), core_1.Input(), __metadata('design:type', Boolean)], Dimmer.prototype, "isDimmed", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Dimmer.prototype, "isDimmedChange", void 0);
    __decorate([core_1.HostListener('click'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], Dimmer.prototype, "click", null);
    Dimmer = __decorate([core_1.Component({
      selector: 'sui-dimmer',
      template: "\n<div class=\"content\">\n    <div class=\"center\">\n        <ng-content></ng-content>\n    </div>\n</div>\n",
      styles: ["\n:host.dimmer {\n    transition: visibility 0.3s, opacity 0.3s ease;\n    display: block;\n    visibility: hidden;\n}\n\n:host.active {\n    visibility: visible;\n}\n"]
    }), __metadata('design:paramtypes', [])], Dimmer);
    return Dimmer;
  }());
  exports.Dimmer = Dimmer;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/dimmer", ["./dimmer/dimmer.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var dimmer_component_1 = $__require('./dimmer/dimmer.component');
  var dimmer_component_2 = $__require('./dimmer/dimmer.component');
  exports.Dimmer = dimmer_component_2.Dimmer;
  exports.DIMMER_DIRECTIVES = [dimmer_component_1.Dimmer];
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/dropdown/dropdown.service", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.ALWAYS = 'always';
  exports.DISABLED = 'disabled';
  exports.OUTSIDECLICK = 'outsideClick';
  exports.NONINPUT = 'nonInput';
  var DropdownService = (function() {
    function DropdownService() {
      this.closeDropdownBind = this.closeDropdown.bind(this);
      this.keybindFilterBind = this.keybindFilter.bind(this);
    }
    DropdownService.prototype.open = function(dropdownScope) {
      if (!this.openScope) {
        window.document.addEventListener('click', this.closeDropdownBind, true);
        window.document.addEventListener('keydown', this.keybindFilterBind);
      }
      this.openScope = dropdownScope;
    };
    DropdownService.prototype.close = function(dropdownScope) {
      if (this.openScope !== dropdownScope) {
        return;
      }
      this.openScope = void 0;
      window.document.removeEventListener('click', this.closeDropdownBind, true);
      window.document.removeEventListener('keydown', this.keybindFilterBind);
    };
    DropdownService.prototype.closeDropdown = function(event) {
      if (!this.openScope) {
        return;
      }
      if (event && this.openScope.autoClose === exports.DISABLED) {
        return;
      }
      if (event && this.openScope.el.nativeElement.contains(event.target) && !this.openScope.menuEl.nativeElement.contains(event.target)) {
        return;
      }
      if (event && this.openScope.autoClose === exports.NONINPUT && this.openScope.menuEl && /input|textarea/i.test(event.target.tagName) && this.openScope.menuEl.nativeElement.contains(event.target)) {
        return;
      }
      if (event && this.openScope.autoClose === exports.OUTSIDECLICK && this.openScope.menuEl && this.openScope.menuEl.nativeElement.contains(event.target)) {
        return;
      }
      this.openScope.isOpen = false;
    };
    DropdownService.prototype.keybindFilter = function(event) {
      if (event.which === 27) {
        this.openScope.focusToggleElement();
        this.closeDropdown(void 0);
        return;
      }
      if (this.openScope.keyboardNav && this.openScope.isOpen && (event.which === 38 || event.which === 40)) {
        event.preventDefault();
        event.stopPropagation();
        this.openScope.focusDropdownEntry(event.which);
      }
    };
    return DropdownService;
  }());
  exports.DropdownService = DropdownService;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/dropdown/dropdown.directive", ["angular2/core", "./dropdown.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var dropdown_service_1 = $__require('./dropdown.service');
  var Dropdown = (function() {
    function Dropdown(el) {
      this.onToggle = new core_1.EventEmitter(false);
      this.isOpenChange = new core_1.EventEmitter(false);
      this._dropdownService = new dropdown_service_1.DropdownService();
      this.el = el;
    }
    Object.defineProperty(Dropdown.prototype, "isOpen", {
      get: function() {
        return this._isOpen;
      },
      set: function(value) {
        this._isOpen = !!value;
        if (this.appendToBody && this.menuEl) {}
        if (this.isOpen) {
          this.focusToggleElement();
          this._dropdownService.open(this);
        } else {
          this._dropdownService.close(this);
          this.selectedOption = void 0;
        }
        this.onToggle.emit(this.isOpen);
        this.isOpenChange.emit(this.isOpen);
      },
      enumerable: true,
      configurable: true
    });
    Dropdown.prototype.ngOnInit = function() {
      this.autoClose = this.autoClose || dropdown_service_1.NONINPUT;
      if (this.isOpen) {}
    };
    Dropdown.prototype.ngOnDestroy = function() {
      if (this.appendToBody && this.menuEl) {
        this.menuEl.nativeElement.remove();
      }
    };
    Object.defineProperty(Dropdown.prototype, "dropDownMenu", {
      set: function(dropdownMenu) {
        this.menuEl = dropdownMenu.el;
        if (this.appendToBody) {
          window.document.body.appendChild(this.menuEl.nativeElement);
        }
      },
      enumerable: true,
      configurable: true
    });
    Dropdown.prototype.toggle = function(open) {
      return this.isOpen = arguments.length ? !!open : !this.isOpen;
    };
    Dropdown.prototype.focusDropdownEntry = function(keyCode) {
      var hostEl = this.menuEl ? this.menuEl.nativeElement : this.el.nativeElement.getElementsByTagName('ul')[0];
      if (!hostEl) {
        return;
      }
      var elems = hostEl.getElementsByTagName('a');
      if (!elems || !elems.length) {
        return;
      }
      switch (keyCode) {
        case (40):
          if (typeof this.selectedOption !== 'number') {
            this.selectedOption = 0;
            break;
          }
          if (this.selectedOption === elems.length - 1) {
            break;
          }
          this.selectedOption++;
          break;
        case (38):
          if (typeof this.selectedOption !== 'number') {
            return;
          }
          if (this.selectedOption === 0) {
            break;
          }
          this.selectedOption--;
          break;
        default:
          break;
      }
      elems[this.selectedOption].focus();
    };
    Dropdown.prototype.focusToggleElement = function() {
      this.el.nativeElement.focus();
    };
    Dropdown.prototype.toggleDropdown = function(event) {
      event.stopPropagation();
      if (!this.menuEl.nativeElement.contains(event.target)) {
        this.toggle();
      }
      return false;
    };
    __decorate([core_1.HostBinding('class.visible'), core_1.Input(), __metadata('design:type', Boolean)], Dropdown.prototype, "isOpen", null);
    __decorate([core_1.Input(), __metadata('design:type', String)], Dropdown.prototype, "autoClose", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Dropdown.prototype, "keyboardNav", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Dropdown.prototype, "appendToBody", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Dropdown.prototype, "onToggle", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Dropdown.prototype, "isOpenChange", void 0);
    __decorate([core_1.HostListener('click', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [MouseEvent]), __metadata('design:returntype', Boolean)], Dropdown.prototype, "toggleDropdown", null);
    Dropdown = __decorate([core_1.Directive({selector: '[dropdown]'}), __metadata('design:paramtypes', [core_1.ElementRef])], Dropdown);
    return Dropdown;
  }());
  exports.Dropdown = Dropdown;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/dropdown/dropdown-menu.directive", ["angular2/core", "./dropdown.directive"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('angular2/core');
  var dropdown_directive_1 = $__require('./dropdown.directive');
  var DropdownMenu = (function() {
    function DropdownMenu(dropdown, el) {
      this.dropdown = dropdown;
      this.el = el;
    }
    Object.defineProperty(DropdownMenu.prototype, "isOpen", {
      get: function() {
        return this.dropdown.isOpen;
      },
      enumerable: true,
      configurable: true
    });
    DropdownMenu.prototype.ngOnInit = function() {
      this.dropdown.dropDownMenu = this;
    };
    __decorate([core_1.HostBinding('class.visible'), core_1.HostBinding('class.transition'), __metadata('design:type', Boolean)], DropdownMenu.prototype, "isOpen", null);
    DropdownMenu = __decorate([core_1.Directive({selector: '[dropdownMenu]'}), __param(0, core_1.Host()), __metadata('design:paramtypes', [dropdown_directive_1.Dropdown, core_1.ElementRef])], DropdownMenu);
    return DropdownMenu;
  }());
  exports.DropdownMenu = DropdownMenu;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/dropdown", ["./dropdown/dropdown.directive", "./dropdown/dropdown-menu.directive"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var dropdown_directive_1 = $__require('./dropdown/dropdown.directive');
  var dropdown_menu_directive_1 = $__require('./dropdown/dropdown-menu.directive');
  var dropdown_directive_2 = $__require('./dropdown/dropdown.directive');
  exports.Dropdown = dropdown_directive_2.Dropdown;
  var dropdown_menu_directive_2 = $__require('./dropdown/dropdown-menu.directive');
  exports.DropdownMenu = dropdown_menu_directive_2.DropdownMenu;
  exports.DROPDOWN_DIRECTIVES = [dropdown_directive_1.Dropdown, dropdown_menu_directive_1.DropdownMenu];
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/ng2-semantic-ui", ["./components/accordion", "./components/checkbox", "./components/collapse", "./components/dimmer", "./components/dropdown"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var accordion_1 = $__require('./components/accordion');
  var checkbox_1 = $__require('./components/checkbox');
  var collapse_1 = $__require('./components/collapse');
  var dimmer_1 = $__require('./components/dimmer');
  var dropdown_1 = $__require('./components/dropdown');
  __export($__require('./components/accordion'));
  __export($__require('./components/checkbox'));
  __export($__require('./components/collapse'));
  __export($__require('./components/dimmer'));
  __export($__require('./components/dropdown'));
  exports.DIRECTIVES = [accordion_1.ACCORDION_DIRECTIVES, checkbox_1.CHECKBOX_DIRECTIVES, collapse_1.COLLAPSE_DIRECTIVES, dimmer_1.DIMMER_DIRECTIVES, dropdown_1.DROPDOWN_DIRECTIVES];
  return module.exports;
});

//# sourceMappingURL=ng2-semantic-ui.js.map