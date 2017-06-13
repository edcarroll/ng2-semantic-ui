import {
    Component, Input, HostBinding, OnInit, ViewChild, ElementRef, Renderer2,
    EventEmitter, Output, HostListener, ViewContainerRef, AfterViewInit
} from "@angular/core";
import { TransitionController } from "../transition/transition-controller";
import { Transition, TransitionDirection } from "../transition/transition";
import { KeyCode, parseBooleanAttribute } from "../util/util";
import { ModalControls, ModalResult } from "./modal-controls";
import { ModalConfig, ModalSize } from "./modal-config";

@Component({
    selector: "sui-modal",
    template: `
<!-- Page dimmer for modal background. -->
<sui-dimmer class="page"
            [(isDimmed)]="dimBackground"
            [isClickable]="false"
            [transitionDuration]="transitionDuration"
            (click)="close()"></sui-dimmer>

<!-- Modal component, with transition component attached -->
<div class="ui modal {{ size }}"
     [suiTransition]="transitionController"
     [class.active]="transitionController?.isVisible"
     [class.fullscreen]="isFullScreen"
     [class.basic]="isBasic"
     [class.scrolling]="mustScroll"
     #modal>

    <!-- Configurable close icon -->
    <i class="close icon" *ngIf="isClosable" (click)="close()"></i>
    <!-- <ng-content> so that <sui-modal> can be used as a normal component. -->
    <ng-content></ng-content>
    <!-- @ViewChild reference so we can insert elements beside this div. -->
    <div #templateSibling></div>
</div>
`,
    styles: [`
.scrolling {
    position: absolute !important;
    margin-top: 3.5rem !important;
    margin-bottom: 3.5rem !important;
    top: 0;
}
`]
})
export class SuiModal<T, U> implements OnInit, AfterViewInit {
    @Input()
    // Determines whether the modal can be closed with a close button, clicking outside, or the escape key.
    public isClosable:boolean;

    @Input()
    // Value to deny with when closing via `isClosable`.
    public closeResult:U;

    // Separate class for the `approve` and `deny` methods to support passing into components.
    public controls:ModalControls<T, U>;

    public get approve():ModalResult<T> {
        return this.controls.approve;
    }

    public get deny():ModalResult<U> {
        return this.controls.deny;
    }

    // Fires when the modal closes, after `approve` has been called.
    @Output("approved")
    public onApprove:EventEmitter<T>;

    // Fires when the modal closes, after `deny` has been called.
    @Output("denied")
    public onDeny:EventEmitter<U>;

    // Fires when the modal closes.
    @Output("dismissed")
    public onDismiss:EventEmitter<void>;

    @ViewChild("modal")
    private _modalElement:ElementRef;

    // Size used to display the modal.
    @Input()
    public size:ModalSize;

    // Whether the modal takes up the full width of the screen.
    private _isFullScreen:boolean;

    // Value to deny with when closing via `isClosable`.
    @Input()
    public get isFullScreen():boolean {
        return this._isFullScreen;
    }

    public set isFullScreen(fullScreen:boolean) {
        this._isFullScreen = parseBooleanAttribute(fullScreen);
    }

    // Whether or not the modal has basic styles applied.
    @Input()
    public isBasic:boolean;

    // Whether the modal currently is displaying a scrollbar.
    private _mustScroll:boolean;
    // Whether or not the modal should always display a scrollbar.
    private _mustAlwaysScroll:boolean;

    @Input()
    public get mustScroll():boolean {
        return this._mustScroll;
    }

    public set mustScroll(mustScroll:boolean) {
        this._mustScroll = mustScroll;
        // 'Cache' value in _mustAlwaysScroll so that if `true`, _mustScroll isn't ever auto-updated.
        this._mustAlwaysScroll = mustScroll;
        this.updateScroll();
    }

    public transitionController:TransitionController;

    // Transition to display modal with.
    @Input()
    public transition:string;

    // Duration of the modal & dimmer transitions.
    @Input()
    public transitionDuration:number;

