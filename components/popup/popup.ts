import {Component, ViewChild, ViewContainerRef, ElementRef, Renderer, EventEmitter, TemplateRef} from '@angular/core';
import {SuiTransition, Transition, TransitionDirection} from '../transition/transition';
import {TransitionController} from '../transition/transition-controller';
import {PositioningService} from '../util/positioning.service';

@Component({
    selector: 'sui-popup',
    template: `
<div class="ui popup top left" [suiTransition]="transitionController" #container>
    <ng-container *ngIf="!template">
        <div class="header" *ngIf="header">{{ header }}</div>
        <div class="content">{{ text }}</div>
    </ng-container>
    <div #template></div>
</div>
`,
    styles: [`
.ui.popup {
    right: auto;
}
`]
})
export class SuiPopup {
    public transitionController:TransitionController;

    public template:TemplateRef<any>;
    private _templateInjected:boolean;
    
    public header:string;
    public text:string;
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
    public templateSibling:ViewContainerRef;

    constructor(public elementRef:ElementRef) {
        this.transitionController = new TransitionController(false);

        this._templateInjected = false;

        this.transition = "scale in";
        this.transitionDuration = 200;

        this._isOpen = false;
        this.onClose = new EventEmitter<void>();
    }

    public open() {
        if (!this._isOpen) {
            clearTimeout(this._closingTimeout);

            if (this.template && !this._templateInjected) {
                this.templateSibling.createEmbeddedView(this.template, { '$implicit': this });
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