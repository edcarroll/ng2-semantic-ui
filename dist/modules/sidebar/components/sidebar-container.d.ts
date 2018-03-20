import { AfterContentInit } from "@angular/core";
import { SidebarService } from "../services/sidebar.service";
import { SuiSidebar } from "./sidebar";
import { SuiSidebarSibling } from "./sidebar-sibling";
export declare class SuiSidebarContainer implements AfterContentInit {
    service: SidebarService;
    private _containerClasses;
    sidebar: SuiSidebar;
    sibling: SuiSidebarSibling;
    constructor();
    ngAfterContentInit(): void;
}
