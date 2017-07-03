import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTabset } from "./components/tabset";
import { SuiTabHeader } from "./directives/tab-header";
import { SuiTabContent } from "./directives/tab-content";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SuiTabset,
        SuiTabHeader,
        SuiTabContent
    ],
    exports: [
        SuiTabset,
        SuiTabHeader,
        SuiTabContent
    ]
})
export class SuiTabsModule {}
