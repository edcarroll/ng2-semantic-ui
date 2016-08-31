import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routing } from "./app.routing";
import { GettingStartedPage } from './pages/getting-started/getting-started.page';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { ExampleComponent } from './components/example/example.component';
import { SuiModule } from "../../components";
import { ApiComponent } from './components/api/api.component';
import { CollapsePageComponents } from './pages/collapse/collapse.page';
import { AccordionPageComponents } from "./pages/accordion/accordion.page";
import { CheckboxPageComponents } from "./pages/checkbox/checkbox.page";
import { DimmerPageComponents } from "./pages/dimmer/dimmer.page";
import { DropdownPageComponents } from "./pages/dropdown/dropdown.page";
import { MessagePageComponents } from "./pages/message/message.page";
import { ProgressPageComponents } from "./pages/progress/progress.page";
import { RatingPageComponents } from "./pages/rating/rating.page";
import { SearchPageComponents } from "./pages/search/search.page";
import { SelectPageComponents } from "./pages/select/select.page";
import { TabsPageComponents } from "./pages/tabs/tabs.page";
import { TestPage } from "./pages/test/test.page";

import {CodeblockComponent} from './components/codeblock/codeblock.component';

@NgModule({
    declarations: [
        AppComponent,

        PageTitleComponent,
        ExampleComponent,
        ApiComponent,
        CodeblockComponent,

        GettingStartedPage,

        AccordionPageComponents,
        CheckboxPageComponents,
        CollapsePageComponents,
        DimmerPageComponents,
        DropdownPageComponents,
        MessagePageComponents,
        ProgressPageComponents,
        RatingPageComponents,
        SearchPageComponents,
        SelectPageComponents,
        TabsPageComponents,

        TestPage
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
