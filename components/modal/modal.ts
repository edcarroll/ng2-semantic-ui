import {Component, Input, HostBinding, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, EventEmitter, Output, HostListener} from '@angular/core';
import {TransitionController} from '../transition/transition-controller';
import {Transition, TransitionDirection} from '../transition/transition';
import {KeyCode} from '../util/util';

@Component({
    selector: 'sui-modal',
    template: `
<sui-dimmer class="page" [(isDimmed)]="_dimBackground" [isClickable]="false" [transitionDuration]="transitionDuration" (click)="close()"></sui-dimmer>
<div class="ui active modal" [suiTransition]="_transitionController" #modal>
    <i class="close icon" *ngIf="isClosable" (click)="close()"></i>
    <ng-content></ng-content>
</div>
`
})
export class SuiModal implements OnInit, AfterViewInit {
    @Input()
    public isClosable:boolean;

    private _transitionController:TransitionController;

    @Input()
    public transition:string;

    @Input()
    public transitionDuration:number;

    @Output("dismiss")
    public onDismiss:EventEmitter<void>;

    @ViewChild('modal')
    private _modalElement:ElementRef;

    private _dimBackground:boolean;
    private _isClosing:boolean;

    constructor(private _renderer:Renderer2) {
        this.isClosable = true;

        this.transition = "scale";
        this.transitionDuration = 500;

        this.onDismiss = new EventEmitter<void>();

        this._dimBackground = false;
        this._isClosing = false;
        this._transitionController = new TransitionController(false);
    }

    public ngOnInit() {
        // Display modal.
        this._transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.In));
        setTimeout(() => this._dimBackground = true);
    }

    public ngAfterViewInit() {
        // Update margin offset to center modal correctly on-screen.
        const element = this._modalElement.nativeElement as Element;
        this._renderer.setStyle(element, "margin-top", `-${element.clientHeight / 2}px`);
    }

    private dismiss(callback:() => void = () => {}) {
        if (!this._isClosing) {
            this._isClosing = true;

            this._dimBackground = false;
            this._transitionController.stopAll();
            this._transitionController.animate(
                new Transition(this.transition, this.transitionDuration, TransitionDirection.Out, () => {
                    this.onDismiss.emit();
                    callback();
                }));    
        }
    }

    private close() {
        if (this.isClosable) {
            this.cancel();
        }
    }

    public cancel() {
        this.dismiss(() => {
            console.log("closed");
        });
    }

    @HostListener("document:keyup", ["$event"])
    public onKeyup(e:KeyboardEvent) {
        if (e.keyCode == KeyCode.Escape) {
            this.close();
        }
    }
}