    // Whether or not the backround dimmer is active.
    public dimBackground:boolean;
    // True after `approve` or `deny` has been called.
    private _isClosing:boolean;

    // `ViewContainerRef` for the element the template gets injected as a sibling of.
    @ViewChild("templateSibling", { read: ViewContainerRef })
    public templateSibling:ViewContainerRef;

    constructor(private _renderer:Renderer2) {
        // Initialise with default configuration from `ModalConfig` (to avoid writing defaults twice).
        const config = new ModalConfig<null, T, U>();
        this.loadConfig(config);

        // Event emitters for each of the possible modal outcomes.
        this.onApprove = new EventEmitter<T>();
        this.onDeny = new EventEmitter<U>();
        this.onDismiss = new EventEmitter<void>();

        // Initialise controls with actions for the `approve` and `deny` cases.
        this.controls = new ModalControls<T, U>(
            res => this.dismiss(() => this.onApprove.emit(res)),
            res => this.dismiss(() => this.onDeny.emit(res)));

        // Internal variable initialisation.
        this.dimBackground = false;
        this._isClosing = false;
        this.transitionController = new TransitionController(false);
    }

    public ngOnInit():void {
        // Use a slight delay as the `<sui-dimmer>` cancels the initial transition.
        setTimeout(() => {
            // Transition the modal to be visible.
            this.transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.In))
            this.dimBackground = true;
        });
    }

    public ngAfterViewInit():void {
        // Update margin offset to center modal correctly on-screen.
        const element = this._modalElement.nativeElement as Element;
        setTimeout(() => {
            this._renderer.setStyle(element, "margin-top", `-${element.clientHeight / 2}px`);
            this.updateScroll();
        });
    }

    // Updates the modal with the specified configuration.
    public loadConfig<V>(config:ModalConfig<V, T, U>):void {
        this.isClosable = config.isClosable;
        this.closeResult = config.closeResult;

        this.size = config.size;
        this.isFullScreen = config.isFullScreen;
        this.isBasic = config.isBasic;

        this.mustScroll = config.mustScroll;

        this.transition = config.transition;
        this.transitionDuration = config.transitionDuration;
    }

    // Dismisses the modal with a transition, firing the callback after the modal has finished transitioning.
    private dismiss(callback:() => void = () => {}):void {
        // If we aren't currently closing,
        if (!this._isClosing) {
            this._isClosing = true;

            // Transition the modal to be invisible.
            this.dimBackground = false;
            this.transitionController.stopAll();
            this.transitionController.animate(
                new Transition(this.transition, this.transitionDuration, TransitionDirection.Out, () => {
                    // When done, emit a dismiss event, and fire the callback.
                    this.onDismiss.emit();
                    callback();
                }));
        }
    }

    // Closes the modal with a 'deny' outcome, using the specified default reason.
    public close():void {
        if (this.isClosable) {
            // If we are allowed to close, fire the deny result with the default value.
            this.deny(this.closeResult);
        }
    }

    // Decides whether the modal needs to reposition to allow scrolling.
    private updateScroll():void {
        // Semantic UI modal margin is 3.5rem, which is relative to the global font size, so for compatibility:
        const fontSize = parseFloat(window.getComputedStyle(document.documentElement, null).getPropertyValue("font-size"));
        const margin = fontSize * 3.5;

        // _mustAlwaysScroll works by stopping _mustScroll from being automatically updated, so it stays `true`.
        if (!this._mustAlwaysScroll && this._modalElement) {
            const element = this._modalElement.nativeElement as Element;

            // The modal must scroll if the window height is smaller than the modal height + both margins.
            this._mustScroll = window.innerHeight < element.clientHeight + margin * 2;
        }
    }

    @HostListener("document:keyup", ["$event"])
    public onDocumentKeyup(e:KeyboardEvent):void {
        if (e.keyCode === KeyCode.Escape) {
            // Close automatically covers case of `!isClosable`, so check not needed.
            this.close();
        }
    }

    @HostListener("window:resize")
    public onDocumentResize():void {
        this.updateScroll();
    }
}
