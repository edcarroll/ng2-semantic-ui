import { Directive, Input, EventEmitter, Renderer2, ElementRef, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector: "input[suiSelectSearch]"
})
export class SuiSelectSearch {
    @HostBinding("class.search")
    public readonly hasClasses:boolean;

    @HostBinding("attr.autocomplete")
    public readonly autoComplete:string;

    public set query(query:string) {
        this._renderer.setProperty(this._element.nativeElement, "value", query);
    }

    public onQueryUpdated:EventEmitter<string>;
    public onQueryKeyDown:EventEmitter<KeyboardEvent>;

    constructor(private _renderer:Renderer2, private _element:ElementRef) {
        this.onQueryUpdated = new EventEmitter<string>();
        this.onQueryKeyDown = new EventEmitter<KeyboardEvent>();

        this.hasClasses = true;
        this.autoComplete = "off";
    }

    @HostListener("input", ["$event.target.value"])
    public updateQuery(query:string):void {
        this.onQueryUpdated.emit(query);
    }

    @HostListener("keydown", ["$event"])
    public onKeyDown(e:KeyboardEvent):void {
        this.onQueryKeyDown.emit(e);
    }

    public focus():void {
        // Slightly delay to support in menu search.
        this._element.nativeElement.focus();
        setTimeout(() => this._element.nativeElement.focus());
    }
}
