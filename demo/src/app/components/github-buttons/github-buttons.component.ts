import { Component, Input } from "@angular/core";

@Component({
    selector: "demo-github-buttons",
    templateUrl: "./github-buttons.component.html"
})
export class GithubButtonsComponent {
    @Input()
    public mega:boolean = true;
}
