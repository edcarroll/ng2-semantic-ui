import {Component, ViewChild, ViewContainerRef, ElementRef, Renderer, EventEmitter, TemplateRef} from '@angular/core';
import {SuiTransition, Transition, TransitionDirection} from '../transition/transition';
import {TransitionController} from '../transition/transition-controller';
import {PositioningService} from '../util/positioning.service';

@Component({
    selector: 'sui-popup',
    template: `
<div class="ui popup" [class.inverted]="inverted" [suiTransition]="transitionController" #container>
    <ng-container *ngIf="!template">
        <div class="header" *ngIf="header">{{ header }}</div>
        <div class="content">{{ text }}</div>
    </ng-container>
    <div #template></div>
    <div class="arrow"></div>
</div>
`,
    styles: [`
.ui.popup {
    right: auto;
}

.ui.inverted.popup .arrow {
    background: #1B1C1D;
}

[x-placement^="top"],
[x-placement^="bottom"] {
    margin-top: 1em;
    margin-bottom: 1em;
}

[x-placement^="left"],
[x-placement^="right"] {
    margin-left: 1em;
    margin-right: 1em;
}

.arrow {
    position: absolute;
    content: '';
    width: .71428571em;
    height: .71428571em;
    background: #FFF;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    z-index: 2;
    box-shadow: 1px 1px 0 0 #bababc;
}

[x-placement="top-start"] .arrow,
[x-placement="bottom-start"] .arrow {
    /* How to make this work? */
    /* margin-left: -2em; */
}

[x-placement^="top"] .arrow {
    bottom: -.30714286em;
}

[x-placement^="bottom"] .arrow {
    top: -.30714286em;
}

.ui.popup::before {
    display: none;
}
`]
})
export class SuiPopup {
    public transitionController:TransitionController;

    public template:TemplateRef<any>;
    private _templateInjected:boolean;
    
    public header:string;
    public text:string;
    public inverted:boolean;
    public transition:string;
    public transitionDuration:number;

    public position:PositioningService;

    private _isOpen:boolean;
    private _closingTimeout:any;
    public onClose:EventEmitter<void>;

    public get isOpen() {
        return this._isOpen;
    }

    @ViewChild('container', { read: ViewContainerRef })
    public container:ViewContainerRef;

    @ViewChild('template', { read: ViewContainerRef })
    private _templateSibling:ViewContainerRef;

    constructor(public elementRef:ElementRef) {
        this.transitionController = new TransitionController(false);

        this._templateInjected = false;

        this.inverted = false;
        this.transition = "scale in";
        this.transitionDuration = 200;

        this._isOpen = false;
        this.onClose = new EventEmitter<void>();
    }

    public open() {
        if (!this._isOpen) {
            clearTimeout(this._closingTimeout);

            if (this.template && !this._templateInjected) {
                this._templateSibling.createEmbeddedView(this.template, { '$implicit': this });
                this._templateInjected = true;
            }
            
            this.transitionController.stopAll();
            this.transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.In));

            this._isOpen = true;
        }
    }

    public close() {
        if (this._isOpen) {
            this.transitionController.stopAll();
            this.transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.Out));

            clearTimeout(this._closingTimeout);
            this._closingTimeout = setTimeout(() => this.onClose.emit(), this.transitionDuration);

            this._isOpen = false;
        }
    }
}