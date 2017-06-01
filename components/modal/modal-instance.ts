import {TemplateRef} from '@angular/core';
import {ModalControls, ModalResult} from './modal-controls';
import {ModalTemplate} from './modal-template';

export class ModalInstance<T, U = void, V = void> {
    public isClosable:boolean;
    public context:T;

    public closeResult:V;

    public template:ModalTemplate<T, U, V>;
    public component:Function;

    public transition:string;
    public transitionDuration:number;

    public onApprove:ModalResult<U>;
    public onDeny:ModalResult<V>;

    constructor(template:ModalTemplate<T, U, V>, isClosable:boolean = true, context:T = null) {
        this.template = template;

        this.isClosable = isClosable;
        this.context = context;

        this.transition = "scale";
        this.transitionDuration = 500;
    }

    public approve(result:U):void {};
    public deny(result:V):void {};
}