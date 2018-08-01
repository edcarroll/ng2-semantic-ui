import { Component, HostBinding, Input, Output, Renderer2, ElementRef, EventEmitter } from "@angular/core";
import { SidebarService, SidebarTransition, SidebarDirection } from "../services/sidebar.service";

@Component({
    selector: "sui-sidebar",
    template: `<ng-content></ng-content>`
})
export class SuiSidebar {
    public service:SidebarService;

    @HostBinding("class.ui")
    @HostBinding("class.sidebar")
    @HostBinding("class.menu")
    public readonly hasClasses:boolean;

    @Input()
    public get transition():SidebarTransition {
        return this.service.transition;
    }

    public set transition(transition:SidebarTransition) {
        this.service.transition.split(" ").forEach(c => this.setClass(c, false));

        this.service.transition = transition;

        this.service.transition.split(" ").forEach(c => this.setClass(c, true));
    }

    @Input()
    public get direction():SidebarDirection {
        return this.service.direction;
    }

    public set direction(direction:SidebarDirection) {
        this.setClass(this.service.direction, false);

        this.service.direction = direction;

        this.setClass(this.service.direction, true);
    }

    @HostBinding("class.visible")
    @Input()
    public get isVisible():boolean {
        return this.service.isVisible;
    }

    public set isVisible(isVisible:boolean) {
        this.service.setVisibleState(isVisible);
    }

    @Output()
    public get isVisibleChange():EventEmitter<boolean> {
        return this.service.isVisibleChange;
    }

    @HostBinding("class.animating")
    public get isAnimating():boolean {
        return this.service.isAnimating;
    }

    constructor(private _renderer:Renderer2, private _element:ElementRef) {
        this.service = new SidebarService();
        // We set the default here as well to force the classes to update.
        this.transition = SidebarTransition.Uncover;
        this.direction = SidebarDirection.Left;

        setTimeout(() => this.updateDimensions());
        this.service.isVisibleChange.subscribe(() => this.updateDimensions());

        this.hasClasses = true;
    }

    private updateDimensions():void {
        this.service.width = this._element.nativeElement.offsetWidth;
        this.service.height = this._element.nativeElement.offsetHeight;
    }

    private setClass(className:string, isAdd:boolean = true):void {
        if (isAdd) {
            this._renderer.addClass(this._element.nativeElement, className);
        } else {
            this._renderer.removeClass(this._element.nativeElement, className);
        }
    }

    public open():void {
        this.service.setVisibleState(true);
    }

    public close():void {
        this.service.setVisibleState(false);
    }

    public toggle():void {
        this.service.toggleVisibleState();
    }
}
