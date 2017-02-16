import {Directive, Input, ElementRef, ComponentFactoryResolver, ViewContainerRef, ComponentRef, HostListener, TemplateRef, Renderer} from '@angular/core';
import {SuiPopup} from './popup';
import {PositioningPlacement} from '../util/positioning.service';

@Directive({
    selector: '[suiPopup]',
    exportAs: 'popup'
})
export class SuiPopupDirective {
    private _template:TemplateRef<any>;
    private _header:string;
    private _text:string;
    private _inverted:boolean;
    private _placement:PositioningPlacement;
    
    @Input()
    public set popupTemplate(template:TemplateRef<any>) {
        this._template = template;
        this.copyConfig();
    }

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
    public set popupInverted(inverted:boolean) {
        if (typeof inverted == "string") {
            inverted = true;
        }
        this._inverted = inverted;
        this.copyConfig();
    }

    @Input()
    public set popupPlacement(placement:PositioningPlacement) {
        const [direction, alignment] = placement.split(" ");

        let chosenPlacement = [direction];
        switch (alignment) {
            case "top":
            case "left":
                chosenPlacement.push("start");
                break;
            case "bottom":
            case "right":
                chosenPlacement.push("end");
                break;
        }

        this._placement = chosenPlacement.join("-") as PositioningPlacement;
        this.copyConfig();
    }

    private _popupComponentRef:ComponentRef<SuiPopup>;

    private get _popup() {
        return this._popupComponentRef.instance;
    }

    constructor(private _element:ElementRef, private _viewContainerRef:ViewContainerRef, private _componentFactoryResolver:ComponentFactoryResolver) {}

    private copyConfig() {
        if (this._popupComponentRef) {
            if (this.hasOwnProperty("_header")) {
                this._popup.header = this._header;
            }
            if (this.hasOwnProperty("_text")) {
                this._popup.text = this._text;
            }
            if (this.hasOwnProperty("_template")) {
                this._popup.template = this._template;
            }
            if (this.hasOwnProperty("_inverted")) {
                this._popup.inverted = this._inverted;
            }
            if (this.hasOwnProperty("_placement")) {
                this._popup.placement = this._placement;
            }
        }
    }

    @HostListener("mouseenter")
    public open() {
        if (!this._popupComponentRef) {
            const factory = this._componentFactoryResolver.resolveComponentFactory(SuiPopup);
            this._popupComponentRef = this._viewContainerRef.createComponent(factory);

            this._popup.onClose.subscribe(() => {
                this._popupComponentRef.destroy();
                this._popupComponentRef = null;
            });

            this.copyConfig();

            this._popup.anchor = this._element;
        }

        this._popup.open();
    }

    @HostListener("mouseleave")
    public close() {
        this._popup.close();
    }
}