import {Component, Input, HostBinding, OnInit, ViewChild, ElementRef, Renderer2, EventEmitter, Output, HostListener, AfterContentInit, ViewContainerRef} from '@angular/core';
import {TransitionController} from '../transition/transition-controller';
import {Transition, TransitionDirection} from '../transition/transition';
import {KeyCode} from '../util/util';
import {ModalControls} from './modal-controls';

@Component({
    selector: 'sui-modal',
    template: `
<!-- Page dimmer for modal background. -->
<sui-dimmer class="page" [(isDimmed)]="_dimBackground" [isClickable]="false" [transitionDuration]="transitionDuration" (click)="close()"></sui-dimmer>
<!-- Modal component, with transition component attached -->
<div class="ui modal" [suiTransition]="_transitionController" [class.active]="_transitionController?.isVisible" #modal>
    <!-- Configurable close icon -->
    <i class="close icon" *ngIf="isClosable" (click)="close()"></i>
    <!-- @ViewChild reference so we can insert elements beside this div. -->
    <div #templateSibling></div>
    <!-- <ng-content> so that <sui-modal> can be used as a normal component. -->
    <ng-content></ng-content>
</div>
`
})
export class SuiModal<T, U> implements OnInit, AfterContentInit {
    // Determines whether the modal can be closed with a close button, clicking outside, or the escape key.
    @Input()
    public isClosable:boolean;

    // Value to deny with when closing via `isClosable`.
    @Input()
    public closeResult:U;

    // Separate class for the `approve` and `deny` methods to support passing into components.
    public controls:ModalControls<T, U>;

    public get approve() {
        return this.controls.approve;
    }

    public get deny() {
        return this.controls.deny;
    }

    // Fires when the modal closes, after `approve` has been called.
    @Output('approve')
    public onApprove:EventEmitter<T>;

    // Fires when the modal closes, after `deny` has been called.
    @Output('deny')
    public onDeny:EventEmitter<U>;

    // Fires when the modal closes.
    @Output("dismiss")
    public onDismiss:EventEmitter<void>;

    @ViewChild('modal')
    private _modalElement:ElementRef;

    private _transitionController:TransitionController;

    // Transition to display modal with.
    @Input()
    public transition:string;

    // Duration of the modal & dimmer transitions.
    @Input()
    public transitionDuration:number;

    // Whether or not the backround dimmer is active.
    private _dimBackground:boolean;
    // True after `approve` or `deny` has been called.
    private _isClosing:boolean;

    // `ViewContainerRef` for the element the template gets injected as a sibling of.
    @ViewChild('templateSibling', { read: ViewContainerRef })
    public templateSibling:ViewContainerRef;

    constructor(private _renderer:Renderer2) {
        // Initialise with default configuration.
        this.isClosable = true;

        this.transition = "scale";
        this.transitionDuration = 500;

        // Event emitters for each of the possible modal outcomes.
        this.onApprove = new EventEmitter<T>();
        this.onDeny = new EventEmitter<U>();
        this.onDismiss = new EventEmitter<void>();

        // Initialise controls with actions for the `approve` and `deny` cases.
        this.controls = new ModalControls<T, U>(
            res => this.dismiss(() => this.onApprove.emit(res)),
            res => this.dismiss(() => this.onDeny.emit(res)));

        // Internal variable initialisation.
        this._dimBackground = false;
        this._isClosing = false;
        this._transitionController = new TransitionController(false);
    }

    public ngOnInit() {
        // Transition the modal to be visible.
        this._transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.In));
        // Use a slight delay as the `<sui-dimmer>` cancels the initial transition.
        setTimeout(() => this._dimBackground = true);
    }

    public ngAfterContentInit() {
        // Update margin offset to center modal correctly on-screen.
        const element = this._modalElement.nativeElement as Element;
        this._renderer.setStyle(element, "margin-top", `-${element.clientHeight / 2}px`);
    }

    private dismiss(callback:() => void = () => {}) {
        // If we aren't currently closing,
        if (!this._isClosing) {
            this._isClosing = true;

            // Transition the modal to be invisible.
            this._dimBackground = false;
            this._transitionController.stopAll();
            this._transitionController.animate(
                new Transition(this.transition, this.transitionDuration, TransitionDirection.Out, () => {
                    // When done, emit a dismiss event, and fire the callback.
                    this.onDismiss.emit();
                    callback();
                }));
        }
    }

    public close() {
        if (this.isClosable) {
            // If we are allowed to close, fire the deny result with the default value.
            this.deny(this.closeResult);
        }
    }

    @HostListener("document:keyup", ["$event"])
    public onKeyup(e:KeyboardEvent) {
        if (e.keyCode == KeyCode.Escape) {
            // Close automatically covers case of `!isClosable`, so check not needed.
            this.close();
        }
    }
}