import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SuiSidebar, SuiSidebarContainer, SuiSidebarSibling} from './sidebar';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SuiSidebar,
        SuiSidebarContainer,
        SuiSidebarSibling
    ],
    exports: [
        SuiSidebar,
        SuiSidebarContainer,
        SuiSidebarSibling
    ]
})
export class SuiSidebarModule {}
