import {Component, HostBinding, Input, Output, Renderer, ElementRef, EventEmitter} from '@angular/core';
import {SidebarService, SidebarTransition, SidebarDirection} from './sidebar.service';

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
        this.service.transition.split(" ").forEach(c => this.setClass(c, false));

        this.service.transition = transition;

        this.service.transition.split(" ").forEach(c => this.setClass(c, true));
    }

    @Input()
    public get direction() {
        return this.service.direction;
    }

    public set direction(direction:SidebarDirection) {
        this.setClass(this.service.direction, false);

        this.service.direction = direction;

        this.setClass(this.service.direction, true);
    }

    @HostBinding("class.visible")
    @Input()
    public get isVisible() {
        return this.service.isVisible;
    }

    public set isVisible(isVisible:boolean) {
        this.service.setVisibleState(isVisible);
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
        this.transition = SidebarTransition.Uncover;
        this.direction = SidebarDirection.Left;

        setTimeout(() => this.updateDimensions());
        this.service.isVisibleChange.subscribe(() => this.updateDimensions());

        this._sidebarClasses = true;
    }

    private updateDimensions() {
        this.service.width = this._element.nativeElement.offsetWidth;
        this.service.height = this._element.nativeElement.offsetHeight;
    }

    private setClass(className:string, isAdd:boolean = true) {
        this._renderer.setElementClass(this._element.nativeElement, className, isAdd);
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