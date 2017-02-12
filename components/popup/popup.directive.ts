import {Directive, Input, ElementRef, ComponentFactoryResolver, ViewContainerRef, ComponentRef, HostListener, TemplateRef} from '@angular/core';
import {SuiPopup} from './popup';
import {PositioningService, PositioningPlacement} from '../util/positioning.service';

@Directive({
    selector: '[suiPopup]',
    exportAs: 'popup'
})
export class SuiPopupDirective {
    private _header:string;
    private _text:string;
    private _template:TemplateRef<any>;
    
    @Input()
    public set popupHeader(header:string) {
        this._header = header;
        this.copyConfig();
    }

    @Input()
    public set popupText(text:string) {
        this._text = text;
        this.copyConfig();
    }

    @Input()
    public set popupTemplate(template:TemplateRef<any>) {
        this._template = template;
        this.copyConfig();
    }

    private _popupComponentRef:ComponentRef<SuiPopup>;

    private get _popup() {
        return this._popupComponentRef.instance;
    }

    constructor(private _element:ElementRef, private _viewContainerRef:ViewContainerRef, private _componentFactoryResolver:ComponentFactoryResolver) {}

    private copyConfig() {
        if (this._popupComponentRef) {
            this._popup.header = this._header;
            this._popup.text = this._text;
            this._popup.template = this._template;
        }
    }

    @HostListener("mouseenter")
    public open() {
        if (!this._popupComponentRef) {
            const factory = this._componentFactoryResolver.resolveComponentFactory(SuiPopup);
            this._popupComponentRef = this._viewContainerRef.createComponent(factory);

            this._popup.position = new PositioningService(this._element, this._popup.container.element, PositioningPlacement.TopLeft);
            this._popup.onClose.subscribe(() => {
                this._popupComponentRef.destroy();
                this._popupComponentRef = null;
            });

            this.copyConfig();
        }

        this._popup.open();
    }

    @HostListener("mouseleave")
    public close() {
        // this._popup.close();
    }
}