import {TemplateRef} from '@angular/core';
import {ModalControls, ModalResult} from './modal-controls';
import {ModalTemplate} from './modal-template';

export class ModalConfig<T, U = void, V = void> {
    public isClosable:boolean;
    public context:T;

    public closeResult:V;

    public transition:string;
    public transitionDuration:number;

    constructor(context:T = null, isClosable:boolean = true) {
        this.isClosable = isClosable;
        this.context = context;

        this.transition = "scale";
        this.transitionDuration = 500;
    }
}

export class TemplateModalConfig<T, U = void, V = void> extends ModalConfig<T, U, V> {
    public template:ModalTemplate<T, U, V>;

    constructor(template:ModalTemplate<T, U, V>, context:T = null, isClosable:boolean = true) {
        super(context, isClosable);

        this.template = template;
    }
}

export class ComponentModalConfig<T, U = void, V = void> extends ModalConfig<T, U, V> {
    public component:Function;

    constructor(component:Function, context:T = null, isClosable:boolean = true) {
        super(context, isClosable);

        this.component = component;
    }
}