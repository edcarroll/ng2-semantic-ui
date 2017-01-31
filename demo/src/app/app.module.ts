import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {DemoRoutingModule} from './app.routing';
import {GettingStartedPage} from './pages/getting-started/getting-started.page';
import {SuiModule} from "../../../components";

import {CollapsePageComponents} from './pages/collapse/collapse.page';
import {AccordionPageComponents} from "./pages/accordion/accordion.page";
import {CheckboxPageComponents} from "./pages/checkbox/checkbox.page";
import {DimmerPageComponents} from "./pages/dimmer/dimmer.page";
import {DropdownPageComponents} from "./pages/dropdown/dropdown.page";
import {MessagePageComponents} from "./pages/message/message.page";
import {ProgressPageComponents} from "./pages/progress/progress.page";
import {RatingPageComponents} from "./pages/rating/rating.page";
import {SearchPageComponents} from "./pages/search/search.page";
import {SelectPageComponents} from "./pages/select/select.page";
import {TabsPageComponents} from "./pages/tabs/tabs.page";
import {TestPage} from "./pages/test/test.page";

import {TransitionPageComponents} from "./pages/transition/transition.page";
import {DemoComponentsModule} from './components/demo-components.module';
import {DemoPagesModule} from './pages/demo-pages.module';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,

        DemoRoutingModule,
        DemoComponentsModule,
        DemoPagesModule
    ],
    declarations: [AppComponent],
    providers: [],
    entryComponents: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
