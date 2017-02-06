import {Directive, Input, HostBinding, EventEmitter, Output, AfterContentInit, ContentChild, Renderer, ElementRef, HostListener, QueryList, ContentChildren, forwardRef} from '@angular/core';
import {SuiTransition, TransitionController, Transition} from '../transition/transition';

export type NewDropdownAutoCloseType = "itemClick" | "outsideClick" | "disabled";

// Creates essentially a 'string' enum.
export const NewDropdownAutoCloseType = {
    ItemClick: "itemClick" as NewDropdownAutoCloseType,
    OutsideClick: "outsideClick" as NewDropdownAutoCloseType,
    Disabled: "disabled" as NewDropdownAutoCloseType
}

// Keyboard keycodes in use by the dropdown.
export enum KeyCode {
    Left = 37,
    Up = 38,
    Right = 39,
    Down = 40,

    Escape = 27,
    Enter = 13,

    Space = 32,
    Backspace = 8
};

export class NewDropdownService {
    // Open state of the dropdown
    public isOpen:boolean;
    // Emitter for when dropdown open state changes.
    public isOpenChange:EventEmitter<boolean>;

    public isDisabled:boolean;

    // Sets the "autoclose" mode of the dropdown - i.e. what user action causes it to autoclose.
    // Options are itemClick (close when choosing an item or clicking outside) [default], outsideClick (choose only when clicking outside) & disabled (never autoclose).
    public autoCloseMode:NewDropdownAutoCloseType;

    // Keep track of the containing dropdown so we can open it as necessary.
    public parent:NewDropdownService;
    // Also keep track of dropdowns nested in this one so we can close them as necessary.
    public children:NewDropdownService[];
    public get isNested() {
        return !!this.parent;
    }

    constructor() {
        this.isOpen = false;
        this.isOpenChange = new EventEmitter<boolean>();

        this.isDisabled = false;

        this.autoCloseMode = NewDropdownAutoCloseType.ItemClick;

        this.children = [];
    }

    public setOpenState(isOpen:boolean, reflectInParent:boolean = false) {
        if (this.isOpen != isOpen && !this.isDisabled) {
            // Only update the state if it has changed, and the dropdown isn't disabled.
            this.isOpen = !!isOpen;
            // We must delay the emitting to avoid the 'changed after checked' Angular errors.
            this.delay(() => this.isOpenChange.emit(this.isOpen));

            if (!this.isOpen) {
                // Close the child dropdowns when this one closes.
                this.children.forEach(c => c.setOpenState(this.isOpen));
            }

            if (this.parent && reflectInParent) {
                // Open the parent dropdowns when this one opens.
                this.parent.setOpenState(this.isOpen, true);
            }
        }
        else if (this.isOpen != isOpen && this.isDisabled) {
            // If the state has changed, but the dropdown is disabled, re-emit the original isOpen value.
            this.delay(() => this.isOpenChange.emit(this.isOpen));
        }
    }

    public setDisabledState(isDisabled:boolean) {
        if (this.isDisabled != isDisabled) {
            if (!!isDisabled) {
                // Close the dropdown as it is now disabled
                this.setOpenState(false);
            }

            this.isDisabled = !!isDisabled;
        }
    }

    public toggleOpenState() {
        this.setOpenState(!this.isOpen);
    }

    // Registers a dropdown service as a child of this service.
    public registerChild(child:NewDropdownService) {
        if (!this.isChildRegistered(child)) {
            this.children.push(child);
            child.parent = this;
        }
    }

    // Recursive method to check if the provided dropdown is already registered as a child, or is a descendant of a child.
    public isChildRegistered(child:NewDropdownService):boolean {
        return this === child || !!this.children
            .find(c => !!c.children
                .find(c => c.isChildRegistered(child)));
    }

    // Wipes any nested data, so all services can be cleanly reattached.
    public clearChildren() {
        this.children.forEach(c => {
            c.parent = null;
        });
        this.children = [];
    }

    // Method for delaying an event into the next tick, to avoid Angular "changed after checked" error.
    private delay(callback:() => any) {
        setTimeout(() => callback());
    }
}

@Directive({
    selector: '.item'
})
export class NewSuiDropdownMenuItem {
    public get isDisabled() {
        // We must use nativeElement as Angular doesn't have a way of reading class information.
        const element = this._element.nativeElement as Element;
        return element.classList.contains("disabled");
    }

    @HostBinding('class.selected')
    public isSelected:boolean;

    @ContentChild(forwardRef(() => NewSuiDropdownMenu))
    public childDropdownMenu:NewSuiDropdownMenu;

    public get hasChildDropdown() {
        return !!this.childDropdownMenu;
    }

