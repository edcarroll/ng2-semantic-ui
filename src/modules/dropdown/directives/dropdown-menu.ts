import {
    Directive, ContentChild, forwardRef, Renderer2, ElementRef, AfterContentInit,
    ContentChildren, QueryList, Input, HostListener, ChangeDetectorRef, OnDestroy
} from "@angular/core";
import { Transition, SuiTransition, TransitionController, TransitionDirection } from "../../transition/internal";
import { HandledEvent, IAugmentedElement, KeyCode } from "../../../misc/util/internal";
import { DropdownService, DropdownAutoCloseType } from "../services/dropdown.service";
// Polyfill for IE
import "element-closest";

@Directive({
    // We must attach to every '.item' as Angular doesn't support > selectors.
    selector: ".item"
})
export class SuiDropdownMenuItem {
    public get isDisabled():boolean {
        // We must use nativeElement as Angular doesn't have a way of reading class information.
        const element = this.element.nativeElement as Element;
        return element.classList.contains("disabled");
    }

    private _isSelected:boolean;

    public get isSelected():boolean {
        return this._isSelected;
    }

    public set isSelected(value:boolean) {
        // Renderer is used to enable a dynamic class name.
        if (value) {
            this._renderer.addClass(this.element.nativeElement, this.selectedClass);
        } else {
            this._renderer.removeClass(this.element.nativeElement, this.selectedClass);
        }
    }

    // Stores the class name used for a 'selected' item.
    public selectedClass:string;

    @ContentChild(forwardRef(() => SuiDropdownMenu))
    public childDropdownMenu:SuiDropdownMenu;

    public get hasChildDropdown():boolean {
        return !!this.childDropdownMenu;
    }

    constructor(private _renderer:Renderer2, public element:ElementRef) {
        this.isSelected = false;

        this.selectedClass = "selected";
    }

    public performClick():void {
        // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
        this.element.nativeElement.click();
    }
}

@Directive({
    selector: "[suiDropdownMenu]"
})
export class SuiDropdownMenu extends SuiTransition implements AfterContentInit, OnDestroy {
    private _service:DropdownService;
    private _transitionController:TransitionController;

    @Input()
    public menuTransition:string;

    @Input()
    public menuTransitionDuration:number;

    public get service():DropdownService {
        return this._service;
    }

    public set service(value:DropdownService) {
        this._service = value;

        let previousIsOpen = this._service.isOpen;
        this._service.isOpenChange.subscribe((isOpen:boolean) => {
            if (isOpen !== previousIsOpen) {
                // Only run transitions if the open state has changed.
                this._transitionController.stopAll();
                this._transitionController.animate(
                    new Transition(
                        this.menuTransition,
                        this.menuTransitionDuration,
                        TransitionDirection.Either,
                        () => this._service.isAnimating = false));
            }

            if (!isOpen) {
                // Reset the item selections when a nested item is selected to avoid incosistent open states.
                if (this.selectedItems.length > 1) {
                    this.resetSelection();
                }
            }

            previousIsOpen = isOpen;
        });
    }

    public set parentElement(value:ElementRef) {
        this._parentKeyDownListener = this._renderer
            .listen(value.nativeElement, "keydown", (e:KeyboardEvent) =>
                this.onParentKeyDown(e));
    }

    @ContentChildren(SuiDropdownMenuItem)
    private _itemsQueryInternal:QueryList<SuiDropdownMenuItem>;

    private _itemsQueryOverride:QueryList<SuiDropdownMenuItem>;

    public set items(items:QueryList<SuiDropdownMenuItem>) {
        this._itemsQueryOverride = items;
    }

    private get _itemsQuery():QueryList<SuiDropdownMenuItem> {
        return this._itemsQueryOverride || this._itemsQueryInternal;
    }

    // Get the list of items, ignoring those that are disabled.
    private get _items():SuiDropdownMenuItem[] {
        return this._itemsQuery.filter(i => !i.isDisabled);
    }

    // Stack that keeps track of the currently selected item.
    // Selected items lower in the stack are necessarily the parent of the item one higher.
    public selectedItems:SuiDropdownMenuItem[];

    // Sets whether or not to automatically select the 1st item when the dropdown is opened.
    @Input()
    public menuAutoSelectFirst:boolean;

    @Input()
    public menuSelectedItemClass:string;

    private _parentKeyDownListener:() => void;

    constructor(renderer:Renderer2, element:ElementRef, changeDetector:ChangeDetectorRef) {
        super(renderer, element, changeDetector);

        // Initialise transition functionality.
        this._transitionController = new TransitionController(false);
        this.setTransitionController(this._transitionController);

        this.menuTransition = "slide down";
        this.menuTransitionDuration = 200;

        this.menuAutoSelectFirst = false;
        this.menuSelectedItemClass = "selected";

        // In case the dropdown menu is destroyed before it has a chance to be fully initialised.
        this._parentKeyDownListener = () => {};
    }

