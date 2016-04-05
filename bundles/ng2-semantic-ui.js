System.registerDynamic("src/components/dropdown/dropdown.service", [], true, function($__require, exports, module) {
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

System.registerDynamic("src/components/dropdown/dropdown.directive", ["angular2/core", "./dropdown.service"], true, function($__require, exports, module) {
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

System.registerDynamic("src/components/dropdown/dropdown-menu.directive", ["angular2/core", "./dropdown.directive"], true, function($__require, exports, module) {
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

System.registerDynamic("src/components/dropdown", ["./dropdown/dropdown.directive", "./dropdown/dropdown-menu.directive"], true, function($__require, exports, module) {
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

System.registerDynamic("src/directives", ["./components/dropdown"], true, function($__require, exports, module) {
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
  var dropdown_1 = $__require('./components/dropdown');
  __export($__require('./components/dropdown'));
  exports.DIRECTIVES = [dropdown_1.DROPDOWN_DIRECTIVES];
  return module.exports;
});

System.registerDynamic("ng2-semantic-ui", ["./src/directives"], true, function($__require, exports, module) {
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
  var directives_1 = $__require('./src/directives');
  __export($__require('./src/directives'));
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = {directives: [directives_1.DIRECTIVES]};
  return module.exports;
});
