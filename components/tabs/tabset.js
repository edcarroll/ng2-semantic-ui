var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ContentChildren, QueryList } from '@angular/core';
import { SuiTabContent } from './tab-content';
import { SuiTab } from "./tab";
export var SuiTabset = (function () {
    function SuiTabset() {
        this._loadedTabs = [];
    }
    SuiTabset.prototype.ngAfterContentInit = function () {
        var _this = this;
        //Once we have loaded and found all child suiTabs and suiTabHeaders, link them together
        this.loadTabs();
        this._tabs.changes.subscribe(function (tabHeaders) {
            setTimeout(function () {
                _this.loadTabs();
            });
        });
    };
    //This runs every time the contents of the component change
    SuiTabset.prototype.loadTabs = function () {
        var _this = this;
        this._loadedTabs = this._tabs.toArray();
        if (!this._loadedTabs.length) {
            throw new Error("You cannot have no tabs!");
        }
        //For every content header we have managed to find,
        this._loadedTabs.forEach(function (t) {
            //Assuming they have an associated content
            if (!t.content) {
                //Link the content header with the content with the same ID excluding ones that are already linked
                var possibleContents = _this._tabContents.filter(function (tC) { return tC.id == t.id; });
                if (possibleContents.length == 0) {
                    throw new Error("A [suiTabHeader] must have a related [suiTabContent].");
                }
                if (possibleContents.length > 1) {
                    throw new Error("A [suiTabHeader] must not have more than 1 related [suiTabContent].");
                }
                t.content = possibleContents.pop();
            }
            //Next observe the content's state to catch any changes made anywhere
            t.stateChanged$.subscribe(function (t) { return _this.tabStateChanged(t); });
        });
        setTimeout(function () {
            //If there isn't an active content that is currently a loaded content already, activate the first available content
            if ((_this._activeTab && !_this._loadedTabs.find(function (t) { return t == _this._activeTab; })) || !_this._activeTab) {
                _this.activateFirstTab();
            }
        });
    };
    //This runs when any content changes state (e.g. isActive changed, isDisabled changed)
    SuiTabset.prototype.tabStateChanged = function (tab) {
        //Check if the content is now active
        if (tab.isActive && this._activeTab != tab) {
            //If so, deactivate all other tabs that aren't this one
            this._loadedTabs
                .filter(function (tH) { return tH != tab; })
                .forEach(function (tH) { return tH.isActive = false; });
            //Set this content to be the current active content
            this._activeTab = tab;
        }
        else if (this._activeTab && !this._loadedTabs.filter(function (tH) { return tH.isActive; }).length) {
            this.activateClosestTab(tab);
        }
        //Check if the content is now disabled, and if so if is currently active
        if (tab.isDisabled && tab.isActive) {
            //If so, unset the content as it is now disabled
            tab.isActive = false;
            //Find the first available content to activate
            this.activateClosestTab(tab);
        }
        //Check if all of the tabs are disabled
        if (tab.isDisabled && !this._loadedTabs.filter(function (tH) { return !tH.isDisabled; }).length) {
            throw new Error("You cannot disable all of your tabs!");
        }
    };
    //This activates the first content that isn't disabled
    SuiTabset.prototype.activateFirstTab = function () {
        //Filter out all disabled tabs from the currently loaded list and take the first one
        var firstAvailable = this._loadedTabs.filter(function (tH) { return !tH.isDisabled; })[0];
        if (firstAvailable) {
            //If there is one available, activate it and set it to the currently active content
            firstAvailable.isActive = true;
        }
    };
    //This activates the closest available content to the one provided
    SuiTabset.prototype.activateClosestTab = function (tab) {
        //Grab a list of all of the loaded tabs that aren't disabled (excluding the one we are leaving)
        var availableTabs = this._loadedTabs
            .filter(function (tH) { return !tH.isDisabled || tH == tab; });
        var tabIndex = availableTabs
            .findIndex(function (tH) { return tH == tab; });
        //Go to the previous content, unless it is the 1st content.
        tabIndex += (tabIndex ? -1 : 1);
        availableTabs[tabIndex].isActive = true;
        //This if we just activated a disabled content, not to worry as it will bubble through
    };
    __decorate([
        ContentChildren(SuiTab), 
        __metadata('design:type', QueryList)
    ], SuiTabset.prototype, "_tabs", void 0);
    __decorate([
        ContentChildren(SuiTabContent), 
        __metadata('design:type', QueryList)
    ], SuiTabset.prototype, "_tabContents", void 0);
    SuiTabset = __decorate([
        Component({
            selector: 'sui-tabset',
            exportAs: 'suiTabset',
            template: "\n<ng-content></ng-content>\n",
            styles: ["\n:host .ui.segment {\n    margin-bottom: 0;\n}\n"]
        }), 
        __metadata('design:paramtypes', [])
    ], SuiTabset);
    return SuiTabset;
}());
export var SUI_TABS_DIRECTIVES = [SuiTabset, SuiTab, SuiTabContent];
//# sourceMappingURL=C:/Users/Edward/dev/ng2-semantic-ui/components/tabs/tabset.js.map