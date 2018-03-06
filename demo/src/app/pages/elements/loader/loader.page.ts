import { Component } from "@angular/core";

const exampleStandardTemplate = `
<div>
    <sui-loader [active]="isActive"></sui-loader>
    Some example content
</div>
`;

const exampleInvertedTemplate = `
<div>
    <sui-loader [active]="isActive" loaderClass="inverted"></sui-loader>
    Some example content
</div>
`;

const exampleTextTemplate = `
<div>
    <sui-loader [active]="isActive" loaderText="Loading"></sui-loader>
    Some example content
</div>
`;

const exampleLargeTemplate = `
<div>
    <sui-loader [active]="isActive" loaderSize="large" loaderText="Loading"></sui-loader>
    Some example content
</div>
`;

@Component({
    selector: "demo-page-loader",
    templateUrl: "./loader.page.html"
})
export class LoaderPage {
    public exampleStandardTemplate:string = exampleStandardTemplate;
    public exampleInvertedTemplate:string = exampleInvertedTemplate;
    public exampleTextTemplate:string = exampleTextTemplate;
    public exampleLargeTemplate:string = exampleLargeTemplate;
}

@Component({
    selector: "example-loader-standard",
    template: exampleStandardTemplate
})
export class LoaderStandardExample {
    public isActive:boolean = true;
}

@Component({
    selector: "example-inverted-loader",
    template: exampleInvertedTemplate
})
export class InvertedLoaderExample {
    public isActive:boolean = true;
}

@Component({
    selector: "example-loader-text",
    template: exampleTextTemplate
})
export class LoaderTextExample {
    public isActive:boolean = true;
}

@Component({
    selector: "example-large-loader",
    template: exampleLargeTemplate
})
export class LargeLoaderExample {
    public isActive:boolean = true;
}

export const LoaderPageComponents = [LoaderPage, LoaderStandardExample, InvertedLoaderExample, LoaderTextExample, LargeLoaderExample];
