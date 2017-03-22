import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SuiModule} from '../../../../components';
import {DemoComponentsModule} from '../components/demo-components.module';

import {GettingStartedPage} from './getting-started/getting-started.page';
import {TestPage} from './test/test.page';

import {AccordionPageComponents} from './accordion/accordion.page';
import {CheckboxPageComponents} from './checkbox/checkbox.page';
import {CollapsePageComponents} from './collapse/collapse.page';
import {DimmerPageComponents} from './dimmer/dimmer.page';
import {DropdownPageComponents} from './dropdown/dropdown.page';
import {MessagePageComponents} from './message/message.page';
import {ProgressPageComponents} from './progress/progress.page';
import {RatingPageComponents} from './rating/rating.page';
import {SearchPageComponents} from './search/search.page';
import {SelectPageComponents} from './select/select.page';
import {TabsPageComponents} from './tabs/tabs.page';
import {TransitionPageComponents} from './transition/transition.page';
import {RouterModule} from '@angular/router';
import {PopupPageComponents} from './popup/popup.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        SuiModule,
        DemoComponentsModule
    ],
    declarations: [
        GettingStartedPage,
        TestPage,
        
        AccordionPageComponents,
        CheckboxPageComponents,
        CollapsePageComponents,
        DimmerPageComponents,
        DropdownPageComponents,
        MessagePageComponents,
        PopupPageComponents,
        ProgressPageComponents,
        RatingPageComponents,
        SearchPageComponents,
        SelectPageComponents,
        TabsPageComponents,
        TransitionPageComponents
    ],
    exports: []
})
export class DemoPagesModule {}