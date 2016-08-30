import {Directive, ElementRef, Input, HostBinding, Renderer} from '@angular/core';

@Directive({
    selector: '[suiCollapse]',
    exportAs: 'suiCollapse'
})
export class SuiCollapse {
    private animation:any;

    // @HostBinding('style.display')
    private display:string = "none";
    // shown
    @HostBinding('class.expanded')
    private isExpanded:boolean = true;
    // hidden
    @HostBinding('class.collapsed')
    private isCollapsed:boolean = false;
    // animation state
    @HostBinding('class.collapsing')
    private isCollapsing:boolean = false;

    @Input()
    private set suiCollapse(value:boolean) {
        this.isExpanded = value;
        this.isCollapsed = !this.isExpanded;
        this.toggle();
    }

    private get suiCollapse():boolean {
        return this.isExpanded;
    }

    private _el:ElementRef;
    private _renderer:Renderer;

    public constructor(_el:ElementRef, _renderer: Renderer) {
        this._el = _el;
        this._renderer = _renderer;
    }

    public toggle():void {
        if (this.isExpanded) {
            this.hide();
        } else {
            this.show();
        }
    }

    public hide():void {
        this.isCollapsing = true;

        this.isExpanded = false;

        this._renderer.setElementStyle(this._el.nativeElement, 'overflow', 'hidden');
        this._renderer.setElementStyle(this._el.nativeElement, 'height', '0');

        this.isCollapsing = false;
        this.isCollapsed = true;
    }

    public show():void {
        this.isCollapsing = true;

        this.isCollapsed = false;

        this.display = '';

        this._renderer.setElementStyle(this._el.nativeElement, 'overflow', 'visible');
        this._renderer.setElementStyle(this._el.nativeElement, 'height', 'auto');

        this.isCollapsing = false;
        this.isExpanded = true;
    }
}

export const SUI_COLLAPSE_DIRECTIVES = [SuiCollapse];
