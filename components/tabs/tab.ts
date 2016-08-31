import {Directive, Input, Output, HostBinding, HostListener, EventEmitter} from '@angular/core';
import {SuiTabContent} from "./tab-content";
import {Observable, Observer} from "rxjs";

@Directive({
    selector: '[suiTabHeader]'
})
export class SuiTab {
    public id:string;
    @Input()
    public set suiTabHeader(value:string) {
        if (!this.id) {
            this.id = value;
        }
    }

    private _content:SuiTabContent;

    public set content(content:SuiTabContent) {
        this._content = content;
        content.isActive = this.isActive;
    }

    public get content() { return this._content }

    public stateChanged$: Observable<SuiTab>;
    private _stateObserver: Observer<SuiTab>;

    constructor() {
        this.stateChanged$ = new Observable<SuiTab>((observer:any) => this._stateObserver = observer);
    }

    private _isActive:boolean = false;
    private _isDisabled:boolean = false;

    @HostBinding('class.active')
    public get isActive() { return this._isActive; }

    public set isActive(value:boolean) {
        var change = this._isActive != value;
        this._isActive = value;
        this._content.isActive = value;
        this.stateObserverNext(change);
        this.isActiveChange.emit(this._isActive);

        if (value && change) {
            this.onActivate.emit(this);
        }
    }

    @HostBinding('class.disabled')
    public get isDisabled() {
        return this._isDisabled;
    }

    public set isDisabled(value:boolean) {
        var change = this._isDisabled != value;

        this._isDisabled = value;

        this.stateObserverNext(change);
    }

    private stateObserverNext(change:boolean) {
        if (change) {
            this._stateObserver.next(this);
        }
    }

    @Input('isActive')
    public set manuallyActivate(value:boolean) {
        setTimeout(() => {
            this.isActive = this.isDisabled ? false : value;
            this.isActiveChange.emit(this._isActive);
        });
    }

    @Input('isDisabled')
    public set manuallyDisable(value:boolean) {
        setTimeout(() => {
            this.isDisabled = value;
        });
    }

    @Output() public isActiveChange:EventEmitter<boolean> = new EventEmitter<boolean>(false);
    @Output() public onActivate:EventEmitter<SuiTab> = new EventEmitter<SuiTab>(false);

    @HostListener('click')
    private click() {
        if (!this.isDisabled) {
            this.isActive = true;
        }
    }
}
