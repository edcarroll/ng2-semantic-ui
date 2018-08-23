import {
    Component, Input, OnInit, ViewChild, ElementRef, Renderer2,
    EventEmitter, Output, HostListener, ViewContainerRef, AfterViewInit
} from "@angular/core";
import { Util, IDynamicClasses, KeyCode, SuiComponentFactory } from "../../../misc/util/internal";
import { TransitionController, Transition, TransitionDirection } from "../../transition/internal";
import { ModalControls, ModalResult } from "../classes/modal-controls";
import { ModalConfig, ModalSize } from "../classes/modal-config";

@Component({
    selector: "sui-modal",
    template: `
<!-- Page dimmer for modal background. -->
<sui-modal-dimmer [ngClass]="{'top aligned': !isCentered}" 
                  [class.inverted]="isInverted"
                  [(isDimmed)]="dimBackground"
                  [transitionDuration]="transitionDuration"
                  (click)="close()">

    <!-- Modal component, with transition component attached -->
    <div class="ui modal"
         [suiTransition]="transitionController"
         [class.active]="transitionController?.isVisible"
         [class.fullscreen]="isFullScreen"
         [class.basic]="isBasic"
         [class.scrolling]="mustScroll"
         [class.inverted]="isInverted"
         [ngClass]="dynamicClasses"
         (click)="onClick($event)"
         #modal>

        <!-- Configurable close icon -->
        <i class="close icon" *ngIf="isClosable" (click)="close()"></i>
        <!-- <ng-content> so that <sui-modal> can be used as a normal component. -->
        <ng-content></ng-content>
        <!-- @ViewChild reference so we can insert elements beside this div. -->
        <div #templateSibling></div>
    </div>
</sui-modal-dimmer>
`,
    styles: [``]
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

    @Input()
    public isCentered:boolean;

    // Whether the modal takes up the full width of the screen.
    private _isFullScreen:boolean;

    // Value to deny with when closing via `isClosable`.
    @Input()
    public get isFullScreen():boolean {
        return this._isFullScreen;
    }

    public set isFullScreen(fullScreen:boolean) {
        this._isFullScreen = Util.DOM.parseBooleanAttribute(fullScreen);
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

    // Whether the modal shows against a light background.
    private _isInverted:boolean;

    @Input()
    public get isInverted():boolean {
        return this._isInverted;
    }

    public set isInverted(inverted:boolean) {
        this._isInverted = Util.DOM.parseBooleanAttribute(inverted);
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

    // Parent element of modal before relocation to document body.
    private _originalContainer?:Element;

    public get dynamicClasses():IDynamicClasses {
        const classes:IDynamicClasses = {};
        if (this.size) {
            classes[this.size] = true;
        }
        return classes;
    }

    constructor(private _renderer:Renderer2, private _element:ElementRef, private _componentFactory:SuiComponentFactory) {
        // Initialise with default configuration from `ModalConfig` (to avoid writing defaults twice).
        const config = new ModalConfig<undefined, T, U>();
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
        // Transition the modal to be visible.
        this.transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.In));
        setTimeout(() => this.dimBackground = true);
    }

    public ngAfterViewInit():void {
        // Move the modal to the document body to ensure correct scrolling.
        this._originalContainer = this._element.nativeElement.parentNode;
        document.querySelector("body")!.appendChild(this._element.nativeElement);
        // Remove the #templateSibling element from the DOM to fix bottom border styles.
        const templateElement = this.templateSibling.element.nativeElement as Element;
        if (templateElement.parentNode) {
            templateElement.parentNode.removeChild(templateElement);
        }

        const element = this._modalElement.nativeElement as Element;
        setTimeout(() => this.updateScroll());

        // Focus any element with [autofocus] attribute.
        const autoFocus = element.querySelector("[autofocus]") as HTMLElement | null;
        if (autoFocus) {
            // Autofocus after the browser has had time to process other event handlers.
            setTimeout(() => autoFocus.focus(), 10);
            // Try to focus again when the modal has opened so that autofocus works in IE11.
            setTimeout(() => autoFocus.focus(), this.transitionDuration);
        }
    }

    // Updates the modal with the specified configuration.
    public loadConfig<V>(config:ModalConfig<V, T, U>):void {
        this.isClosable = config.isClosable;
        this.closeResult = config.closeResult;

        this.size = config.size;
        this.isFullScreen = config.isFullScreen;
        this.isBasic = config.isBasic;
        this.isInverted = config.isInverted;
        this.isCentered = config.isCentered;

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
                    // When done, move the modal back to its original location, emit a dismiss event, and fire the callback.
                    if (this._originalContainer) {
                        this._originalContainer.appendChild(this._element.nativeElement);
                    }
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

        // _mustAlwaysScroll works by stopping _mustScroll from being automatically updated, so it stays `true`.
        if (!this._mustAlwaysScroll && this._modalElement) {

            // Semantic UI modal margin and dimmer padding are 1rem, which is relative to the global font size, so for compatibility:
            const fontSize = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue("font-size"));
            const margin = fontSize * 2;
            const element = this._modalElement.nativeElement as Element;

            // The modal must scroll if the window height is smaller than the modal height + both margins.
            this._mustScroll = window.innerHeight < element.clientHeight + margin * 2;
        }
    }

    public onClick(e:MouseEvent):void {
        // Makes sense here, as the modal shouldn't be attached to any DOM element.
        e.stopPropagation();
    }

    // Document listener is fine here because nobody will have enough modals open.
    @HostListener("document:keyup", ["$event"])
    public onDocumentKeyUp(e:KeyboardEvent):void {
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
