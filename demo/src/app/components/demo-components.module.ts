import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiCollapseModule} from '../../../../components/collapse/collapse.module';
import {ApiComponent} from './api/api.component';
import {CodeblockComponent} from './codeblock/codeblock.component';
import {ExampleComponent} from './example/example.component';
import {PageTitleComponent} from './page-title/page-title.component';
import {PageContentComponent} from './page-content/page-content.component';

@NgModule({
    imports: [
        CommonModule,
        SuiCollapseModule
    ],
    declarations: [
        ApiComponent,
        CodeblockComponent,
        ExampleComponent,
        PageTitleComponent,
        PageContentComponent
    ],
    exports: [
        ApiComponent,
        CodeblockComponent,
        ExampleComponent,
        PageTitleComponent,
        PageContentComponent
    ]
})
export class DemoComponentsModule {}