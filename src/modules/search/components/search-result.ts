import {
    Component, ViewChild, ViewContainerRef, Renderer2, ElementRef, HostBinding,
    Input, TemplateRef
} from "@angular/core";
import { ITemplateRefContext, SuiComponentFactory } from "../../../misc/util/internal";
import { IResultContext } from "./search";

// See https://github.com/Microsoft/TypeScript/issues/13449.
const templateRef = TemplateRef;

@Component({
    selector: "sui-search-result",
    template: `
<span #templateSibling></span>
<span *ngIf="!template" [innerHTML]="formatter(value, query)"></span>
`
})
export class SuiSearchResult<T> {
    // Sets the Semantic UI classes on the host element.
    @HostBinding("class.result")
    public readonly hasClasses:boolean;

    @Input()
    public value:T;

    @Input()
    public query:string;

    // Returns the label from a given value.
    @Input()
    public formatter:(obj:T, query:string) => string;

    private _template?:TemplateRef<IResultContext<T>>;

    @Input()
    public get template():TemplateRef<IResultContext<T>> | undefined {
        return this._template;
    }

    public set template(template:TemplateRef<IResultContext<T>> | undefined) {
        this._template = template;
        if (this.template) {
            this.componentFactory.createView(this.templateSibling, this.template, {
                $implicit: this.value,
                query: this.query
            });
        }
    }

    // Placeholder to draw template beside.
    @ViewChild("templateSibling", { read: ViewContainerRef })
    public templateSibling:ViewContainerRef;

    constructor(public componentFactory:SuiComponentFactory) {
        this.hasClasses = true;

        // By default we make this function return an empty string, for the brief moment when it isn't displaying the correct label.
        this.formatter = value => "";
    }
}
