import { Component, OnInit } from "@angular/core";
import { ApiDefinition } from "../../components/api/api.component";

const exampleStandardTemplate = `
<div class="ui segments">
    <div class="ui segment">
        <sui-pagination [collectionSize]="100" [pageSize]="10" [hasNavigation]="showNavigation" [hasBoundaryLinks]="showBoundary"
            [(page)]="selectedPage">
        </sui-pagination>
        <p>Current page: {{ selectedPage }}</p>
    </div>
    <div class="ui segment">
        <button class="ui primary button" (click)="showNavigation = !showNavigation">
            Toggle Navigation
        </button>
        <button class="ui primary button" (click)="showBoundary = !showBoundary">
            Toggle Boundary
        </button>
    </div>
</div>
`;

const exampleMaxSizeTemplate = `
<div class="ui segments">
    <div class="ui segment">
        <sui-pagination [collectionSize]="100" [pageSize]="10" [maxSize]="maxSize" [hasBoundaryLinks]="showBoundary"
            [(page)]="selectedPage">
        </sui-pagination>
        <p>Current page: {{ selectedPage }}</p>
    </div>
    <div class="ui segment">
        <div class="ui small form">
            <button class="ui primary button" (click)="showBoundary = !showBoundary">
                Toggle Boundary
            </button>
            <div class="field">
                <label>Max Size</label>
                <input type="number" [(ngModel)]=maxSize>
            </div>
        </div>
    </div>
</div>
`;

const exampleRotationTemplate = `
<div class="ui segments">
    <div class="ui segment">
        <sui-pagination [collectionSize]="100" [pageSize]="10" [maxSize]="maxSize" [hasBoundaryLinks]="showBoundary"
            [(page)]="selectedPage" [canRotate]="true">
        </sui-pagination>
        <p>Current page: {{ selectedPage }}</p>
    </div>
    <div class="ui segment">
        <div class="ui small form">
            <button class="ui primary button" (click)="showBoundary = !showBoundary">
                Toggle Boundary
            </button>
            <div class="field">
                <label>Max Size</label>
                <input type="number" [(ngModel)]=maxSize>
            </div>
        </div>
    </div>
</div>
`;

@Component({
    selector: "demo-page-pagination",
    templateUrl: "./pagination.page.html"
})
export class PaginationPage {
    public api:ApiDefinition = [
        {
            selector: "<sui-pagination>",
            properties: [
                {
                    name: "collectionSize",
                    type: "number",
                    description: "Sets the number of items in the collection.",
                    required: true
                },
                {
                    name: "maxSize",
                    type: "number",
                    description: "Sets the maximum number of pages shown (boundary, navigation & ellipses excluded)."
                },
                {
                    name: "hasBoundaryLinks",
                    type: "boolean",
                    description: "Whether to show the boundary links (<code><<</code> and <code>>></code>).",
                    defaultValue: "false"
                },
                {
                    name: "hasNavigation",
                    type: "boolean",
                    description: "Whether to show the navigation links (<code><</code> and <code>></code>). " +
                        "Forced to be displayed when <code>maxSize > pageCount</code>.",
                    defaultValue: "false"
                },
                {
                    name: "hasEllipses",
                    type: "boolean",
                    description: "Whether to show ellipsis symbols & first/last page numbers when <code>maxSize > pageCount</code>.",
                    defaultValue: "true"
                },
                {
                    name: "canRotate",
                    type: "boolean",
                    description: "Whether to rotate pages when <code>maxSize > pageCount</code>. " +
                        "Current page will be in the middle.",
                    defaultValue: "false"
                },
                {
                    name: "page",
                    type: "number",
                    description: "Sets the current page.",
                    defaultValue: "1"
                },
                {
                    name: "pageSize",
                    type: "number",
                    description: "Sets the number of items in each page.",
                    defaultValue: "10"
                }
            ],
            events: [
                {
                    name: "pageChange",
                    type: "number",
                    description: "Fires whenever the current page is changed. <code>[(page)]</code> syntax is supported."
                }
            ]
        }
    ];

    public exampleStandardTemplate:string = exampleStandardTemplate;
    public exampleMaxSizeTemplate:string = exampleMaxSizeTemplate;
    public exampleRotationTemplate:string = exampleRotationTemplate;
}


@Component({
    selector: "example-pagination-standard",
    template: exampleStandardTemplate
})
export class PaginationExampleStandard implements OnInit {

    public selectedPage:number;
    public showNavigation:boolean;
    public showBoundary:boolean;

    constructor() { }

    public ngOnInit():void {
        this.selectedPage = 1;
        this.showNavigation = false;
        this.showBoundary = false;
    }
}

@Component({
    selector: "example-pagination-maxsize",
    template: exampleMaxSizeTemplate
})
export class PaginationExampleMaxSize implements OnInit {

    public selectedPage:number;
    public showBoundary:boolean;
    public maxSize:number;

    constructor() { }

    public ngOnInit():void {
        this.selectedPage = 1;
        this.showBoundary = false;
        this.maxSize = 5;
    }
}

@Component({
    selector: "example-pagination-rotation",
    template: exampleRotationTemplate
})
export class PaginationExampleRotation implements OnInit {

    public selectedPage:number;
    public showBoundary:boolean;
    public maxSize:number;

    constructor() { }

    public ngOnInit():void {
        this.selectedPage = 1;
        this.showBoundary = false;
        this.maxSize = 5;
    }
}


export const PaginationPageComponents = [PaginationPage, PaginationExampleStandard, PaginationExampleMaxSize, PaginationExampleRotation];
