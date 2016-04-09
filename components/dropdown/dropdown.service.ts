export const DISABLED = 'disabled';
export const OUTSIDECLICK = 'outsideClick';

export const KEYCODE = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,

    ESCAPE: 27,
    ENTER: 13
};

import {Dropdown} from './dropdown.directive';

export class DropdownService {
    private dropdown:Dropdown;

    private closeDropdownBind:EventListener = this.closeDropdown.bind(this);
    private keybindFilterBind:EventListener = this.keybindFilter.bind(this);

    public open(dropdown:Dropdown):void {
        if (!this.dropdown) {
            window.document.addEventListener('click', this.closeDropdownBind, true);
            if (!dropdown.el.nativeElement.parentElement.hasAttribute("suiDropdownMenu")) {
                window.document.addEventListener('keydown', this.keybindFilterBind);
            }
        }

        this.dropdown = dropdown;
    }

    public close():void {
        this.dropdown = null;
        window.document.removeEventListener('click', this.closeDropdownBind, true);
        window.document.removeEventListener('keydown', this.keybindFilterBind);
    }

    private closeDropdown(event:MouseEvent):void {
        console.log("Hi");
        //Never close the dropdown if autoClose is disabled
        if (event && this.dropdown.autoClose === DISABLED) {
            return;
        }

        //Don't close the dropdown when clicking the toggle
        if (event && this.dropdown.el.nativeElement.contains(event.target) &&
            !this.dropdown.menuEl.nativeElement.contains(event.target)) {
            return;
        }

        //Don't close the dropdown if expanding a nested dropdown
        if (event && this.dropdown.menuEl.nativeElement.contains(event.target) &&
            (<Element> event.target).hasAttribute("suiDropdown")) {
            return;
        }

        //Don't close the dropdown if clicking on any input element
        if (event && this.dropdown.menuEl &&
            /input|textarea/i.test((<Element> event.target).tagName) &&
            this.dropdown.menuEl.nativeElement.contains(event.target)) {
            return;
        }

        //Don't close the dropdown when clicking inside if autoClose is outsideClick
        if (event && this.dropdown.autoClose === OUTSIDECLICK &&
            this.dropdown.menuEl &&
            this.dropdown.menuEl.nativeElement.contains(event.target)) {
            return;
        }

        //Close the dropdown
        this.dropdown.isOpen = false;
    }

    private keybindFilter(event:KeyboardEvent):void {
        if (event.which === KEYCODE.ESCAPE) {
            this.dropdown.isOpen = false;
            return;
        }

        if (this.dropdown.isOpen &&
            ([KEYCODE.ENTER, KEYCODE.UP, KEYCODE.RIGHT, KEYCODE.DOWN, KEYCODE.LEFT]
                .find(keyCode => event.which == keyCode))) {
            event.preventDefault();
            event.stopPropagation();
            this.dropdown.keyPress(event.which);
        }
    }
}