import { Component, Input, Renderer2, ViewChild, EventEmitter, Output, OnInit, ElementRef } from "@angular/core";

@Component({
    selector: "sui-range",
    template: `
    <div class="ui range" [ngClass]="{'disabled': isReadonly}" >
        <div #inner class="inner" (mousedown)="onDown($event, false)" (touchstart)="onDown($event, true)">
            <div class="track"></div>
            <div #trackFill class="track-fill"></div>
            <div #thumb class="thumb"></div>
        </div>
</div>`
})
export class SuiRange implements OnInit {
    @Input() public max:number = 100;
    @Input() public min:number = 0;
    @Input() public step:number = 1;
    @Input() public isReadonly:boolean = false;

    @Input()
    set value(value:number) {
        let finalValue = value;
        if (this.isReadonly) {
            return;
        }

        if (value < this.min) {
            finalValue = this.min;
        } else if (value > this.max) {
            finalValue = this.max;
        }

        this._value = finalValue;
        this._position = this.determinePosition(this._value);
        this.valueChange.emit(this._value);
    }

    @Output()
    public valueChange:EventEmitter<number>;

    private _left:number;
    private _right:number;
    private _pageX:number;
    private _value:number;
    private _precision:number;
    private _listenersToRemove:(() => void)[];
    private readonly _offset:number = 10;

    private set _position(position:number) {
        let finalPosition:number | string = position;

        if (position < 0) {
            finalPosition = 0;
        }

        finalPosition = `${finalPosition}px`;

        this._renderer.setStyle(this._thumb.nativeElement, "left", finalPosition);
        this._renderer.setStyle(this._trackFill.nativeElement, "width", finalPosition);
    }

    @ViewChild("thumb")
    private readonly _thumb:ElementRef;
    @ViewChild("inner")
    private readonly _inner:ElementRef;
    @ViewChild("trackFill")
    private readonly _trackFill:ElementRef;


    constructor(private _renderer:Renderer2) {
        this.valueChange = new EventEmitter<number>();
    }

    private static getPageX(eventData:MouseEvent & TouchEvent, isTouch:boolean):number {
        return isTouch ? eventData.touches[0].pageX : eventData.pageX;
    }

    public ngOnInit():void {
        this._precision = this.determinePrecision();
    }

    public onDown(eventData:MouseEvent & TouchEvent, isTouch:boolean):void {
        this.checkPosition(eventData, isTouch);

        this.setValueByPosition(this.determineValue(this._left, this._right, this._pageX));

        this._listenersToRemove = this.bindToEvents(isTouch);
    }

    public onUp():void {
        this._listenersToRemove.forEach(removeListener => removeListener());
    }

    private onMove(eventData:MouseEvent & TouchEvent, isTouch:boolean):void {
        this.checkPosition(eventData, isTouch);

        this.setValueByPosition(this.determineValue(this._left, this._right, this._pageX));
    }

    private determinePrecision():number {
        const split = String(this.step).split(".");
        let decimalPlaces;
        if (split.length === 2) {
            decimalPlaces = split[1].length;
        } else {
            decimalPlaces = 0;
        }

        return Math.pow(10, decimalPlaces);
    }

    private  determinePosition(value:number):number {
        const ratio = (value - this.min) / (this.max - this.min);

        return Math.round(ratio * this._inner.nativeElement.offsetWidth) - this._offset;
    }

    private checkPosition(eventData:MouseEvent&TouchEvent, isTouch:boolean):void {
        const boundingClientRect = this._inner.nativeElement.getBoundingClientRect();

        this._left = boundingClientRect.left;
        // This is a false positive.
        // tslint:disable-next-line:restrict-plus-operands
        this._right = this._left + boundingClientRect.width;
        this._pageX = SuiRange.getPageX(eventData, isTouch);
    }

    private bindToEvents(isTouch:boolean):(() => void)[] {
        const upEventName = isTouch ? "touchend" : "mouseup";
        const moveEventName = isTouch ? "touchmove" : "mousemove";

        const removeOnUp = this._renderer.listen("window", upEventName, () => this.onUp());
        const removeOnMove = this._renderer.listen("window", moveEventName, e => this.onMove(e, isTouch));

        return [removeOnUp, removeOnMove];

    }

    private determineValue(startPos:number, endPos:number, currentPos:number):number {
        const ratio = (currentPos - startPos) / (endPos - startPos);
        const range = this.max - this.min;
        let difference = Math.round(ratio * range / this.step) * this.step;

        difference = Math.round(difference * this._precision) / this._precision;

        return difference + this.min;
    }

    private setValueByPosition(value:number):void {
        if (this._pageX >= this._left && this._pageX <= this._right) {
            if (value >= this.min && value <= this.max) {
                this._value = value;
                this._position = this._pageX - this._left - this._offset;
                this.valueChange.emit(this._value);
            }
        }
    }
}
