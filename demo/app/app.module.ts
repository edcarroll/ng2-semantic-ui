import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {routing} from "./app.routing";
import { GettingStartedPage } from './pages/getting-started/getting-started.page';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { ExampleComponent } from './components/example/example.component';
import { SuiModule } from "../../components";
import { ApiComponent } from './components/api/api.component';
import {CollapsePage, COLLAPSE_EXAMPLES} from './pages/collapse/collapse.page';
import {AccordionPage, ACCORDION_EXAMPLES} from "./pages/accordion/accordion.page";
import {CheckboxPage, CHECKBOX_EXAMPLES} from "./pages/checkbox/checkbox.page";
import {DimmerPage, DIMMER_EXAMPLES} from "./pages/dimmer/dimmer.page";
import {DropdownPage, DROPDOWN_EXAMPLES} from "./pages/dropdown/dropdown.page";
import {MessagePage, MESSAGE_EXAMPLES} from "./pages/message/message.page";
import {ProgressPage, PROGRESS_EXAMPLES} from "./pages/progress/progress.page";
import {RatingPage, RATING_EXAMPLES} from "./pages/rating/rating.page";
import {SearchPage, SEARCH_EXAMPLES} from "./pages/search/search.page";
import {TabsPage, TABS_EXAMPLES} from "./pages/tabs/tabs.page";
import {TestPage} from "./pages/test/test.page";
import {SelectPage, SELECT_EXAMPLES} from "./pages/select/select.page";

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
        CHECKBOX_EXAMPLES,
        DimmerPage,
        DIMMER_EXAMPLES,
        DropdownPage,
        DROPDOWN_EXAMPLES,
        MessagePage,
        MESSAGE_EXAMPLES,
        ProgressPage,
        PROGRESS_EXAMPLES,
        RatingPage,
        RATING_EXAMPLES,
        SearchPage,
        SEARCH_EXAMPLES,
        SelectPage,
        SELECT_EXAMPLES,
        TabsPage,
        TABS_EXAMPLES,
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
