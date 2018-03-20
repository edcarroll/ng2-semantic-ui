import { AfterContentInit, ElementRef } from "@angular/core";
export declare class SuiRadioManager<T> implements AfterContentInit {
    element: ElementRef;
    isNested: boolean;
    private _subManagers;
    private _renderedRadios;
    private _radioSubs;
    constructor(element: ElementRef);
    ngAfterContentInit(): void;
    private updateNesting();
    private updateRadios();
}
