System.registerDynamic("ng2-semantic-ui/components/accordion/accordion.component", ["@angular/core"], true, function($__require, exports, module) {
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
  var core_1 = $__require('@angular/core');
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

System.registerDynamic("ng2-semantic-ui/components/accordion/accordion-panel.component", ["@angular/core", "@angular/common", "./accordion.component", "./../collapse"], true, function($__require, exports, module) {
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
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

System.registerDynamic("ng2-semantic-ui/components/checkbox/checkbox.component", ["@angular/core", "@angular/common"], true, function($__require, exports, module) {
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
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
      template: "\n<input class=\"hidden\" type=\"checkbox\" [attr.name]=\"name\" [attr.checked]=\"checkedAttribute\" [attr.disabled]=\"isDisabledAttribute\" [(ngModel)]=\"checked\">\n<label>\n    <ng-content></ng-content>\n</label>\n"
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

System.registerDynamic("ng2-semantic-ui/components/checkbox/radiobutton.component", ["@angular/core", "@angular/common"], true, function($__require, exports, module) {
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
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
      template: "\n<input class=\"hidden\"\n       type=\"checkbox\"\n       [attr.name]=\"name\"\n       [attr.checked]=\"checkedAttribute\"\n       [attr.disabled]=\"isDisabledAttribute\"\n       [ngModel]=\"checked\"\n       (ngModel)=\"currentValue = value\">\n<label>\n    <ng-content></ng-content>\n</label>\n"
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

System.registerDynamic("ng2-semantic-ui/components/collapse/collapse.component", ["@angular/core"], true, function($__require, exports, module) {
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
  var core_1 = $__require('@angular/core');
  var Collapse = (function() {
    function Collapse(_el, _renderer) {
      this.display = "none";
      this.isExpanded = true;
      this.isCollapsed = false;
      this.isCollapsing = false;
      this.transitionDuration = 300;
      this._el = _el;
      this._renderer = _renderer;
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
    Collapse.prototype.ngOnInit = function() {};
    Collapse.prototype.toggle = function() {
      if (this.isExpanded) {
        this.hide();
      } else {
        this.show();
      }
    };
    Collapse.prototype.hide = function() {
      this.isCollapsing = true;
      this.isExpanded = false;
      this._renderer.setElementStyle(this._el.nativeElement, 'overflow', 'hidden');
      this._renderer.setElementStyle(this._el.nativeElement, 'height', '0');
      this.isCollapsing = false;
      this.isCollapsed = true;
    };
    Collapse.prototype.show = function() {
      this.isCollapsing = true;
      this.isCollapsed = false;
      this.display = '';
      this._renderer.setElementStyle(this._el.nativeElement, 'overflow', 'visible');
      this._renderer.setElementStyle(this._el.nativeElement, 'height', 'auto');
      this.isCollapsing = false;
      this.isExpanded = true;
    };
    __decorate([core_1.HostBinding('class.expanded'), __metadata('design:type', Boolean)], Collapse.prototype, "isExpanded", void 0);
    __decorate([core_1.HostBinding('class.collapsed'), __metadata('design:type', Boolean)], Collapse.prototype, "isCollapsed", void 0);
    __decorate([core_1.HostBinding('class.collapsing'), __metadata('design:type', Boolean)], Collapse.prototype, "isCollapsing", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], Collapse.prototype, "transitionDuration", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean), __metadata('design:paramtypes', [Boolean])], Collapse.prototype, "suiCollapse", null);
    Collapse = __decorate([core_1.Directive({selector: '[suiCollapse]'}), __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])], Collapse);
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
  var collapse_component_2 = $__require('./collapse/collapse.component');
  exports.Collapse = collapse_component_2.Collapse;
  exports.COLLAPSE_DIRECTIVES = [collapse_component_1.Collapse];
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/dimmer/dimmer.component", ["@angular/core"], true, function($__require, exports, module) {
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
  var core_1 = $__require('@angular/core');
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

System.registerDynamic("ng2-semantic-ui/components/progress/progress.component", ["@angular/core"], true, function($__require, exports, module) {
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
  var core_1 = $__require('@angular/core');
  var Progress = (function() {
    function Progress() {
      this.classes = true;
      this._value = 0;
      this.unscaledValue = 0;
      this._maximum = 100;
      this.autoSuccess = true;
      this.progress = true;
      this.precision = 0;
    }
    Object.defineProperty(Progress.prototype, "reachedMaximum", {
      get: function() {
        return this.value == this.maximum && this.autoSuccess;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Progress.prototype, "value", {
      get: function() {
        return this._value;
      },
      set: function(value) {
        value = parseFloat(value);
        if (Number.isNaN(value)) {
          return;
        }
        value = Math.max(value, 0);
        this.unscaledValue = value;
        value = Math.min(value, this.maximum);
        this._value = parseFloat((value / this.maximum * 100).toFixed(Math.min(20, Math.max(this.precision, 0))));
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Progress.prototype, "maximum", {
      get: function() {
        return this._maximum;
      },
      set: function(value) {
        value = parseFloat(value);
        if (Number.isNaN(value)) {
          return;
        }
        value = Math.max(value, 0);
        this._maximum = value;
        this.value = this.unscaledValue;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Progress.prototype, "percentage", {
      get: function() {
        return this._value.toString();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Progress.prototype, "classValue", {
      set: function(value) {
        if (value.includes("attached") || value.includes("tiny")) {
          this.progress = false;
        }
      },
      enumerable: true,
      configurable: true
    });
    __decorate([core_1.HostBinding('class.ui'), core_1.HostBinding('class.progress'), __metadata('design:type', Object)], Progress.prototype, "classes", void 0);
    __decorate([core_1.HostBinding('class.success'), __metadata('design:type', Object)], Progress.prototype, "reachedMaximum", null);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Progress.prototype, "autoSuccess", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Progress.prototype, "progress", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], Progress.prototype, "precision", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], Progress.prototype, "value", null);
    __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], Progress.prototype, "maximum", null);
    __decorate([core_1.HostBinding('attr.data-percent'), __metadata('design:type', String)], Progress.prototype, "percentage", null);
    __decorate([core_1.Input('class'), __metadata('design:type', String), __metadata('design:paramtypes', [String])], Progress.prototype, "classValue", null);
    Progress = __decorate([core_1.Component({
      selector: 'sui-progress',
      directives: [],
      template: "\n<div class=\"bar\" [style.width.%]=\"percentage\">\n    <div class=\"progress\" *ngIf=\"progress\">{{ percentage }}%</div>\n</div>\n<div class=\"label\">\n    <ng-content></ng-content>\n</div>\n",
      styles: [".bar { transition-duration: 300ms !important; }"]
    }), __metadata('design:paramtypes', [])], Progress);
    return Progress;
  }());
  exports.Progress = Progress;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/progress", ["./progress/progress.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var progress_component_1 = $__require('./progress/progress.component');
  var progress_component_2 = $__require('./progress/progress.component');
  exports.Progress = progress_component_2.Progress;
  exports.PROGRESS_DIRECTIVES = [progress_component_1.Progress];
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/message/message.component", ["@angular/core"], true, function($__require, exports, module) {
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
  var core_1 = $__require('@angular/core');
  var Message = (function() {
    function Message() {
      this.dismissible = true;
      this.onDismiss = new core_1.EventEmitter(false);
      this.dismissed = false;
      this.classes = "";
    }
    Message.prototype.dismiss = function() {
      this.dismissed = true;
      this.onDismiss.emit(this);
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Message.prototype, "dismissible", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Message.prototype, "onDismiss", void 0);
    __decorate([core_1.Input("class"), __metadata('design:type', String)], Message.prototype, "classes", void 0);
    Message = __decorate([core_1.Component({
      selector: 'sui-message',
      directives: [],
      template: "\n<div class=\"ui message {{ classes }}\" *ngIf=\"!dismissed\">\n    <i class=\"close icon\" *ngIf=\"dismissible\" (click)=\"dismiss()\"></i>\n    <ng-content></ng-content>\n</div>\n"
    }), __metadata('design:paramtypes', [])], Message);
    return Message;
  }());
  exports.Message = Message;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/message", ["./message/message.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var message_component_1 = $__require('./message/message.component');
  var message_component_2 = $__require('./message/message.component');
  exports.Message = message_component_2.Message;
  exports.MESSAGE_DIRECTIVES = [message_component_1.Message];
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/rating/rating.component", ["@angular/core", "@angular/common"], true, function($__require, exports, module) {
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var Rating = (function() {
    function Rating() {
      this.ratingClasses = true;
      this._value = 0;
      this._max = 5;
      this.valueChange = new core_1.EventEmitter(false);
      this._hoveredIndex = -1;
      this.isReadonly = false;
    }
    Object.defineProperty(Rating.prototype, "max", {
      set: function(value) {
        this._max = parseInt(value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Rating.prototype, "icons", {
      get: function() {
        return Array(this._max);
      },
      enumerable: true,
      configurable: true
    });
    Rating.prototype.mouseover = function(i) {
      this._hoveredIndex = i;
    };
    Rating.prototype.mouseout = function() {
      this._hoveredIndex = -1;
    };
    Rating.prototype.click = function(i) {
      if (!this.isReadonly) {
        this._value = i + 1;
        this.valueChange.emit(this._value);
      }
    };
    Rating.prototype.writeValue = function(value) {
      this._value = value;
    };
    __decorate([core_1.HostBinding('class.ui'), core_1.HostBinding('class.rating'), __metadata('design:type', Object)], Rating.prototype, "ratingClasses", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], Rating.prototype, "max", null);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Rating.prototype, "valueChange", void 0);
    __decorate([core_1.HostListener('mouseout'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], Rating.prototype, "mouseout", null);
    __decorate([core_1.HostBinding('class.read-only'), core_1.Input(), __metadata('design:type', Boolean)], Rating.prototype, "isReadonly", void 0);
    Rating = __decorate([core_1.Component({
      selector: 'sui-rating',
      template: "\n<i class=\"icon\"\n   *ngFor=\"let icon of icons; let i = index\"\n   (mouseover)=\"mouseover(i)\"\n   (click)=\"click(i)\"\n   [class.selected]=\"_hoveredIndex >= i && !isReadonly\"\n   [class.active]=\"_value > i\">\n</i>\n",
      styles: [":host.read-only .icon { cursor: auto }"]
    }), __metadata('design:paramtypes', [])], Rating);
    return Rating;
  }());
  exports.Rating = Rating;
  var CUSTOM_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function() {
      return RatingValueAccessor;
    }),
    multi: true
  });
  var RatingValueAccessor = (function() {
    function RatingValueAccessor(host) {
      this.host = host;
      this.onChange = function() {};
      this.onTouched = function() {};
    }
    RatingValueAccessor.prototype.writeValue = function(value) {
      this.host.writeValue(value);
    };
    RatingValueAccessor.prototype.registerOnChange = function(fn) {
      this.onChange = fn;
    };
    RatingValueAccessor.prototype.registerOnTouched = function(fn) {
      this.onTouched = fn;
    };
    RatingValueAccessor = __decorate([core_1.Directive({
      selector: 'sui-rating',
      host: {'(valueChange)': 'onChange($event)'},
      providers: [CUSTOM_VALUE_ACCESSOR]
    }), __metadata('design:paramtypes', [Rating])], RatingValueAccessor);
    return RatingValueAccessor;
  }());
  exports.RatingValueAccessor = RatingValueAccessor;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/rating", ["./rating/rating.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var rating_component_1 = $__require('./rating/rating.component');
  var rating_component_2 = $__require('./rating/rating.component');
  exports.Rating = rating_component_2.Rating;
  exports.RatingValueAccessor = rating_component_2.RatingValueAccessor;
  exports.RATING_DIRECTIVES = [rating_component_1.Rating, rating_component_1.RatingValueAccessor];
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/search/search.component", ["@angular/core", "@angular/common", "../dropdown"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var dropdown_1 = $__require('../dropdown');
  var Search = (function(_super) {
    __extends(Search, _super);
    function Search(el) {
      _super.call(this, el);
      this.searchClasses = true;
      this.placeholder = "Search...";
      this.searchDelay = 200;
      this.icon = true;
      this.selectedOptionChange = new core_1.EventEmitter(false);
      this.onItemSelected = new core_1.EventEmitter(false);
      this._options = [];
      this._allowEmptyQuery = false;
      this._query = "";
      this._results = [];
      this._resultsCache = {};
      this._loading = false;
      this._service.itemClass = "result";
      this._service.itemSelectedClass = "active";
    }
    Object.defineProperty(Search.prototype, "options", {
      get: function() {
        return this._options;
      },
      set: function(value) {
        if (typeof(value) == "function") {
          this._optionsLookup = value;
          return;
        }
        this._options = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Search.prototype, "query", {
      get: function() {
        return this._query;
      },
      set: function(value) {
        var _this = this;
        this._query = value;
        clearTimeout(this._queryTimer);
        if (value || this._allowEmptyQuery) {
          this._queryTimer = setTimeout(function() {
            _this.search(function() {
              _this.isOpen = true;
            });
          }, this.searchDelay);
          return;
        }
        if (!this._allowEmptyQuery) {
          this.isOpen = false;
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Search.prototype, "results", {
      get: function() {
        return this._results;
      },
      enumerable: true,
      configurable: true
    });
    Search.prototype.search = function(callback) {
      var _this = this;
      this._loading = true;
      if (this._optionsLookup) {
        if (this._resultsCache[this._query]) {
          this._results = this._resultsCache[this._query];
          this._loading = false;
          if (callback) {
            callback();
          }
          return;
        }
        this._optionsLookup(this._query).then(function(results) {
          _this._resultsCache[_this._query] = results;
          _this.search(callback);
        });
        return;
      }
      this._results = this.options.filter(function(o) {
        return _this.deepValue(o, _this.optionsField).toString().slice(0, _this.query.length).toLowerCase() == _this.query.toLowerCase();
      });
      this._loading = false;
      if (callback) {
        callback();
      }
    };
    Search.prototype.result = function(i) {
      return this.deepValue(this._results[i], this.optionsField);
    };
    Search.prototype.deepValue = function(object, path) {
      if (!object) {
        return;
      }
      if (!path) {
        return object;
      }
      for (var i = 0,
          p = path.split('.'),
          len = p.length; i < len; i++) {
        object = object[p[i]];
      }
      return object;
    };
    Search.prototype.select = function(result) {
      this.selectedOption = result;
      this.selectedOptionChange.emit(result);
      this.onItemSelected.emit(result);
      this._query = this.deepValue(result, this.optionsField);
      this.isOpen = false;
    };
    Search.prototype.writeValue = function(value) {
      this.selectedOption = value;
      this._query = this.deepValue(value, this.optionsField);
    };
    Search.prototype.ngAfterContentInit = function() {
      return;
    };
    Search.prototype.ngAfterViewInit = function() {
      this._menu.service = this._service;
    };
    Search.prototype.click = function(event) {
      var _this = this;
      event.stopPropagation();
      if (!this._service.menuElement.nativeElement.contains(event.target)) {
        if (!this.isOpen && this.query) {
          if (this.results.length) {
            this.isOpen = true;
          }
          this._loading = true;
          this.search(function() {
            _this.isOpen = true;
            _this._loading = false;
          });
        }
      }
      return false;
    };
    __decorate([core_1.ViewChild(dropdown_1.DropdownMenu), __metadata('design:type', dropdown_1.DropdownMenu)], Search.prototype, "_menu", void 0);
    __decorate([core_1.HostBinding('class.ui'), core_1.HostBinding('class.search'), __metadata('design:type', Object)], Search.prototype, "searchClasses", void 0);
    __decorate([core_1.HostBinding('class.loading'), __metadata('design:type', Boolean)], Search.prototype, "_loading", void 0);
    __decorate([core_1.HostListener('click', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [MouseEvent]), __metadata('design:returntype', Boolean)], Search.prototype, "click", null);
    Search = __decorate([core_1.Component({
      selector: 'sui-search',
      directives: [dropdown_1.DropdownMenu],
      inputs: ['placeholder', 'options', 'optionsField', 'searchDelay', 'icon'],
      outputs: ['selectedOptionChange', 'onItemSelected'],
      host: {
        '[class.visible]': 'isOpen',
        '[class.disabled]': 'isDisabled'
      },
      template: "\n<div class=\"ui icon input\">\n    <input class=\"prompt\" type=\"text\" [attr.placeholder]=\"placeholder\" autocomplete=\"off\" [(ngModel)]=\"query\">\n    <i *ngIf=\"icon\" class=\"search icon\"></i>\n  </div>\n<div class=\"results\" suiDropdownMenu>\n    <a class=\"result\" *ngFor=\"let r of results; let i = index\" (click)=\"select(r)\">\n        <div class=\"title\">{{ result(i) }}</div>\n    </a>\n    <div *ngIf=\"!results.length\" class=\"message empty\">\n        <div class=\"header\">No Results</div>\n        <div class=\"description\">Your search returned no results.</div>\n    </div>\n</div>\n"
    }), __metadata('design:paramtypes', [core_1.ElementRef])], Search);
    return Search;
  }(dropdown_1.Dropdown));
  exports.Search = Search;
  var CUSTOM_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function() {
      return SearchValueAccessor;
    }),
    multi: true
  });
  var SearchValueAccessor = (function() {
    function SearchValueAccessor(host) {
      this.onChange = function() {};
      this.onTouched = function() {};
      this.host = host;
    }
    SearchValueAccessor.prototype.writeValue = function(value) {
      this.host.writeValue(value);
    };
    SearchValueAccessor.prototype.registerOnChange = function(fn) {
      this.onChange = fn;
    };
    SearchValueAccessor.prototype.registerOnTouched = function(fn) {
      this.onTouched = fn;
    };
    SearchValueAccessor = __decorate([core_1.Directive({
      selector: 'sui-search',
      host: {'(selectedOptionChange)': 'onChange($event)'},
      providers: [CUSTOM_VALUE_ACCESSOR]
    }), __metadata('design:paramtypes', [Search])], SearchValueAccessor);
    return SearchValueAccessor;
  }());
  exports.SearchValueAccessor = SearchValueAccessor;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/search", ["./search/search.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var search_component_1 = $__require('./search/search.component');
  var search_component_2 = $__require('./search/search.component');
  exports.Search = search_component_2.Search;
  exports.SearchValueAccessor = search_component_2.SearchValueAccessor;
  exports.SEARCH_DIRECTIVES = [search_component_1.Search, search_component_1.SearchValueAccessor];
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/dropdown/dropdown.directive", ["@angular/core", "./dropdown.service", "./dropdown-menu.directive"], true, function($__require, exports, module) {
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
  var core_1 = $__require('@angular/core');
  var dropdown_service_1 = $__require('./dropdown.service');
  var dropdown_menu_directive_1 = $__require('./dropdown-menu.directive');
  var Dropdown = (function() {
    function Dropdown(el) {
      this._service = new dropdown_service_1.DropdownService();
      this._service.dropdownElement = el;
    }
    Object.defineProperty(Dropdown.prototype, "isOpen", {
      get: function() {
        return this._service.isOpen;
      },
      set: function(value) {
        this._service.isOpen = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Dropdown.prototype, "autoClose", {
      get: function() {
        return this._service.autoClose;
      },
      set: function(value) {
        this._service.autoClose = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Dropdown.prototype, "onToggle", {
      get: function() {
        return this._service.onToggle;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Dropdown.prototype, "isOpenChange", {
      get: function() {
        return this._service.isOpenChange;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Dropdown.prototype, "isDisabled", {
      get: function() {
        return this._service.isDisabled;
      },
      set: function(value) {
        this._service.isDisabled = value;
      },
      enumerable: true,
      configurable: true
    });
    Dropdown.prototype.ngAfterContentInit = function() {
      this._menu.service = this._service;
    };
    Dropdown.prototype.click = function(event) {
      event.stopPropagation();
      if (!this._service.menuElement.nativeElement.contains(event.target)) {
        this._service.toggle();
      }
      return false;
    };
    __decorate([core_1.ContentChild(dropdown_menu_directive_1.DropdownMenu), __metadata('design:type', dropdown_menu_directive_1.DropdownMenu)], Dropdown.prototype, "_menu", void 0);
    __decorate([core_1.HostBinding('class.visible'), core_1.Input(), __metadata('design:type', Boolean)], Dropdown.prototype, "isOpen", null);
    __decorate([core_1.Input(), __metadata('design:type', String)], Dropdown.prototype, "autoClose", null);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Dropdown.prototype, "onToggle", null);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Dropdown.prototype, "isOpenChange", null);
    __decorate([core_1.HostBinding('class.disabled'), core_1.Input(), __metadata('design:type', Boolean)], Dropdown.prototype, "isDisabled", null);
    __decorate([core_1.HostListener('click', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [MouseEvent]), __metadata('design:returntype', Boolean)], Dropdown.prototype, "click", null);
    Dropdown = __decorate([core_1.Directive({selector: '[suiDropdown]'}), __metadata('design:paramtypes', [core_1.ElementRef])], Dropdown);
    return Dropdown;
  }());
  exports.Dropdown = Dropdown;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/dropdown/dropdown-menu.directive", ["@angular/core"], true, function($__require, exports, module) {
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
  var core_1 = $__require('@angular/core');
  var DropdownMenu = (function() {
    function DropdownMenu(el) {
      this.el = el;
    }
    Object.defineProperty(DropdownMenu.prototype, "service", {
      set: function(service) {
        this._service = service;
        this._service.menuElement = this.el;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DropdownMenu.prototype, "isOpen", {
      get: function() {
        if (this._service) {
          return this._service.isOpen;
        }
        return;
      },
      enumerable: true,
      configurable: true
    });
    __decorate([core_1.HostBinding('class.visible'), core_1.HostBinding('class.transition'), __metadata('design:type', Boolean)], DropdownMenu.prototype, "isOpen", null);
    DropdownMenu = __decorate([core_1.Directive({selector: '[suiDropdownMenu]'}), __metadata('design:paramtypes', [core_1.ElementRef])], DropdownMenu);
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

System.registerDynamic("ng2-semantic-ui/components/dropdown/dropdown.service", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var core_1 = $__require('@angular/core');
  var DISABLED = 'disabled';
  var OUTSIDECLICK = 'outsideClick';
  exports.KEYCODE = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ESCAPE: 27,
    ENTER: 13,
    BACKSPACE: 8
  };
  var DropdownService = (function() {
    function DropdownService() {
      this.onToggle = new core_1.EventEmitter(false);
      this.isOpenChange = new core_1.EventEmitter(false);
      this.closeDropdownBind = this.closeDropdown.bind(this);
      this.keybindFilterBind = this.keybindFilter.bind(this);
      this._selectedItem = null;
      this.itemClass = "item";
      this.itemSelectedClass = "selected";
      this.itemDisabledClass = "disabled";
    }
    Object.defineProperty(DropdownService.prototype, "isOpen", {
      get: function() {
        return this._isOpen;
      },
      set: function(value) {
        var _this = this;
        if (this.isDisabled) {
          value = false;
        }
        this._isOpen = value;
        if (this.isOpen) {
          this.bindDocumentEvents();
          this.selectedItem = null;
        } else {
          this.unbindDocumentEvents();
        }
        setTimeout(function() {
          _this.onToggle.emit(_this._isOpen);
          _this.isOpenChange.emit(_this._isOpen);
        });
      },
      enumerable: true,
      configurable: true
    });
    DropdownService.prototype.toggle = function() {
      this.isOpen = !this.isOpen;
    };
    DropdownService.prototype.bindDocumentEvents = function() {
      window.document.addEventListener('click', this.closeDropdownBind, true);
      if (!this.dropdownElement.nativeElement.parentElement.hasAttribute("suiDropdownMenu")) {
        window.document.addEventListener('keydown', this.keybindFilterBind);
      }
    };
    DropdownService.prototype.unbindDocumentEvents = function() {
      window.document.removeEventListener('click', this.closeDropdownBind, true);
      window.document.removeEventListener('keydown', this.keybindFilterBind);
    };
    DropdownService.prototype.closeDropdown = function(event) {
      if (event && this.autoClose === DISABLED) {
        return;
      }
      if (event && this.dropdownElement.nativeElement.contains(event.target) && !this.menuElement.nativeElement.contains(event.target)) {
        return;
      }
      if (event && this.menuElement.nativeElement.contains(event.target) && event.target.hasAttribute("suiDropdown")) {
        return;
      }
      if (event && this.menuElement && /input|textarea/i.test(event.target.tagName) && this.menuElement.nativeElement.contains(event.target)) {
        return;
      }
      if (event && this.autoClose === OUTSIDECLICK && this.menuElement && this.menuElement.nativeElement.contains(event.target)) {
        return;
      }
      this.isOpen = false;
    };
    DropdownService.prototype.keybindFilter = function(event) {
      if (event.which === exports.KEYCODE.ESCAPE) {
        this.isOpen = false;
        return;
      }
      if (this.isOpen && ([exports.KEYCODE.ENTER, exports.KEYCODE.UP, exports.KEYCODE.RIGHT, exports.KEYCODE.DOWN, exports.KEYCODE.LEFT].find(function(keyCode) {
        return event.which == keyCode;
      }))) {
        event.preventDefault();
        event.stopPropagation();
        this.keyPress(event.which);
      }
    };
    Object.defineProperty(DropdownService.prototype, "selectedItem", {
      get: function() {
        return this._selectedItem;
      },
      set: function(item) {
        if (this._selectedItem) {
          this._selectedItem.classList.remove(this.itemSelectedClass);
        }
        this._selectedItem = item;
        if (item) {
          item.classList.add(this.itemSelectedClass);
        }
      },
      enumerable: true,
      configurable: true
    });
    DropdownService.prototype.keyPress = function(keyCode) {
      switch (keyCode) {
        case exports.KEYCODE.DOWN:
          this.selectNextItem();
          break;
        case exports.KEYCODE.UP:
          this.selectPreviousItem();
          break;
        case exports.KEYCODE.ENTER:
          if (this.selectedItem && !this.selectedItem.hasAttribute("suiDropdown")) {
            this.selectedItem.click();
            this.selectedItem = null;
            break;
          }
        case exports.KEYCODE.RIGHT:
          if (this.selectedItem && this.selectedItem.hasAttribute("suiDropdown")) {
            this.selectedItem.click();
            this.selectedItem = this.selectedItem.querySelector("." + this.itemClass + ":not(." + this.itemDisabledClass + ")");
          }
          break;
        case exports.KEYCODE.LEFT:
          if (this.selectedItem.parentElement != this.menuElement.nativeElement) {
            this.selectedItem.parentElement.parentElement.click();
            this.selectedItem = this.selectedItem.parentElement.parentElement;
          }
          break;
      }
    };
    DropdownService.prototype.selectNextItem = function() {
      if (!this.selectedItem) {
        this.selectedItem = this.menuElement.nativeElement.querySelector("." + this.itemClass + ":not(." + this.itemDisabledClass + ")");
        return;
      }
      var nextItem = this.selectedItem.nextElementSibling;
      if (nextItem) {
        this.selectedItem = nextItem;
        if (this.selectedItem.classList.contains(this.itemDisabledClass)) {
          this.selectNextItem();
        }
      }
    };
    DropdownService.prototype.selectPreviousItem = function() {
      var previousItem = this.selectedItem.previousElementSibling;
      if (previousItem) {
        this.selectedItem = previousItem;
        if (this.selectedItem.classList.contains(this.itemDisabledClass)) {
          this.selectPreviousItem();
        }
      }
    };
    return DropdownService;
  }());
  exports.DropdownService = DropdownService;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/select/select.component", ["@angular/core", "@angular/common", "../search", "../dropdown", "../dropdown/dropdown.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var search_1 = $__require('../search');
  var dropdown_1 = $__require('../dropdown');
  var dropdown_service_1 = $__require('../dropdown/dropdown.service');
  var Select = (function(_super) {
    __extends(Select, _super);
    function Select(el) {
      var _this = this;
      _super.call(this, el);
      this.el = el;
      this.searchClasses = true;
      this.isSearchable = false;
      this.allowMultiple = false;
      this.searchDelay = 0;
      this._loading = false;
      this.placeholder = "Select one";
      this.selectedOptions = [];
      this.selectedOptionsHTML = [];
      this.maxSelectedReached = false;
      this.renderedOptions = [];
      this._allowEmptyQuery = true;
      this._service.autoClose = "outsideClick";
      this._service.itemClass = "item";
      this._service.itemSelectedClass = "selected";
      this._service.isOpenChange.subscribe(function(isOpen) {
        if (isOpen) {
          if (_this.isSearchable && !_this._service.selectedItem) {
            _this._service.selectNextItem();
          }
        } else {
          if (_this.query && !_this.allowMultiple) {
            if (_this._service.selectedItem) {
              _this._service.selectedItem.click();
              return;
            }
            _this._query = "";
          }
        }
      });
    }
    Object.defineProperty(Select.prototype, "isOpen", {
      get: function() {
        return this._service.isOpen;
      },
      set: function(value) {
        this._service.isOpen = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Select.prototype, "results", {
      get: function() {
        var _this = this;
        this.maxSelectedReached = false;
        var results = this.options;
        if (this.isSearchable || this._optionsLookup) {
          results = this._results;
        }
        if (this.allowMultiple) {
          results = results.filter(function(r) {
            return (_this.selectedOptions || []).indexOf(r) == -1;
          });
          if (this.selectedOptions && this.maxSelected == this.selectedOptions.length) {
            this.maxSelectedReached = true;
            results = [];
          }
        }
        return results;
      },
      enumerable: true,
      configurable: true
    });
    Select.prototype.ngOnInit = function() {
      if (this.isSearchable) {
        this.search();
      }
    };
    Select.prototype.selectOption = function(selectOption) {
      if (!this.allowMultiple) {
        _super.prototype.select.call(this, selectOption.value);
        this.selectedOptionHTML = selectOption.HTML;
      } else {
        this.selectedOptions = this.selectedOptions || [];
        this.selectedOptions.push(selectOption.value);
        this.selectedOptionsHTML.push(selectOption.HTML);
        this.selectedOptionChange.emit(this.selectedOptions);
        this.onItemSelected.emit(selectOption.value);
      }
      if (this.isSearchable) {
        this.focusFirstItem();
        this.focusSearch();
      }
      this._query = "";
      if (this.isSearchable) {
        this.search();
      }
    };
    Select.prototype.deselectOption = function(option) {
      var index = this.selectedOptions.indexOf(option);
      this.selectedOptions.splice(index, 1);
      this.selectedOptionsHTML.splice(index, 1);
      this.selectedOptionChange.emit(this.selectedOptions);
      if (this.isSearchable) {
        this.focusFirstItem();
      }
    };
    Select.prototype.selectedOptionClick = function(event) {
      event.stopPropagation();
    };
    Select.prototype.focusSearch = function() {
      if (this.isSearchable) {
        this._service.dropdownElement.nativeElement.querySelector("input").focus();
      }
    };
    Select.prototype.focusFirstItem = function() {
      var _this = this;
      setTimeout(function() {
        _this._service.selectedItem = null;
        _this._service.selectNextItem();
      });
    };
    Select.prototype.writeValue = function(value) {
      var _this = this;
      if (this.allowMultiple) {
        setTimeout(function() {
          _this.selectedOptions = value;
          (_this.selectedOptions || []).forEach(function(v, i) {
            _this.selectedOptionsHTML[i] = _this.renderedOptions.find(function(rO) {
              return rO.value == v;
            }).HTML;
          });
        });
        return;
      }
      this.selectedOption = value;
      if (value) {
        setTimeout(function() {
          return _this.selectedOptionHTML = _this.renderedOptions.find(function(rO) {
            return rO.value == value;
          }).HTML;
        });
      }
    };
    Select.prototype.click = function(event) {
      var _this = this;
      event.stopPropagation();
      if (!this._service.menuElement.nativeElement.contains(event.target)) {
        if (!this.isOpen) {
          this.search(function() {
            _this._loading = false;
            _this.isOpen = true;
            _this.focusSearch();
          });
        } else if (event.target.tagName != "INPUT") {
          this.isOpen = false;
        }
      }
      return false;
    };
    Select.prototype.searchKeyDown = function(event) {
      if (event.which == dropdown_service_1.KEYCODE.BACKSPACE && !this._query) {
        var selectedOptions = this.selectedOptions || [];
        var lastSelectedOption = selectedOptions[selectedOptions.length - 1];
        if (lastSelectedOption) {
          this.deselectOption(lastSelectedOption);
        }
      }
    };
    __decorate([core_1.ViewChild(dropdown_1.DropdownMenu), __metadata('design:type', dropdown_1.DropdownMenu)], Select.prototype, "_menu", void 0);
    __decorate([core_1.HostBinding('class.ui'), core_1.HostBinding('class.selection'), core_1.HostBinding('class.dropdown'), __metadata('design:type', Object)], Select.prototype, "searchClasses", void 0);
    __decorate([core_1.HostBinding('class.search'), __metadata('design:type', Boolean)], Select.prototype, "isSearchable", void 0);
    __decorate([core_1.HostBinding('class.multiple'), __metadata('design:type', Boolean)], Select.prototype, "allowMultiple", void 0);
    __decorate([core_1.HostBinding('class.loading'), __metadata('design:type', Boolean)], Select.prototype, "_loading", void 0);
    __decorate([core_1.HostBinding('class.active'), __metadata('design:type', Boolean)], Select.prototype, "isOpen", null);
    __decorate([core_1.HostListener('click', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [MouseEvent]), __metadata('design:returntype', Boolean)], Select.prototype, "click", null);
    Select = __decorate([core_1.Component({
      selector: 'sui-select',
      directives: [dropdown_1.DropdownMenu],
      inputs: ['placeholder', 'options', 'optionsField', 'isSearchable', 'searchDelay', 'isDisabled', 'allowMultiple', 'maxSelected'],
      outputs: ['selectedOptionChange'],
      host: {
        '[class.visible]': 'isOpen',
        '[class.disabled]': 'isDisabled'
      },
      template: "\n<i class=\"dropdown icon\"></i>\n<!-- Multi-select labels -->\n<a *ngFor=\"let selected of selectedOptions; let i = index\" class=\"ui label\" (click)=\"selectedOptionClick($event)\">\n    <content [innerHTML]=\"selectedOptionsHTML[i]\"></content>\n    <i class=\"delete icon\" (click)=\"deselectOption(selected); selectedOptionClick($event)\"></i>\n</a>\n<!-- Search input box -->\n<input *ngIf=\"isSearchable\" class=\"search\" type=\"text\" autocomplete=\"off\" [(ngModel)]=\"query\" (keydown)=\"searchKeyDown($event)\">\n<!-- Single-select label -->\n<div *ngIf=\"!selectedOption\" class=\"default text\" [class.filtered]=\"query\">{{ placeholder }}</div>\n<div *ngIf=\"selectedOption\" class=\"text\" [class.filtered]=\"query\" [innerHTML]=\"selectedOptionHTML\"></div>\n<!-- Select dropdown menu -->\n<div class=\"menu\" suiDropdownMenu>\n    <ng-content></ng-content>\n    <div *ngIf=\"!results.length && !maxSelectedReached\" class=\"message\">No Results</div>\n    <div *ngIf=\"!results.length && maxSelectedReached\" class=\"message\">Max {{ maxSelected }} selections</div>\n</div>\n",
      styles: [":host input.search { width: 12em !important; } .selected-results { display: none; }"]
    }), __metadata('design:paramtypes', [core_1.ElementRef])], Select);
    return Select;
  }(search_1.Search));
  exports.Select = Select;
  var CUSTOM_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function() {
      return SelectValueAccessor;
    }),
    multi: true
  });
  var SelectValueAccessor = (function(_super) {
    __extends(SelectValueAccessor, _super);
    function SelectValueAccessor(host) {
      _super.call(this, host);
    }
    SelectValueAccessor = __decorate([core_1.Directive({
      selector: 'sui-select',
      host: {'(selectedOptionChange)': 'onChange($event)'},
      providers: [CUSTOM_VALUE_ACCESSOR]
    }), __metadata('design:paramtypes', [Select])], SelectValueAccessor);
    return SelectValueAccessor;
  }(search_1.SearchValueAccessor));
  exports.SelectValueAccessor = SelectValueAccessor;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/select/select-option.component", ["@angular/core", "../select"], true, function($__require, exports, module) {
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
  var core_1 = $__require('@angular/core');
  var select_1 = $__require('../select');
  var SelectOption = (function() {
    function SelectOption(host, el) {
      this.host = host;
      this.el = el;
      this.itemClass = true;
    }
    SelectOption.prototype.ngAfterContentInit = function() {
      var _this = this;
      this.HTML = this.el.nativeElement.innerHTML;
      var existingIndex = this.host.renderedOptions.findIndex(function(rO) {
        return rO.value == _this.value;
      });
      if (existingIndex != -1) {
        this.host.renderedOptions.splice(existingIndex, 1);
      }
      this.host.renderedOptions.push(this);
    };
    SelectOption.prototype.click = function(event) {
      event.stopPropagation();
      this.HTML = this.el.nativeElement.innerHTML;
      this.host.selectOption(this);
      return false;
    };
    __decorate([core_1.HostBinding('class.item'), __metadata('design:type', Object)], SelectOption.prototype, "itemClass", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Object)], SelectOption.prototype, "value", void 0);
    __decorate([core_1.HostListener('click', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [MouseEvent]), __metadata('design:returntype', Boolean)], SelectOption.prototype, "click", null);
    SelectOption = __decorate([core_1.Component({
      selector: 'sui-select-option',
      template: "<ng-content></ng-content>"
    }), __metadata('design:paramtypes', [select_1.Select, core_1.ElementRef])], SelectOption);
    return SelectOption;
  }());
  exports.SelectOption = SelectOption;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/select", ["./select/select.component", "./select/select-option.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var select_component_1 = $__require('./select/select.component');
  var select_option_component_1 = $__require('./select/select-option.component');
  var select_component_2 = $__require('./select/select.component');
  exports.Select = select_component_2.Select;
  exports.SelectValueAccessor = select_component_2.SelectValueAccessor;
  var select_option_component_2 = $__require('./select/select-option.component');
  exports.SelectOption = select_option_component_2.SelectOption;
  exports.SELECT_DIRECTIVES = [select_component_1.Select, select_option_component_1.SelectOption, select_component_1.SelectValueAccessor];
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/tab/tabset.component", ["@angular/core", "./tab-content.directive", "./tab.directive"], true, function($__require, exports, module) {
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
  var core_1 = $__require('@angular/core');
  var tab_content_directive_1 = $__require('./tab-content.directive');
  var tab_directive_1 = $__require('./tab.directive');
  var Tabset = (function() {
    function Tabset() {
      this._loadedTabs = [];
    }
    Tabset.prototype.ngAfterContentInit = function() {
      var _this = this;
      this.loadTabs();
      this._tabs.changes.subscribe(function(tabHeaders) {
        return _this.loadTabs();
      });
    };
    Tabset.prototype.loadTabs = function() {
      var _this = this;
      this._loadedTabs = this._tabs.toArray();
      if (!this._loadedTabs.length) {
        throw new Error("You cannot have no tabs!");
      }
      this._loadedTabs.forEach(function(t) {
        if (!t.content) {
          var possibleContents = _this._tabContents.filter(function(tC) {
            return tC.id == t.id;
          });
          if (possibleContents.length == 0) {
            throw new Error("A [suiTabHeader] must have a related [suiTabContent].");
          }
          if (possibleContents.length > 1) {
            throw new Error("A [suiTabHeader] must not have more than 1 related [suiTabContent].");
          }
          t.content = possibleContents.pop();
        }
        t.stateChanged$.subscribe(function(t) {
          return _this.tabStateChanged(t);
        });
      });
      setTimeout(function() {
        if ((_this._activeTab && !_this._loadedTabs.find(function(t) {
          return t == _this._activeTab;
        })) || !_this._activeTab) {
          _this.activateFirstTab();
        }
      });
    };
    Tabset.prototype.tabStateChanged = function(tab) {
      if (tab.isActive && this._activeTab != tab) {
        this._loadedTabs.filter(function(tH) {
          return tH != tab;
        }).forEach(function(tH) {
          return tH.isActive = false;
        });
        this._activeTab = tab;
      } else if (this._activeTab && !this._loadedTabs.filter(function(tH) {
        return tH.isActive;
      }).length) {
        this.activateClosestTab(tab);
      }
      if (tab.isDisabled && tab.isActive) {
        tab.isActive = false;
        this.activateClosestTab(tab);
      }
      if (tab.isDisabled && !this._loadedTabs.filter(function(tH) {
        return !tH.isDisabled;
      }).length) {
        throw new Error("You cannot disable all of your tabs!");
      }
    };
    Tabset.prototype.activateFirstTab = function() {
      var firstAvailable = this._loadedTabs.filter(function(tH) {
        return !tH.isDisabled;
      })[0];
      if (firstAvailable) {
        firstAvailable.isActive = true;
      }
    };
    Tabset.prototype.activateClosestTab = function(tab) {
      var availableTabs = this._loadedTabs.filter(function(tH) {
        return !tH.isDisabled || tH == tab;
      });
      var tabIndex = availableTabs.findIndex(function(tH) {
        return tH == tab;
      });
      tabIndex += (tabIndex ? -1 : 1);
      availableTabs[tabIndex].isActive = true;
    };
    __decorate([core_1.ContentChildren(tab_directive_1.Tab), __metadata('design:type', core_1.QueryList)], Tabset.prototype, "_tabs", void 0);
    __decorate([core_1.ContentChildren(tab_content_directive_1.TabContent), __metadata('design:type', core_1.QueryList)], Tabset.prototype, "_tabContents", void 0);
    Tabset = __decorate([core_1.Component({
      selector: 'sui-tabset',
      directives: [],
      template: "<ng-content></ng-content>",
      styles: ["\n:host .ui.segment {\n    margin-bottom: 0;\n}\n"]
    }), __metadata('design:paramtypes', [])], Tabset);
    return Tabset;
  }());
  exports.Tabset = Tabset;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/tab/tab.directive", ["@angular/core", "rxjs/Observable"], true, function($__require, exports, module) {
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
  var core_1 = $__require('@angular/core');
  var Observable_1 = $__require('rxjs/Observable');
  var Tab = (function() {
    function Tab() {
      var _this = this;
      this._isActive = false;
      this._isDisabled = false;
      this.isActiveChange = new core_1.EventEmitter(false);
      this.onActivate = new core_1.EventEmitter(false);
      this.stateChanged$ = new Observable_1.Observable(function(observer) {
        return _this._stateObserver = observer;
      });
    }
    Object.defineProperty(Tab.prototype, "suiTabHeader", {
      set: function(value) {
        if (!this.id) {
          this.id = value;
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Tab.prototype, "content", {
      get: function() {
        return this._content;
      },
      set: function(content) {
        this._content = content;
        content.isActive = this.isActive;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Tab.prototype, "isActive", {
      get: function() {
        return this._isActive;
      },
      set: function(value) {
        var change = this._isActive != value;
        this._isActive = value;
        this._content.isActive = value;
        this.stateObserverNext(change);
        this.isActiveChange.emit(this._isActive);
        if (value && change) {
          this.onActivate.emit(this);
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Tab.prototype, "isDisabled", {
      get: function() {
        return this._isDisabled;
      },
      set: function(value) {
        var change = this._isDisabled != value;
        this._isDisabled = value;
        this.stateObserverNext(change);
      },
      enumerable: true,
      configurable: true
    });
    Tab.prototype.stateObserverNext = function(change) {
      if (change) {
        this._stateObserver.next(this);
      }
    };
    Object.defineProperty(Tab.prototype, "manuallyActivate", {
      set: function(value) {
        var _this = this;
        setTimeout(function() {
          _this.isActive = _this.isDisabled ? false : value;
          _this.isActiveChange.emit(_this._isActive);
        });
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Tab.prototype, "manuallyDisable", {
      set: function(value) {
        var _this = this;
        setTimeout(function() {
          _this.isDisabled = value;
        });
      },
      enumerable: true,
      configurable: true
    });
    Tab.prototype.click = function() {
      if (!this.isDisabled) {
        this.isActive = true;
      }
    };
    __decorate([core_1.Input(), __metadata('design:type', String), __metadata('design:paramtypes', [String])], Tab.prototype, "suiTabHeader", null);
    __decorate([core_1.HostBinding('class.active'), __metadata('design:type', Object)], Tab.prototype, "isActive", null);
    __decorate([core_1.HostBinding('class.disabled'), __metadata('design:type', Object)], Tab.prototype, "isDisabled", null);
    __decorate([core_1.Input('isActive'), __metadata('design:type', Boolean), __metadata('design:paramtypes', [Boolean])], Tab.prototype, "manuallyActivate", null);
    __decorate([core_1.Input('isDisabled'), __metadata('design:type', Boolean), __metadata('design:paramtypes', [Boolean])], Tab.prototype, "manuallyDisable", null);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Tab.prototype, "isActiveChange", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Tab.prototype, "onActivate", void 0);
    __decorate([core_1.HostListener('click'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], Tab.prototype, "click", null);
    Tab = __decorate([core_1.Directive({selector: '[suiTabHeader]'}), __metadata('design:paramtypes', [])], Tab);
    return Tab;
  }());
  exports.Tab = Tab;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/tab/tab-content.directive", ["@angular/core"], true, function($__require, exports, module) {
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
  var core_1 = $__require('@angular/core');
  var TabContent = (function() {
    function TabContent() {
      this.tabClass = true;
      this.isActive = false;
    }
    Object.defineProperty(TabContent.prototype, "suiTabContent", {
      set: function(value) {
        if (!this.id) {
          this.id = value;
        }
      },
      enumerable: true,
      configurable: true
    });
    __decorate([core_1.Input(), __metadata('design:type', String), __metadata('design:paramtypes', [String])], TabContent.prototype, "suiTabContent", null);
    __decorate([core_1.HostBinding('class.tab'), __metadata('design:type', Object)], TabContent.prototype, "tabClass", void 0);
    __decorate([core_1.HostBinding('class.active'), __metadata('design:type', Boolean)], TabContent.prototype, "isActive", void 0);
    TabContent = __decorate([core_1.Directive({selector: '[suiTabContent]'}), __metadata('design:paramtypes', [])], TabContent);
    return TabContent;
  }());
  exports.TabContent = TabContent;
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/components/tab", ["./tab/tabset.component", "./tab/tab.directive", "./tab/tab-content.directive"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var tabset_component_1 = $__require('./tab/tabset.component');
  var tab_directive_1 = $__require('./tab/tab.directive');
  var tab_content_directive_1 = $__require('./tab/tab-content.directive');
  var tabset_component_2 = $__require('./tab/tabset.component');
  exports.Tabset = tabset_component_2.Tabset;
  var tab_directive_2 = $__require('./tab/tab.directive');
  exports.Tab = tab_directive_2.Tab;
  var tab_content_directive_2 = $__require('./tab/tab-content.directive');
  exports.TabContent = tab_content_directive_2.TabContent;
  exports.TAB_DIRECTIVES = [tabset_component_1.Tabset, tab_directive_1.Tab, tab_content_directive_1.TabContent];
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui/ng2-semantic-ui", ["./components/accordion", "./components/checkbox", "./components/collapse", "./components/dimmer", "./components/dropdown", "./components/progress", "./components/message", "./components/rating", "./components/search", "./components/select", "./components/tab"], true, function($__require, exports, module) {
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
  var progress_1 = $__require('./components/progress');
  var message_1 = $__require('./components/message');
  var rating_1 = $__require('./components/rating');
  var search_1 = $__require('./components/search');
  var select_1 = $__require('./components/select');
  var tab_1 = $__require('./components/tab');
  __export($__require('./components/accordion'));
  __export($__require('./components/checkbox'));
  __export($__require('./components/collapse'));
  __export($__require('./components/dimmer'));
  __export($__require('./components/dropdown'));
  __export($__require('./components/progress'));
  __export($__require('./components/message'));
  __export($__require('./components/rating'));
  __export($__require('./components/search'));
  __export($__require('./components/select'));
  __export($__require('./components/tab'));
  exports.DIRECTIVES = [accordion_1.ACCORDION_DIRECTIVES, checkbox_1.CHECKBOX_DIRECTIVES, collapse_1.COLLAPSE_DIRECTIVES, dimmer_1.DIMMER_DIRECTIVES, dropdown_1.DROPDOWN_DIRECTIVES, progress_1.PROGRESS_DIRECTIVES, message_1.MESSAGE_DIRECTIVES, rating_1.RATING_DIRECTIVES, search_1.SEARCH_DIRECTIVES, select_1.SELECT_DIRECTIVES, tab_1.TAB_DIRECTIVES];
  return module.exports;
});

//# sourceMappingURL=ng2-semantic-ui.js.map