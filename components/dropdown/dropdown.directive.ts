import {Directive, Input, Output, HostBinding, EventEmitter, ElementRef, HostListener} from 'angular2/core';
import {DropdownService, KEYCODE} from './dropdown.service';

@Directive({
    selector: '[suiDropdown]'
})
export class Dropdown {
    @HostBinding('class.visible')
    @Input()
    public get isOpen():boolean {
        return this._isOpen;
    }

    @Input() public autoClose:string;

    @Output() public onToggle:EventEmitter<boolean> = new EventEmitter(false);
    @Output() public isOpenChange:EventEmitter<boolean> = new EventEmitter(false);

    @HostBinding('class.disabled')
    @Input() public isDisabled:boolean = false;

    // drop menu html
    public menuEl:ElementRef;
    private _isOpen:boolean;

    private _dropdownService:DropdownService = new DropdownService();

    public constructor(public el: ElementRef) { }

    public set isOpen(value:boolean) {
        if (this.isDisabled) { value = false; }
        this._isOpen = !!value;

        if (this.isOpen) {
            this._dropdownService.open(this);

            this.selectedItem = null;
        }
        else {
            this._dropdownService.close();
        }

        setTimeout(() => {
            this.onToggle.emit(this._isOpen);
            this.isOpenChange.emit(this._isOpen);
        });
    }

    public set dropDownMenu(dropdownMenu:{ el:ElementRef }) {
        // init drop down menu
        this.menuEl = dropdownMenu.el;
    }

    public toggle() {
        this.isOpen = !this.isOpen;
    }

    @HostListener('click', ['$event'])
    public click(event:MouseEvent):boolean {
        event.stopPropagation();

        if (!this.menuEl.nativeElement.contains(event.target)) {
            this.toggle();
        }
        return false;
    }

    public keyPress(keyCode:number):void {
        //noinspection FallThroughInSwitchStatementJS
        switch (keyCode) {
            case KEYCODE.DOWN:
                this.selectNextItem();
                break;
            case KEYCODE.UP:
                this.selectPreviousItem();
                break;
            case KEYCODE.ENTER:
                if (!this.selectedItem.hasAttribute("suiDropdown")) {
                    (<HTMLElement> this.selectedItem).click();

                    this.isOpen = false;
                    break;
                }
                //Fall through on purpose! (So enter on a nested dropdown acts as right arrow)
            case KEYCODE.RIGHT:
                if (this.selectedItem.hasAttribute("suiDropdown")) {
                    (<HTMLElement> this.selectedItem).click();
                    this.selectedItem = this.selectedItem.querySelector(".item:not(.disabled)");
                }
                break;
            case KEYCODE.LEFT:
                if (this.selectedItem.parentElement != this.menuEl.nativeElement) {
                    console.log(this.selectedItem.parentElement.parentElement);
                    (<HTMLElement> this.selectedItem.parentElement.parentElement).click();
                    this.selectedItem = this.selectedItem.parentElement.parentElement;
                }
                break;
        }
    }

    private _selectedItem:Element = null;
    public set selectedItem(item:Element) {
        if (this._selectedItem) {
            this._selectedItem.classList.remove("selected");
        }
        this._selectedItem = item;
        if (item) {
            item.classList.add("selected");
        }
    }
    public get selectedItem():Element {
        return this._selectedItem;
    }

    private selectNextItem():void {
        if (!this.selectedItem) {
            this.selectedItem = this.menuEl.nativeElement.querySelector(".item:not(.disabled)");
            return;
        }
        var nextItem = this.selectedItem.nextElementSibling;
        if (nextItem) {
            this.selectedItem = nextItem;
            if (this.selectedItem.classList.contains("disabled")) {
                this.selectNextItem();
            }
        }
    }

    private selectPreviousItem():void {
        var previousItem = this.selectedItem.previousElementSibling;
        if (previousItem) {
            this.selectedItem = previousItem;
            if (this.selectedItem.classList.contains("disabled")) {
                this.selectPreviousItem();
            }
        }
    }
}
