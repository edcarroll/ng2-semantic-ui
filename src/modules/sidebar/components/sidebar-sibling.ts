import { Component, Input, HostBinding, HostListener, ElementRef, Renderer2 } from "@angular/core";
import { SidebarService, SidebarTransition } from "../services/sidebar.service";

@Component({
    selector: "sui-sidebar-sibling",
    template: `<ng-content></ng-content>`,
    styles: [`
:host {
    display: block;
}
`]
})
export class SuiSidebarSibling {
    private _service:SidebarService;

    public get service():SidebarService {
        return this._service;
    }

    public set service(service:SidebarService) {
        this._service = service;

        setTimeout(() => this.updateTransform());
        this._service.isVisibleChange.subscribe(() => this.updateTransform());
    }

    @Input()
    public isDimmedWhenVisible:boolean;

    @HostBinding("class.visible")
    public get isVisible():boolean {
        if (!this.service) {
            return false;
        }
        return this.service.isVisible;
    }

    @HostBinding("class.dimmed")
    public get isDimmed():boolean {
        if (!this.service) {
            return false;
        }
        return this.service.isVisible && this.isDimmedWhenVisible;
    }

    @HostBinding("class.pusher")
    public readonly hasClasses:boolean;

    constructor(private _renderer:Renderer2, private _element:ElementRef) {
        this.isDimmedWhenVisible = false;

        this.hasClasses = true;
    }

    private updateTransform():void {
        this._renderer.removeStyle(this._element.nativeElement, "transform");
        this._renderer.removeStyle(this._element.nativeElement, "-webkit-transform");

        if (this.service.isVisible &&
            this.service.transition !== SidebarTransition.Overlay &&
            this.service.transition !== SidebarTransition.ScaleDown) {

            const translate = `translate3d(${this.service.width}px, ${this.service.height}px, 0)`;
            this._renderer.setStyle(this._element.nativeElement, "transform", translate);
            this._renderer.setStyle(this._element.nativeElement, "-webkit-transform", translate);
        }
    }

    @HostListener("click", ["$event"])
    public onClick(event:MouseEvent):void {
        if (this.service.isVisible && !this.service.wasJustOpened) {
            this.service.setVisibleState(false);
        }
    }
}
