import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {routing} from "./app.routing";
import { GettingStartedPage } from './pages/getting-started/getting-started.page';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { ExampleComponent } from './components/example/example.component';
import { SuiModule } from "../../ng2-semantic-ui";
import { ApiComponent } from './components/api/api.component';
import {CollapsePage, COLLAPSE_EXAMPLES} from './pages/collapse/collapse.page';
import {AccordionPage, ACCORDION_EXAMPLES} from "./pages/accordion/accordion.page";
import {CheckboxPage, CHECKBOX_EXAMPLES} from "./pages/checkbox/checkbox.page";

@NgModule({
    declarations: [
        AppComponent,
        GettingStartedPage,
        PageTitleComponent,
        ExampleComponent,
        ApiComponent,
        AccordionPage,
        ACCORDION_EXAMPLES,
        CollapsePage,
        COLLAPSE_EXAMPLES,
        CheckboxPage,
        CHECKBOX_EXAMPLES
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        routing,
        SuiModule
    ],
    providers: [],
    entryComponents: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