    constructor(private _renderer:Renderer, private _element:ElementRef) {
        this.isSelected = false;
    }

    public performClick() {
        // Manually click the element. Done via renderer so as to avoid nativeElement changes directly.
        this._renderer.invokeElementMethod(this._element.nativeElement, "click");
    }
}

@Directive({
    selector: '[newSuiDropdownMenu]'
})
export class NewSuiDropdownMenu extends SuiTransition implements AfterContentInit {
    private _service:NewDropdownService;
    private _transitionController:TransitionController;

    // Allows the dropdown to be programmatically opened without being immediately closed by a mouse event.
    private _isOpenOnMousedown:boolean;

    public get service() {
        return this._service;
    }

    public set service(value:NewDropdownService) {
        this._service = value;

        let previousIsOpen = this._service.isOpen;
        this._service.isOpenChange.subscribe(isOpen => {
            if (isOpen != previousIsOpen) {
                // Only run transitions if the open state has changed.
                this._transitionController.stopAll();
                this._transitionController.animate(new Transition("slide down", 200));
            }

            if (!isOpen) {
                // Reset the item selections so that nothing is selected when the dropdown is reopened.
                this.resetSelection();
            }

            previousIsOpen = isOpen;
        });
    }

    @ContentChildren(NewSuiDropdownMenuItem)
    private _items:QueryList<NewSuiDropdownMenuItem>;

    // Get the list of items, ignoring those that are disabled.
    public get items() {
        return this._items.filter(i => !i.isDisabled);
    }

    // Stack that keeps track of the currently selected item. Selected items lower in the stack are necessarily the parent of the item one higher.
    public selectedItems:NewSuiDropdownMenuItem[];

    // Sets whether or not to automatically select the 1st item when the dropdown is opened.
    @Input()
    public autoSelectFirst:boolean;

    constructor(renderer:Renderer, element:ElementRef) {
        super(renderer, element);

        // Initialise transition functionality.
        this._transitionController = new TransitionController(false);
        this.setTransitionController(this._transitionController);       

        this._isOpenOnMousedown = false;

        this.autoSelectFirst = false;
    }

    @HostListener("click", ["$event"])
    public onClick(e:MouseEvent) {
        e.stopPropagation();

        if (this._service.autoCloseMode == NewDropdownAutoCloseType.ItemClick) {
            if (e.srcElement.classList.contains("item")) {
                // Once an item is selected, we can close the entire dropdown.
                this._service.setOpenState(false, true);
            }
        }
    }

    @HostListener("document:mousedown")
    public onDocumentMousedown(e:MouseEvent) {
        // This is to ensure that we don't immediately close a dropdown as it is being opened programmatically.
        this._isOpenOnMousedown = this._service.isOpen;
    }

    @HostListener("document:click", ["$event"])
    public onDocumentClick(e:MouseEvent) {
        if (this._isOpenOnMousedown) {
            if (this._service.autoCloseMode == NewDropdownAutoCloseType.ItemClick || NewDropdownAutoCloseType.OutsideClick) {
                // No need to reflect in parent since they are also bound to document.
                this._service.setOpenState(false);
            }
        }
    }

    @HostListener("document:keydown", ["$event"])
    public onDocumentKeydown(e:KeyboardEvent) {
        // Only the root dropdown (i.e. not nested dropdowns) is responsible for keeping track of the currently selected item.
        if (this._service.isOpen && !this._service.isNested) {

            // Gets the top selected item from the stack.
            let [selected] = this.selectedItems.slice(-1);
            // Keeping track of the menu containing the currently selected element allows us to easily determine its siblings.
            let selectedContainer:NewSuiDropdownMenu = this;
            if (this.selectedItems.length >= 2) {
                const [selectedParent] = this.selectedItems.slice(-2);
                selectedContainer = selectedParent.childDropdownMenu;
            }

            switch (e.keyCode) {
                // Escape : close the entire dropdown.
                case KeyCode.Escape:
                    this._service.setOpenState(false);
                    break;
                // Down : select the next item below the current one, or the 1st if none selected.
                case KeyCode.Down:
                // Up : select the next item above the current one, or the 1st if none selected.
                case KeyCode.Up:
                    this.selectedItems.pop();
                    this.selectedItems.push(selectedContainer.updateSelection(selected, e.keyCode));
                    break;
                // Enter : if the item doesn't contain a nested dropdown, 'click' it. Otherwise, fall through to 'Right' action.
                case KeyCode.Enter:
                    if (!selected.hasChildDropdown) {
                        selected.performClick();
                        break;
                    }
                // Right : if the selected item contains a nested dropdown, open the dropdown & select the 1st item.
                case KeyCode.Right:
                    if (selected && selected.hasChildDropdown) {
                        selected.childDropdownMenu.service.setOpenState(true);

                        this.selectedItems.push(selected.childDropdownMenu.updateSelection(selected, e.keyCode));
                    }
                    break;
                // Left : if the selected item is in a nested dropdown, close it and select the containing item.
                case KeyCode.Left:
                    if (this.selectedItems.length >= 2) {
                        this.selectedItems.pop();
                        const [selectedParent] = this.selectedItems.slice(-1);

                        selectedParent.childDropdownMenu.service.setOpenState(false);
                        selectedParent.isSelected = true;
                    }
                    break;
            }
        }
    }

