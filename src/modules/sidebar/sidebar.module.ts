import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiSidebar } from "./components/sidebar";
import { SuiSidebarContainer } from "./components/sidebar-container";
import { SuiSidebarSibling } from "./components/sidebar-sibling";

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
