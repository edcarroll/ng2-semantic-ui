import { Component } from "@angular/core";

@Component({
    selector: "demo-page-getting-started",
    templateUrl: "./getting-started.page.html",
    styles: [`
.dividing.header {
    margin-top: 1em;
    margin-bottom: 0.5em;
}
`]
})
export class GettingStartedPage {
    public installCode:string = `$ npm install ng2-semantic-ui --save`;

    public includeCssCode:string =
`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css">`;

    public importCode:string = `import {SuiModule} from 'ng2-semantic-ui';`;
    public moduleImportCode:string = `
import {SuiModule} from 'ng2-semantic-ui';

@NgModule({
    declarations: [AppComponent, ...],
    imports: [SuiModule, ...],  
    bootstrap: [AppComponent]
})
export class AppModule {}
`;
    public systemJSCode:string = `
var config = {
    ...
    map: {
        ...
        'ng2-semantic-ui': 'npm:ng2-semantic-ui/bundles/ng2-semantic-ui.umd.min.js'
    }
}
`;
    public individualImportCode:string = `import {SuiCheckboxModule, SuiRatingModule} from 'ng2-semantic-ui';`;
}
