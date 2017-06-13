import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTabset } from "./tabset";
import { SuiTabHeader } from "./tab-header";
import { SuiTabContent } from "./tab-content";

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
