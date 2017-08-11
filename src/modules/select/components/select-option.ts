import {
    Component, Input, HostBinding, HostListener, EventEmitter, ViewContainerRef,
    ViewChild, Renderer2, ElementRef, Output, ChangeDetectorRef, TemplateRef
} from "@angular/core";
import { SuiDropdownMenuItem } from "../../dropdown";
import { HandledEvent, SuiComponentFactory } from "../../../misc/util";
import { IOptionContext } from "../classes/select-base";

@Component({
    selector: "sui-select-option",
    template: `
<span #templateSibling></span>
<span *ngIf="!template" [innerHTML]="formatter(option)"></span>
`
})
export class SuiSelectOption<T> extends SuiDropdownMenuItem {
    // Sets the Semantic UI classes on the host element.
    @HostBinding("class.item")
    private _optionClasses:boolean;

    @Input()
    public option:T;

    @Input()
    public query?:string;

    @HostBinding("class.active")
    public isActive:boolean;

    @Input()
    public formatter?:(obj:T) => string;

    private _template?:TemplateRef<IOptionContext<T>>;

    @Input()
    public get template():TemplateRef<IOptionContext<T>> | undefined {
        return this._template;
    }

    public set template(template:TemplateRef<IOptionContext<T>> | undefined) {
        this._template = template;
        if (this.template) {
            this.componentFactory.createView(this.templateSibling, this.template, {
                $implicit: this.option,
                query: this.query
            });
        }
    }

    // Placeholder to draw template beside.
    @ViewChild("templateSibling", { read: ViewContainerRef })
    public templateSibling:ViewContainerRef;

    // Fires when the option is selected, whether by clicking or by keyboard.
    @Output()
    public onSelected:EventEmitter<T>;

    constructor(renderer:Renderer2, element:ElementRef, public componentFactory:SuiComponentFactory) {
        // We inherit SuiDropdownMenuItem to automatically gain all keyboard navigation functionality.
        // This is not done via adding the .item class because it isn't supported by Angular.
        super(renderer, element);

        this.isActive = false;
        this.onSelected = new EventEmitter<T>();

        this._optionClasses = true;
    }

    @HostListener("click", ["$event"])
    public onClick(e:HandledEvent):void {
        e.eventHandled = true;

        this.onSelected.emit(this.option);
    }
}
