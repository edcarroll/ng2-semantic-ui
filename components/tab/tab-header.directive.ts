import {Directive, Input, HostBinding, HostListener, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Tab} from "./tab.directive";

@Directive({
    selector: '[suiTabHeader]'
})
export class TabHeader {
    public id:string;
    @Input()
    public set suiTabHeader(value:string) {
        if (!this.id) {
            this.id = value;
        }
    }

    private _tab:Tab;

    public set tab(tab:Tab) {
        this._tab = tab;
        tab.isActive = this.isActive;
    }

    public get tab() { return this._tab }

    public stateChanged$: Observable<TabHeader>;
    private _stateObserver: Observer;

    constructor() {
        this.stateChanged$ = new Observable(observer => this._stateObserver = observer);
    }

    private _isActive:boolean = false;
    private _isDisabled:boolean = false;

    @HostBinding('class.active')
    public get isActive() { return this._isActive; }

    public set isActive(value:boolean) {
        this._isActive = value;
        if (this._tab) {
            this._tab.isActive = value;
        }

        this._stateObserver.next(this);
    }

    @Input('isActive')
    public set manuallyActivate(value:boolean) {
        if (value) {
            setTimeout(() => {
                this.isActive = true;
            });
        }
    }

    @HostBinding('class.disabled')
    public get isDisabled() {
        return this._isDisabled;
    }

    public set isDisabled(value:boolean) {
        this._isDisabled = value;

        this._stateObserver.next(this);
    }

    @Input('isDisabled')
    public set manuallyDisable(value:boolean) {
        setTimeout(() => {
            this.isDisabled = value;
        });
    }

    @HostListener('click')
    private click() {
        if (!this.isDisabled) {
            this.isActive = true;
        }
    }
}
