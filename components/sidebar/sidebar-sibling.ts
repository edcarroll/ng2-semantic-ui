import {Component, Input, HostBinding, HostListener, ElementRef, Renderer} from '@angular/core';
import {SidebarService, SidebarTransition} from './sidebar.service';

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

        setTimeout(() => this.updateTransform());
        this._service.isVisibleChange.subscribe(() => this.updateTransform());
    }

    @Input()
    public isDimmedWhenOpen:boolean;

    @HostBinding("class.visible")
    public get isVisible() {
        if (!this.service) {
            return false;
        }
        return this.service.isVisible
    }

    @HostBinding("class.dimmed")
    public get isDimmed() {
        if (!this.service) {
            return false;
        }
        return this.service.isVisible && this.isDimmedWhenOpen;
    }

    @HostBinding("class.pusher")
    private _siblingClasses:boolean;

    constructor(private _renderer:Renderer, private _element:ElementRef) {
        this.isDimmedWhenOpen = false;

        this._siblingClasses = true;
    }

    private updateTransform() {
        this._renderer.setElementStyle(this._element.nativeElement, "transform", null);
        this._renderer.setElementStyle(this._element.nativeElement, "-webkit-transform", null);
        
        if (this.service.isVisible && this.service.transition != SidebarTransition.Overlay && this.service.transition != SidebarTransition.ScaleDown) {
            const translate = `translate3d(${this.service.width}px, ${this.service.height}px, 0)`;
            this._renderer.setElementStyle(this._element.nativeElement, "transform", translate);
            this._renderer.setElementStyle(this._element.nativeElement, "-webkit-transform", translate);
        }
    }

    @HostListener("click", ["$event"])
    public onClick(event:MouseEvent) {
        if (this.service.isVisible && !this.service.wasJustOpened) {
            this.service.setVisibleState(false);
        }
    }
}