import { Component } from '@angular/core';

@Component({
  selector: 'demo-page-getting-started',
  templateUrl: 'getting-started.page.html',
  styleUrls: ['getting-started.page.css']
})
export class GettingStartedPage {
    public installCode:string = `$ npm install ng2-semantic-ui --save`;
    public includeCssCode:string = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.4/semantic.min.css">`;
    public importCode:string = `import {SuiModule} from 'ng2-semantic-ui/ng2-semantic-ui';`;
    public moduleImportCode:string = `
import {SuiModule} from 'ng2-semantic-ui/ng2-semantic-ui';

@NgModule({
    declarations: [AppComponent, ...],
    imports: [SuiModule, ...],  
    bootstrap: [AppComponent]
})
export class AppModule {}
`
}
