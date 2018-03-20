import { SuiTabHeader } from "../directives/tab-header";
import { SuiTabContent } from "../directives/tab-content";
export declare class Tab {
    id: string;
    header: SuiTabHeader;
    content: SuiTabContent;
    index: number;
    constructor(header: SuiTabHeader, content: SuiTabContent);
    isActive: boolean;
    readonly isDisabled: boolean;
}
