import {Directive, HostBinding, ContentChild, forwardRef, Renderer, ElementRef, AfterContentInit, ContentChildren, QueryList, Input, HostListener} from '@angular/core';
import {SuiTransition, Transition} from '../transition/transition';
import {DropdownService, DropdownAutoCloseType} from './dropdown.service';
import {TransitionController} from '../transition/transition-controller';
import {KeyCode} from '../util/util';

@Directive({
    // We must attach to every '.item' as Angular doesn't support > selectors.
    selector: '.item'
})
export class SuiDropdownMenuItem {
    public get isDisabled() {
        // We must use nativeElement as Angular doesn't have a way of reading class information.
        const element = this._element.nativeElement as Element;
        return element.classList.contains("disabled");
    }

    private _isSelected:boolean;

    public get isSelected() {
        return this._isSelected;
    }

    public set isSelected(value:boolean) {
        // Renderer is used to enable a dynamic class name.
        this._renderer.setElementClass(this._element.nativeElement, this.selectedClass, value)
    }

    // Stores the class name used for a 'selected' item.
    public selectedClass:string;

    @ContentChild(forwardRef(() => SuiDropdownMenu))
    public childDropdownMenu:SuiDropdownMenu;

    public get hasChildDropdown() {
        return !!this.childDropdownMenu;
    }

    constructor(private _renderer:Renderer, private _element:ElementRef) {
        this.isSelected = false;

        this.selectedClass = "selected";
    }

    public performClick() {
        // Manually click the element. Done via renderer so as to avoid nativeElement changes directly.
        this._renderer.invokeElementMethod(this._element.nativeElement, "click");
    }
}

@Directive({
    selector: '[suiDropdownMenu]'
})
export class SuiDropdownMenu extends SuiTransition implements AfterContentInit {
    private _service:DropdownService;
    private _transitionController:TransitionController;

    @Input()
    public menuTransition:string;

    @Input()
    public menuTransitionDuration:number;

    // Allows the dropdown to be programmatically opened without being immediately closed by a mouse event.
    private _isOpenOnMousedown:boolean;

    public get service() {
        return this._service;
    }

    public set service(value:DropdownService) {
        this._service = value;

        let previousIsOpen = this._service.isOpen;
        this._service.isOpenChange.subscribe((isOpen:boolean) => {
            if (isOpen != previousIsOpen) {
                // Only run transitions if the open state has changed.
                this._transitionController.stopAll();
                this._transitionController.animate(new Transition(this.menuTransition, this.menuTransitionDuration));
            }

            if (!isOpen) {
                // Reset the item selections so that nothing is selected when the dropdown is reopened.
                this.resetSelection();
            }

            previousIsOpen = isOpen;
        });
    }

    @ContentChildren(SuiDropdownMenuItem)
    private _itemsQueryInternal:QueryList<SuiDropdownMenuItem>;

    private _itemsQueryOverride:QueryList<SuiDropdownMenuItem>;

    public set items(items:QueryList<SuiDropdownMenuItem>) {
        this._itemsQueryOverride = items;
    }

    private get _itemsQuery() {
        return this._itemsQueryOverride || this._itemsQueryInternal;
    }

    // Get the list of items, ignoring those that are disabled.
    private get _items() {
        return this._itemsQuery.filter(i => !i.isDisabled);
    }

    // Stack that keeps track of the currently selected item. Selected items lower in the stack are necessarily the parent of the item one higher.
    public selectedItems:SuiDropdownMenuItem[];

    // Sets whether or not to automatically select the 1st item when the dropdown is opened.
    @Input()
    public menuAutoSelectFirst:boolean;

    @Input()
    public menuSelectedItemClass:string;

    constructor(renderer:Renderer, public element:ElementRef) {
        super(renderer, element);

        // Initialise transition functionality.
        this._transitionController = new TransitionController(false);
        this.setTransitionController(this._transitionController);

        this.menuTransition = "slide down";
        this.menuTransitionDuration = 200;

        this._isOpenOnMousedown = false;

        this.menuAutoSelectFirst = false;
        this.menuSelectedItemClass = "selected";
    }

    @HostListener("click", ["$event"])
    public onClick(e:MouseEvent) {
        e.stopPropagation();

        if (this._service.autoCloseMode == DropdownAutoCloseType.ItemClick) {
            if ((e.target as Element).classList.contains("item")) {
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
            if (this._service.autoCloseMode == DropdownAutoCloseType.ItemClick || this._service.autoCloseMode == DropdownAutoCloseType.OutsideClick) {
                // No need to reflect in parent since they are also bound to document.
                this._service.setOpenState(false);
            }
        }
    }

    @HostListener("document:keydown", ["$event"])
    public onDocumentKeydown(e:KeyboardEvent) {
        // Only the root dropdown (i.e. not nested dropdowns) is responsible for keeping track of the currently selected item.
        if (this._service.isOpen && !this._service.isNested) {
            // Stop document events like scrolling while open.
            if ((e.target as Element).tagName != "INPUT" || e.keyCode == KeyCode.Enter) {
                e.preventDefault();
            }

            // Gets the top selected item from the stack.
            let [selected] = this.selectedItems.slice(-1);
            // Keeping track of the menu containing the currently selected element allows us to easily determine its siblings.
            let selectedContainer:SuiDropdownMenu = this;
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
                    // Prevent default regardless of whether we are in an input, to stop jumping to the start or end of the query string.
                    e.preventDefault();
                    break;
                // Enter : if the item doesn't contain a nested dropdown, 'click' it. Otherwise, fall through to 'Right' action.
                case KeyCode.Enter:
                    if (selected && !selected.hasChildDropdown) {
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
        this._items.forEach(i => {
            i.selectedClass = this.menuSelectedItemClass;
            i.isSelected = false;
        });

        if (this.menuAutoSelectFirst && this._items.length > 0) {
            // Autoselect 1st item if required & possible.
            this._items[0].isSelected = true;
            this.selectedItems.push(this._itemsQuery.first);
        }
    }

    // Determines the item to next be selected, based on the keyboard input & the currently selected item.
    public updateSelection(selectedItem:SuiDropdownMenuItem, keyCode:KeyCode) {
        if (selectedItem) {
            // Remove the selected status on the previously selected item.
            selectedItem.isSelected = false;
        }

        let selectedIndex = this._items
            .findIndex(i => i === selectedItem);

        let newSelection:SuiDropdownMenuItem;

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
        newSelection = this._items[selectedIndex] || selectedItem;

        if (newSelection) {
            // Set the selected status on the newly selected item.
            newSelection.isSelected = true;
        }

        return newSelection;
    }

    public ngAfterContentInit() {
        this.onItemsChanged();
        this._itemsQuery.changes.subscribe(() => this.onItemsChanged());
    }

    private onItemsChanged() {
        // We use `_items` rather than `items` in case one or more have become disabled.
        this.resetSelection();
    }
}