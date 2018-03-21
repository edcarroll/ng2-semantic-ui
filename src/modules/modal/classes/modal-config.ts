import { Type } from "@angular/core";
import { ModalTemplate } from "./modal-template";

export type ModalSize = "mini" | "tiny" | "small" | "normal" | "large";

export const ModalSize = {
    Mini: "mini" as ModalSize,
    Tiny: "tiny" as ModalSize,
    Small: "small" as ModalSize,
    Normal: "normal" as ModalSize,
    Large: "large" as ModalSize
};

// Stores a basic set of configuration options for a modal.
export class ModalConfig<T, U = undefined, V = undefined> {
    // Determines whether the modal can be closed with a close button, clicking outside, or the escape key.
    public isClosable:boolean;
    // Value to deny with when closing via `isClosable`.
    public closeResult:V;

    // Data to pass to the modal instance when opened.
    public context?:T;

    // Size used to display the modal.
    public size:ModalSize;
    // Whether the modal takes up the full width of the screen.
    public isFullScreen:boolean;
    // Whether or not the modal has basic styles applied.
    public isBasic:boolean;
    // Whether the modal shows against a light background.
    public isInverted:boolean;
    // Whether or not the modal should be placed in the center of the page.
    public isCentered:boolean;

    // Whether or not the modal should always display a scrollbar.
    public mustScroll:boolean;

    // Transition to display modal with.
    public transition:string;
    // Duration of the modal & dimmer transitions.
    public transitionDuration:number;

    constructor(context:T | undefined = undefined, isClosable:boolean = true) {
        // Initialise with default values.
        this.isClosable = isClosable;
        this.context = context;

        this.size = ModalSize.Normal;
        this.isFullScreen = false;
        this.isBasic = false;
        this.isInverted = false;
        this.isCentered = true;

        this.mustScroll = false;

        this.transition = "scale";
        this.transitionDuration = 500;
    }
}

// Used when creating a modal from a `TemplateRef`.
export class TemplateModalConfig<T, U = undefined, V = undefined> extends ModalConfig<T, U, V> {
    public template:ModalTemplate<T, U, V>;

    constructor(template:ModalTemplate<T, U, V>, context:T | undefined = undefined, isClosable:boolean = true) {
        super(context, isClosable);

        this.template = template;
    }
}

// Used when creating a modal from an existing component.
export class ComponentModalConfig<T, U = undefined, V = undefined> extends ModalConfig<T, U, V> {
    public component:Type<any>;

    constructor(component:Type<any>, context:T | undefined = undefined, isClosable:boolean = true) {
        super(context, isClosable);

        this.component = component;
    }
}
