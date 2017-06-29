import { EventEmitter } from "@angular/core";

export type DropdownAutoCloseType = "itemClick" | "outsideClick" | "disabled";

// Creates essentially a 'string' enum.
export const DropdownAutoCloseType = {
    ItemClick: "itemClick" as DropdownAutoCloseType,
    OutsideClick: "outsideClick" as DropdownAutoCloseType,
    Disabled: "disabled" as DropdownAutoCloseType
};

export class DropdownService {
    // Open state of the dropdown
    public isOpen:boolean;
    // Animating state of the dropdown.
    public isAnimating:boolean;
    // Emitter for when dropdown open state changes.
    public isOpenChange:EventEmitter<boolean>;

    public isDisabled:boolean;

    // Sets the "autoclose" mode of the dropdown - i.e. what user action causes it to autoclose.
    public autoCloseMode:DropdownAutoCloseType;

    // Keep track of the containing dropdown so we can open it as necessary.
    public parent?:DropdownService;
    // Also keep track of dropdowns nested in this one so we can close them as necessary.
    public children:DropdownService[];
    public get isNested():boolean {
        return !!this.parent;
    }

    constructor(autoCloseMode:DropdownAutoCloseType = DropdownAutoCloseType.ItemClick) {
        this.isOpen = false;
        this.isOpenChange = new EventEmitter<boolean>();

        this.isDisabled = false;

        this.autoCloseMode = autoCloseMode;

        this.children = [];
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

    // Registers a dropdown service as a child of this service.
    public registerChild(child:DropdownService):void {
        if (!this.isChildRegistered(child)) {
            this.children.push(child);
            child.parent = this;
        }
    }

    // Recursive method to check if the provided dropdown is already registered as a child, or is a descendant of a child.
    public isChildRegistered(child:DropdownService):boolean {
        return this === child || !!this.children
            .find(c => !!c.children
                .find(cChild => cChild.isChildRegistered(child)));
    }

    // Wipes any nested data, so all services can be cleanly reattached.
    public clearChildren():void {
        this.children.forEach(c => {
            c.parent = undefined;
        });
        this.children = [];
    }

    // Method for delaying an event into the next tick, to avoid Angular "changed after checked" error.
    private delay(callback:() => void):void {
        setTimeout(() => callback());
    }
}
