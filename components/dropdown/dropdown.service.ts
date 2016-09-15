import {EventEmitter, ElementRef} from '@angular/core';
import {SuiTransition} from "../transition/transition";

const Disabled = 'disabled';
const OutsideClick = 'outsideClick';

export const KeyCode = {
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,

    Escape: 27,
    Enter: 13,

    Space: 32,
    Backspace: 8
};

export class SuiDropdownService {
    // State
    private _isOpen:boolean;
    public isDisabled:boolean;
    public autoClose:string;

    // State Events
    public onToggle:EventEmitter<boolean> = new EventEmitter<boolean>(false);
    public isOpenChange:EventEmitter<boolean> = new EventEmitter<boolean>(false);

    // Important Elements
    public dropdownElement:ElementRef;
    public menuElement:ElementRef;

    // Document Event Bindings
    private closeDropdownBind:EventListener = this.closeDropdown.bind(this);
    private keybindFilterBind:EventListener = this.keybindFilter.bind(this);

    // Keyboard Navigation
    private _selectedItem:Element = null;

    // Classes
    public itemClass = "item";
    public itemSelectedClass = "selected";
    public itemDisabledClass = "disabled";

    // Transitions
    public transition:SuiTransition;
    public isActive:boolean;

    public get isOpen():boolean {
        return this._isOpen;
    }

    public set isOpen(value:boolean) {
        if (value == this._isOpen) { return; }
        if (this.isDisabled) { value = false; }

        this._isOpen = value;
        if (this.transition) {
            this.isActive = true;
            this.transition.stopAll();
            this.transition.transition({
                name: "slide down",
                duration: 200,
                callback: () => this.isActive = this.isOpen
            });
        }

        if (this.isOpen) {
            this.bindDocumentEvents();

            this.selectedItem = null;
        }
        else {
            this.unbindDocumentEvents();
        }

        setTimeout(() => {
            this.onToggle.emit(this._isOpen);
            this.isOpenChange.emit(this._isOpen);
        });
    }

    public toggle():void {
        this.isOpen = !this.isOpen;
    }

    public bindDocumentEvents():void {
        window.document.addEventListener('click', this.closeDropdownBind, true);
        if (!this.dropdownElement.nativeElement.parentElement.hasAttribute("suiDropdownMenu")) {
            window.document.addEventListener('keydown', this.keybindFilterBind);
        }
    }

    public unbindDocumentEvents():void {
        window.document.removeEventListener('click', this.closeDropdownBind, true);
        window.document.removeEventListener('keydown', this.keybindFilterBind);
    }


    private closeDropdown(event:MouseEvent):void {
        //Never close the dropdown if autoClose is disabled
        if (event && this.autoClose === Disabled) {
            return;
        }

        //Don't close the dropdown when clicking the toggle
        if (event && this.dropdownElement.nativeElement.contains(event.target) &&
            !this.menuElement.nativeElement.contains(event.target)) {
            return;
        }

        //Don't close the dropdown if expanding a nested dropdown
        if (event && this.menuElement.nativeElement.contains(event.target) &&
            (<Element> event.target).hasAttribute("suiDropdown")) {
            return;
        }

        //Don't close the dropdown if clicking on any input element
        if (event && this.menuElement &&
            /input|textarea/i.test((<Element> event.target).tagName) &&
            this.menuElement.nativeElement.contains(event.target)) {
            return;
        }

        //Don't close the dropdown when clicking inside if autoClose is outsideClick
        if (event && this.autoClose === OutsideClick &&
            this.menuElement &&
            this.menuElement.nativeElement.contains(event.target)) {
            return;
        }

        //Close the dropdown
        this.isOpen = false;
    }

    private keybindFilter(event:KeyboardEvent):void {
        if (event.which === KeyCode.Escape) {
            this.isOpen = false;
            return;
        }

        //noinspection TypeScriptUnresolvedFunction
        if (this.isOpen &&
            ([KeyCode.Enter, KeyCode.Up, KeyCode.Right, KeyCode.Down, KeyCode.Left]
                .find(keyCode => event.which == keyCode))) {
            event.preventDefault();
            event.stopPropagation();
            this.keyPress(event.which);
        }
    }

    public set selectedItem(item:Element) {
        if (this._selectedItem) {
            this._selectedItem.classList.remove(this.itemSelectedClass);
        }
        this._selectedItem = item;
        if (item) {
            item.classList.add(this.itemSelectedClass);
        }
    }
    public get selectedItem():Element {
        return this._selectedItem;
    }

    public keyPress(keyCode:number):void {
        //noinspection FallThroughInSwitchStatementJS
        switch (keyCode) {
            case KeyCode.Down:
                this.selectNextItem();
                break;
            case KeyCode.Up:
                this.selectPreviousItem();
                break;
            case KeyCode.Enter:
                if (this.selectedItem && !this.selectedItem.hasAttribute("suiDropdown")) {
                    (<HTMLElement> this.selectedItem).click();
                    this.selectedItem = null;
                    break;
                }
                //Fall through on purpose! (So enter on a nested dropdown acts as right arrow)
            case KeyCode.Right:
                if (this.selectedItem && this.selectedItem.hasAttribute("suiDropdown")) {
                    (<HTMLElement> this.selectedItem).click();
                    this.selectedItem = this.selectedItem.querySelector(`.${this.itemClass}:not(.${this.itemDisabledClass})`);
                }
                break;
            case KeyCode.Left:
                if (this.selectedItem.parentElement != this.menuElement.nativeElement) {
                    (<HTMLElement> this.selectedItem.parentElement.parentElement).click();
                    this.selectedItem = this.selectedItem.parentElement.parentElement;
                }
                break;
        }
    }

    public selectNextItem():void {
        if (!this.selectedItem) {
            this.selectedItem = this.menuElement.nativeElement.querySelector(`.${this.itemClass}:not(.${this.itemDisabledClass})`);
            return;
        }
        var nextItem = this.selectedItem.nextElementSibling;
        if (nextItem) {
            this.selectedItem = nextItem;
            if (this.selectedItem.classList.contains(this.itemDisabledClass)) {
                this.selectNextItem();
            }
        }
    }

    public selectPreviousItem():void {
        if (this.selectedItem) {
            var previousItem = this.selectedItem.previousElementSibling;
            if (previousItem) {
                this.selectedItem = previousItem;
                if (this.selectedItem.classList.contains(this.itemDisabledClass)) {
                    this.selectPreviousItem();
                }
            }
            return;
        }
        this.selectNextItem();
    }
}
