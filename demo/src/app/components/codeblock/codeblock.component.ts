import { Component, AfterViewInit, Input, ChangeDetectorRef } from "@angular/core";

@Component({
    selector: "demo-codeblock",
    template: `
<pre [ngClass]="languageClass" [innerHTML]="html"></pre>
`,
    styleUrls: ["./codeblock.component.css"]
})
export class CodeblockComponent implements AfterViewInit {
    @Input()
    public language:string;

    @Input()
    public src:string;

    public html:string;

    public languageClass:any = {};

    constructor(private _changeDetectorRef:ChangeDetectorRef) {}

    public ngAfterViewInit():void {
        if (this.src[0] === "\n") {
            this.src = this.src.replace("\n", "");
        }
        this.languageClass[`language-${this.language}`] = true;
        this.html = Prism.highlight(this.src || "", Prism.languages[this.language]);
        this._changeDetectorRef.detectChanges();
    }
}
