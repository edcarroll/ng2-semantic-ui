import {Directive, Input, HostBinding, EventEmitter, Output, AfterContentInit, ContentChild, Renderer, ElementRef, HostListener, QueryList, ContentChildren, forwardRef} from '@angular/core';
import {SuiTransition, Transition} from '../transition/transition';
import {TransitionController} from '../transition/transition-controller';
import {DropdownService, DropdownAutoCloseType} from './dropdown.service';
import {SuiDropdownMenu} from './dropdown-menu';
import {PositioningService, PositioningPlacement} from '../util/positioning.service';

@Directive({
    selector: '[suiDropdown]'
})
export class SuiDropdown implements AfterContentInit {
    public service:DropdownService;
    public position:PositioningService;

    @ContentChild(SuiDropdownMenu)
    private _menu:SuiDropdownMenu;

    @ContentChildren(SuiDropdown, { descendants: true })
    private _children:QueryList<SuiDropdown>;

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

    public set autoClose(value:DropdownAutoCloseType) {
        this.service.autoCloseMode = value;
    }

    constructor(private _element:ElementRef) {
        this.service = new DropdownService();
    }

    public ngAfterContentInit() {
        if (!this._menu) {
            throw new Error("You must set [suiDropdownMenu] on the menu element.");
        }
        this._menu.service = this.service;

        let elem = this._element.nativeElement as Element;
        let top = elem.classList.contains("top");
        let bottom = elem.classList.contains("bottom");
        let left = elem.classList.contains("left");
        let right = elem.classList.contains("right");

        let placement = PositioningPlacement.Inherit;

        if (top) {
            if (left) {
                placement = PositioningPlacement.BottomLeft;
            }
            else if (right) {
                placement = PositioningPlacement.BottomRight;
            }
            else {
                placement = PositioningPlacement.BottomCenter;
            }
        }
        else if (bottom) {
            if (left) {
                placement = PositioningPlacement.TopLeft;
            }
            else if (right) {
                placement = PositioningPlacement.TopRight;
            }
            else {
                placement = PositioningPlacement.TopCenter;
            }
        }
        else if (left) {
            placement = PositioningPlacement.RightTop;
        }
        else if (right) {
            placement = PositioningPlacement.LeftTop;
        }

        this.position = new PositioningService(this._element, this._menu.element, placement);

        this.childrenUpdated();
        this._children.changes
            .subscribe(() => this.childrenUpdated());
    }

    private childrenUpdated() {
        // Reregister child dropdowns each time the menu content changes.
        this.children
            .map(c => c.service)
            .forEach(s => this.service.registerChild(s))

        this.children
            .filter(c => c.position.placement == PositioningPlacement.Inherit)
            .forEach(c => c.position.placement = this.position.placement);
    }

    @HostListener("click", ['$event'])
    public onClick(e:MouseEvent) {
        // Block the click event from being fired on parent dropdowns.
        e.stopPropagation();

        this.service.toggleOpenState();

        if (!this.service.isNested) {
            this.position.update();
        }
    }
}