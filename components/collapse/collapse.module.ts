import {NgModule} from '@angular/core';
import {SuiCollapse} from './collapse';
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SuiCollapse
    ],
    exports: [
        SuiCollapse
    ]
})
export class SuiCollapseModule {}