    public resetSelection() {
        this.selectedItems = [];
        this.items.forEach(i => i.isSelected = false);
    }

    // Determines the item to next be selected, based on the keyboard input & the currently selected item.
    public updateSelection(selectedItem:NewSuiDropdownMenuItem, keyCode:KeyCode) {
        if (selectedItem) {
            // Remove the selected status on the previously selected item.
            selectedItem.isSelected = false;
        }

        let selectedIndex = this.items
            .findIndex(i => i === selectedItem);

        let newSelection:NewSuiDropdownMenuItem;

        switch (keyCode) {
            case KeyCode.Enter:
            case KeyCode.Right:
            case KeyCode.Down:
                selectedIndex += 1;
                break;
            case KeyCode.Up:
                if (selectedIndex == -1) {
                    // If none are selected, select the 1st item. Should this be `this.items.last - 1`?
                    selectedIndex = 0;

                    break;
                }

                selectedIndex -= 1;
                break;
        }

        // Select the item at the updated index. The || is to stop us selecting past the start or end of the item list.
        newSelection = this.items[selectedIndex] || selectedItem;

        if (newSelection) {
            // Set the selected status on the newly selected item.
            newSelection.isSelected = true;
        }

        return newSelection;
    }

    public ngAfterContentInit() {
        this.itemsChanged();
        this._items.changes.subscribe(() => this.itemsChanged());
    }

    private itemsChanged() {
        // We use `_items` rather than `items` in case one or more have become disabled.
        this._items.forEach(i => i.isSelected = false);
        this.selectedItems = [];
        if (this.autoSelectFirst && this.items.length > 0) {
            // Autoselect 1st item if required & possible.
            this.items[0].isSelected = true;
            this.selectedItems.push(this._items.first);
        }
        
    }
}

@Directive({
    selector: '[newSuiDropdown]'
})
export class NewSuiDropdown implements AfterContentInit {
    public service:NewDropdownService;

    @ContentChild(NewSuiDropdownMenu)
    private _menu:NewSuiDropdownMenu;


    @ContentChildren(NewSuiDropdown, { descendants: true })
    private _children:QueryList<NewSuiDropdown>;

    public get children() {
        // @ContentChildren includes the current element by default.
        return this._children.filter(c => c !== this);
    }

    @Output()
    public get isOpenChange() {
        return this.service.isOpenChange;
    }

    @HostBinding('class.active')
    public get isActive() {
        // This is to ensure nested dropdowns don't get made bold.
        return this.service.isOpen && !this.service.isNested;
    }

    @Input()
    public get isOpen() {
        return this.service.isOpen;
    }

    public set isOpen(value:boolean) {
        // If we are opening the dropdown, we want to always open its parents.
        this.service.setOpenState(value, !!value);
    }

    @HostBinding('class.disabled')
    @Input()
    public get isDisabled() {
        return this.service.isDisabled;
    }

    public set isDisabled(value:boolean) {
        this.service.setDisabledState(value);
    }

    @Input()
    public get autoClose() {
        return this.service.autoCloseMode;
    }

    public set autoClose(value:NewDropdownAutoCloseType) {
        this.service.autoCloseMode = value;
    }

    constructor() {
        this.service = new NewDropdownService();
    }

    public ngAfterContentInit() {
        if (!this._menu) {
            throw new Error("You must set [suiDropdownMenu] on the menu element.");
        }
        this._menu.service = this.service;

        this.childrenUpdated();
        this._children.changes
            .subscribe(() => this.childrenUpdated());
    }

    private childrenUpdated() {
        // Reregister child dropdowns each time the menu content changes.
        this.children
            .map(c => c.service)
            .forEach(s => this.service.registerChild(s))
    }

    @HostListener("click", ['$event'])
    public onClick(e:MouseEvent) {
        // Block the click event from being fired on parent dropdowns.
        e.stopPropagation();

        this.service.toggleOpenState();
    }
}