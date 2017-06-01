import {TemplateRef} from '@angular/core';
import {ModalControls, ModalResult} from './modal-controls';
import {ModalTemplate} from './modal-template';

export abstract class ModalInstance<T, U = void, V = void> {
    public isClosable:boolean;
    public context:T;

    public closeResult:V;

    public transition:string;
    public transitionDuration:number;

    public onApprove:ModalResult<U>;
    public onDeny:ModalResult<V>;

    constructor(context:T = null, isClosable:boolean = true) {
        this.isClosable = isClosable;
        this.context = context;

        this.transition = "scale";
        this.transitionDuration = 500;
    }

    public approve(result:U):void {};
    public deny(result:V):void {};
}

export class TemplateModalInstance<T, U = void, V = void> extends ModalInstance<T, U, V> {
    public template:ModalTemplate<T, U, V>;

    constructor(template:ModalTemplate<T, U, V>, context:T = null, isClosable:boolean = true) {
        super(context, isClosable);

        this.template = template;
    }
}

export class ComponentModalInstance<T, U = void, V = void> extends ModalInstance<T, U, V> {
    public component:Function;

    constructor(component:Function, context:T = null, isClosable:boolean = true) {
        super(context, isClosable);

        this.component = component;
    }
}