    @HostListener("click", ["$event"])
    public onClick(e:HandledEvent & MouseEvent):void {
        if (!e.eventHandled) {
            e.eventHandled = true;

            if (this._service.autoCloseMode === DropdownAutoCloseType.ItemClick) {
                const target = e.target as IAugmentedElement;
                if (this._element.nativeElement.contains(target.closest(".item")) && !/input|textarea/i.test(target.tagName)) {
                    // Once an item is selected, we can close the entire dropdown.
                    this._service.setOpenState(false, true);
                }
            }
        }
    }

    public onParentKeyDown(e:KeyboardEvent):void {
        // Only the root dropdown (i.e. not nested dropdowns) is responsible for keeping track of the currently selected item.
        if (this._service && this._service.isOpen && !this._service.isNested) {
            // Stop document events like scrolling while open.
            const target = e.target as Element;
            if (!/input/i.test(target.tagName) &&
                [KeyCode.Escape, KeyCode.Enter, KeyCode.Up, KeyCode.Down, KeyCode.Left, KeyCode.Right].find(kC => kC === e.keyCode)) {
                e.preventDefault();
            }

            // Gets the top selected item from the stack.
            const [selected] = this.selectedItems.slice(-1);
            // Keeping track of the menu containing the currently selected element allows us to easily determine its siblings.
            let selectedContainer:SuiDropdownMenu = this;
            if (this.selectedItems.length >= 2) {
                const [selectedParent] = this.selectedItems.slice(-2);
                selectedContainer = selectedParent.childDropdownMenu;
            }

            switch (e.keyCode) {
                // Escape : close the entire dropdown.
                case KeyCode.Escape: {
                    this._service.setOpenState(false);
                    break;
                }
                // Down : select the next item below the current one, or the 1st if none selected.
                case KeyCode.Down:
                // Up : select the next item above the current one, or the 1st if none selected.
                case KeyCode.Up: {
                    this.selectedItems.pop();
                    this.selectedItems.push(selectedContainer.updateSelection(selected, e.keyCode));
                    // Prevent default regardless of whether we are in an input, to stop jumping to the start or end of the query string.
                    e.preventDefault();
                    break;
                }
                // Enter : if the item doesn't contain a nested dropdown, 'click' it. Otherwise, fall through to 'Right' action.
                case KeyCode.Enter: {
                    if (selected && !selected.hasChildDropdown) {
                        selected.performClick();
                        break;
                    }
                }
                    // falls through
                // Right : if the selected item contains a nested dropdown, open the dropdown & select the 1st item.
                case KeyCode.Right: {
                    if (selected && selected.hasChildDropdown) {
                        selected.childDropdownMenu.service.setOpenState(true);

                        this.selectedItems.push(selected.childDropdownMenu.updateSelection(selected, e.keyCode));
                    }
                    break;
                }
                // Left : if the selected item is in a nested dropdown, close it and select the containing item.
                case KeyCode.Left: {
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
    }

    public resetSelection():void {
        this.selectedItems = [];
        this._items.forEach(i => {
            i.selectedClass = this.menuSelectedItemClass;
            i.isSelected = false;
        });

        if (this.menuAutoSelectFirst && this._items.length > 0) {
            // Autoselect 1st item if required & possible.
            this._items[0].isSelected = true;
            this.scrollToItem(this._items[0]);
            this.selectedItems.push(this._itemsQuery.first);
        }
    }

    // Determines the item to next be selected, based on the keyboard input & the currently selected item.
    public updateSelection(selectedItem:SuiDropdownMenuItem, keyCode:KeyCode):SuiDropdownMenuItem {
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
                if (selectedIndex === -1) {
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

            // Set the current scroll position to the location of the newly selected item.
            this.scrollToItem(newSelection);
        }

        return newSelection;
    }

    public scrollToItem(item:SuiDropdownMenuItem):void {
        const menu:Element = this._element.nativeElement;
        const selectedRect:ClientRect = item.element.nativeElement.getBoundingClientRect();

        const menuRect = menu.getBoundingClientRect();

        let scrollAmount = 0;

        if (selectedRect.bottom > menuRect.bottom) {
            scrollAmount = selectedRect.bottom - menuRect.bottom;
        }

        if (selectedRect.top < menuRect.top) {
            scrollAmount = selectedRect.top - menuRect.top;
        }

        menu.scrollTop += Math.round(scrollAmount);
    }

    public ngAfterContentInit():void {
        this.onItemsChanged();
        this._itemsQuery.changes.subscribe(() => this.onItemsChanged());
    }

    private onItemsChanged():void {
        // We use `_items` rather than `items` in case one or more have become disabled.
        this.resetSelection();
    }

    public ngOnDestroy():void {
        this._parentKeyDownListener();
    }
}
