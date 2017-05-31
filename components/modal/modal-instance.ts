import {TemplateRef} from '@angular/core';

export interface IModal {
    
}

export type ModalTemplateContext<T> = { $implicit: T, modal: IModal }

export class ModalInstance<T> {
    public isClosable:boolean;
    public context:T;

    public template:TemplateRef<ModalTemplateContext<T>>;

    public transition:string;
    public transitionDuration:number;

    constructor(isClosable:boolean = true, context:T = null) {
        this.isClosable = true;
        this.context = context;

        this.transition = "scale";
        this.transitionDuration = 500;
    }
}