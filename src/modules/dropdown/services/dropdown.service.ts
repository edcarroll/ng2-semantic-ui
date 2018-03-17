import { EventEmitter } from "@angular/core";
import { DropdownOpenTrigger,DropdownCloseTrigger } from "../classes/dropdown-config";
import { HandledEvent, KeyCode } from "../../../misc/util/index";

export class DropdownService {
    // Open state of the dropdown
    public isOpen:boolean;
    // Animating state of the dropdown.
    public isAnimating:boolean;
    // Emitter for when dropdown open state changes.
    public isOpenChange:EventEmitter<boolean>;

    public isDisabled:boolean;

    private _openingTimeout:any;
    private _closingTimeout: any;

    public hoverOpenDelay:number;
    public hoverCloseDelay: number;

    // Sets the "open" trigger of the dropdown - i.e. what user action causes it to open.
    public openTrigger:DropdownOpenTrigger;
    // Sets the "close" triggers of the dropdown - i.e. what user actions cause it to close.
    public closeTriggers: DropdownCloseTrigger[];

    /**
     * Keep track of the containing dropdown so we can open it as necessary.
     */
    public parent?:DropdownService;
    /**
     * Also keep track of dropdowns nested in this one so we can close them as necessary.
     */
    public children: DropdownService[];

    public get isNested():boolean {
        return !!this.parent;
    }

    constructor() {
        this.isOpen = false;
        this.isOpenChange = new EventEmitter<boolean>();
        this.isDisabled = false;
        this.children = [];
        this.hoverOpenDelay = 100;
        this.hoverCloseDelay = 500;
        this.openTrigger = DropdownOpenTrigger.Click;
        this.closeTriggers = [DropdownCloseTrigger.Click, DropdownCloseTrigger.ItemClick, DropdownCloseTrigger.OutsideClick];
    }

    public setOpenState(isOpen:boolean, reflectInParent:boolean = false):void {
        if (this.isOpen !== isOpen && !this.isDisabled) {
            // Only update the state if it has changed, and the dropdown isn't disabled.
            this.isOpen = !!isOpen;
            this.isAnimating = true;
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
        } else if (this.isOpen !== isOpen && this.isDisabled) {
            // If the state has changed, but the dropdown is disabled, re-emit the original isOpen value.
            this.delay(() => this.isOpenChange.emit(this.isOpen));
        }
    }

    public setDisabledState(isDisabled:boolean):void {
        if (this.isDisabled !== isDisabled) {
            if (!!isDisabled) {
                // Close the dropdown as it is now disabled
                this.setOpenState(false);
            }

            this.isDisabled = !!isDisabled;
        }
    }

    public toggleOpenState():void {
        this.setOpenState(!this.isOpen);
    }

    /**
     *  Registers a dropdown service as a child of this service.
     */
    public registerChild(child:DropdownService):void {
        if (!this.isChildRegistered(child)) {
            this.children.push(child);
            child.parent = this;
        }
    }

    /**
     * Recursive method to check if the provided dropdown is already registered as a child, or is a descendant of a child.
     */
    public isChildRegistered(child:DropdownService):boolean {
        return this === child || !!this.children
            .find(c => !!c.children
                .find(cChild => cChild.isChildRegistered(child)));
    }

    /**
     * Wipes any nested data, so all services can be cleanly reattached.
     */
    public clearChildren():void {
        this.children.forEach(c => {
            c.parent = undefined;
        });
        this.children = [];
    }

    /**
     * Method for delaying an event into the next tick, to avoid Angular "changed after checked" error.
     */
    private delay(callback:() => void):void {
        setTimeout(() => callback());
    }

    public handleClick(e: HandledEvent): void {
        if (e.eventHandled) {
            return;
        }
        e.eventHandled = true;
        if (this.openTrigger === DropdownOpenTrigger.Click && !this.isOpen) {
            this.setOpenState(true);
        } else if (this.isOpen && this.closeTriggers.indexOf(DropdownCloseTrigger.Click) > -1) {
            this.setOpenState(false);
        }
    }

    public handleItemClick(e: HandledEvent & MouseEvent): void {
         if (e.eventHandled) {
             return;
         }
         e.eventHandled = true;
         if (this.closeTriggers.indexOf(DropdownCloseTrigger.ItemClick) > -1) {
             // Once an item is selected, we can close the entire dropdown.
             this.setOpenState(false,true);
         }
    }

    public handleFocusOut():void {
        if (this.closeTriggers.indexOf(DropdownCloseTrigger.OutsideClick) > -1) {
            this.setOpenState(false);
        }
    }

    public handleKeypress(e: HandledEvent & KeyboardEvent): void {
        // Block the keyboard event from being fired on parent dropdowns.
        if (e.eventHandled) {
            return;
        }
        if (e.keyCode === KeyCode.Enter) {
            e.eventHandled = true;
            this.setOpenState(true);
        }
    }

    public handleMouseEnter(): void {
        if (this.openTrigger === DropdownOpenTrigger.Hover) {
            // Cancel any pending open and close
            clearTimeout(this._openingTimeout);
            clearTimeout(this._closingTimeout);

            // Start opening after the specified delay interval.
            this._openingTimeout = setTimeout(
                () => {
                    this.setOpenState(true);
                    // this.focus();
                },
                this.hoverOpenDelay
            );
        }
    }

    public handleMouseLeave():void {
        if (this.closeTriggers.indexOf(DropdownCloseTrigger.OutsideHover) > -1) {
            // Cancel any pending open and close
            clearTimeout(this._closingTimeout);
            clearTimeout(this._openingTimeout);

            // Start closing after the specified delay interval.
            this._closingTimeout = setTimeout(
                () => {
                    if (this.isOpen) {
                        this.setOpenState(false);
                    }
                },
                this.hoverCloseDelay
            );
        }
    }
}
