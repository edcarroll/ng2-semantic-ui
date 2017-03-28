import {Component, HostBinding, ElementRef, OnInit, Directive, ContentChild, AfterContentInit, Input, HostListener, Renderer, Output, EventEmitter} from '@angular/core';

export type SidebarTransition = "overlay" | "push" | "scale down" | "uncover" | "slide along" | "slide out";

// Creates essentially a 'string' enum.
export const SidebarTransition = {
    Overlay: "overlay" as SidebarTransition,
    Push: "push" as SidebarTransition,
    ScaleDown: "scale down" as SidebarTransition,
    Uncover: "uncover" as SidebarTransition,
    SlideAlong: "slide along" as SidebarTransition,
    SlideOut: "slide out" as SidebarTransition,
}

export class SidebarService {
    public isVisible:boolean;
    public isAnimating:boolean;
    public wasJustOpened:boolean;

    public isVisibleChange:EventEmitter<boolean>;

    private _isAnimatingTimeout:any;

    public transition:SidebarTransition;

    constructor(isVisible:boolean = false) {
        this.isVisible = isVisible;
        this.isAnimating = false;
        this.wasJustOpened = false;

        this.isVisibleChange = new EventEmitter<boolean>();

        this.transition = SidebarTransition.Push;
    }

    public setVisibleState(isVisible:boolean) {
        if (this.isVisible != isVisible) {
            this.isVisible = isVisible;
            this.isAnimating = true;
            this.wasJustOpened = true;

            this.isVisibleChange.emit(isVisible);

            setTimeout(() => this.wasJustOpened = false);
            clearTimeout(this._isAnimatingTimeout);
            this._isAnimatingTimeout = setTimeout(() => this.isAnimating = false, 500);
        }
    }

    public toggleVisibleState() {
        this.setVisibleState(!this.isVisible);
    }
}

@Component({
    selector: 'sui-sidebar',
    template: `<ng-content></ng-content>`
})
export class SuiSidebar {
    public service:SidebarService;

    @HostBinding("class.ui")
    @HostBinding("class.sidebar")
    @HostBinding("class.menu")
    private _sidebarClasses:boolean;

    @Input()
    public get transition() {
        return this.service.transition;
    }

    public set transition(transition:SidebarTransition) {
        const oldClasses = this.service.transition.split(" ");
        oldClasses.forEach(c => this._renderer.setElementClass(this._element.nativeElement, c, false));

        this.service.transition = transition;

        const classes = transition.split(" ");
        classes.forEach(c => this._renderer.setElementClass(this._element.nativeElement, c, true));
    }

    @HostBinding("class.visible")
    @Input()
    public get isVisible() {
        return this.service.isVisible;
    }

    public set isVisible(isVisible:boolean) {
        this.service.isVisible = isVisible;
    }

    @Output()
    public get isVisibleChange() {
        return this.service.isVisibleChange;
    }

    @HostBinding("class.animating")
    public get isAnimating() {
        return this.service.isAnimating;
    }

    constructor(private _renderer:Renderer, private _element:ElementRef) {
        this.service = new SidebarService();
        // We set the default here as well to force the classes to update.
        this.transition = SidebarTransition.Push;

        this._sidebarClasses = true;
    }

    public open() {
        this.service.setVisibleState(true);
    }

    public close() {
        this.service.setVisibleState(false);
    }

    public toggle() {
        this.service.toggleVisibleState();
    }
}

@Component({
    selector: 'sui-sidebar-sibling',
    template: `<ng-content></ng-content>`,
    styles: [`
:host {
    display: block;
}
`]
})
export class SuiSidebarSibling {
    private _service:SidebarService;

    public get service() {
        return this._service;
    }

    public set service(service:SidebarService) {
        this._service = service;
    }

    @Input()
    public isDimmedWhenOpen:boolean;

    @HostBinding("class.dimmed")
    public get isDimmed() {
        if (!this.service) {
            return false;
        }
        return this.service.isVisible && this.isDimmedWhenOpen;
    }

    @HostBinding("class.pusher")
    private _siblingClasses:boolean;

    constructor() {
        this.isDimmedWhenOpen = false;

        this._siblingClasses = true;
    }

    @HostListener("click", ["$event"])
    public onClick(event:MouseEvent) {
        if (this.service.isVisible && !this.service.wasJustOpened) {
            this.service.setVisibleState(false);
        }
    }
}

@Component({
    selector: 'sui-sidebar-container',
    template: `<ng-content></ng-content>`,
    styles: [`
:host {
    display: block;
}
`]
})
export class SuiSidebarContainer implements AfterContentInit {
    public service:SidebarService;

    @HostBinding("class.pushable")
    private _containerClasses:boolean;

    @ContentChild(SuiSidebar)
    public sidebar:SuiSidebar;

    @ContentChild(SuiSidebarSibling)
    public sibling:SuiSidebarSibling;

    constructor() {
        this._containerClasses = true;
    }

    public ngAfterContentInit() {
        if (!this.sidebar) {
            throw new Error("You must include a <sui-sidebar> element within the container.");
        }
        this.service = this.sidebar.service;

        if (!this.sibling) {
            throw new Error("You must include a <sui-sidebar-sibling> element within the container.");
        }
        this.sibling.service = this.service;
    }
}

