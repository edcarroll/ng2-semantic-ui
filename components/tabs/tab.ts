import {SuiTabHeader} from "./tab-header";
import {SuiTabContent} from "./tab-content";

export class Tab {
    public id:string;
    public header:SuiTabHeader;
    public content:SuiTabContent;
    public index:number;

    constructor(header:SuiTabHeader, content:SuiTabContent) {
        this.id = header.id;
        this.header = header;
        this.content = content;

        // So that the header and content isActive properties are always in sync.
        this.header.isActiveChange
            .subscribe(() => this.content.isActive = this.isActive);
    }

    // Saves accessing .header.isActive every time.
    public get isActive() {
        return this.header.isActive;
    }

    public set isActive(active:boolean) {
        // Use `setActiveState` so as not to fire 'external changes' event.
        this.header.setActiveState(active);
    }

    // Saves accessing .header.isDisabled every time.
    public get isDisabled() {
        return this.header.isDisabled;
    }
}
