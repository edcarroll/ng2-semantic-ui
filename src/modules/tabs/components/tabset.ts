import { Component, ContentChildren, QueryList, AfterContentInit } from "@angular/core";
import { SuiTabHeader } from "../directives/tab-header";
import { SuiTabContent } from "../directives/tab-content";
import { Tab } from "../classes/tab";

@Component({
    selector: "sui-tabset",
    template: `<ng-content></ng-content>`
})
export class SuiTabset implements AfterContentInit {
    @ContentChildren(SuiTabHeader)
    private _tabHeaders:QueryList<SuiTabHeader>;

    @ContentChildren(SuiTabContent)
    private _tabContents:QueryList<SuiTabContent>;

    // List of all tabs in the tabset.
    public tabs:Tab[];

    // Keeps track of the currently active tab.
    private _activeTab:Tab;

    public get activeTab():Tab {
        return this._activeTab;
    }

    // When setting a tab as the currently active tab, it automatically gains
    // `isActive` status (saves littering `isActive = true` everywhere).
    public set activeTab(tab:Tab) {
        this._activeTab = tab;
        tab.isActive = true;
    }

    // Keeps track of the number of times `internalComponentsUpdated` is called.
    private _barrierCount:number;

    constructor() {
        this.tabs = [];
        this._barrierCount = 0;
    }

    public ngAfterContentInit():void {
        // Fire `internalComponentsUpdated` when the query lists change.
        this._tabHeaders.changes.subscribe(() => this.internalComponentsUpdated());
        this._tabContents.changes.subscribe(() => this.internalComponentsUpdated());

        // Initially load the tabs.
        this.loadTabs();
    }

    // Fires whenever either the tab headers or tab contents query lists update.
    private internalComponentsUpdated():void {
        // We are using a 'counting barrier of n = 2', i.e. the code within only runs after the method is called twice.
        // This is so that both the headers and contents query lists can update before we run code that matches the two up.
        this._barrierCount++;

        if (this._barrierCount === 2) {
            // Reset the barrier so it can be called again.
            this._barrierCount = 0;

            // Update the tabs.
            this.loadTabs();
        }
    }

    // Connects tab headers to tab contents, and creates a tab instance for each pairing.
    private loadTabs():void {
        // Remove any tabs that no longer have an associated header.
        this.tabs = this.tabs.filter(t => !!this._tabHeaders.find(tH => tH === t.header));

        this._tabHeaders
            // Filter out the loaded headers with attached tab instances.
            .filter(tH => !this.tabs.find(t => t.header === tH))
            .forEach(tH => {
                const content = this._tabContents.find(tC => tC.id === tH.id);

                if (!content) {
                    // Error if an associated tab content cannot be found for the given header.
                    throw new Error("A [suiTabHeader] must have a related [suiTabContent].");
                }

                // Create a new tab instance for this header & content combo.
                const tab = new Tab(tH, content);

                // Subscribe to any external changes in the tab header's active state. External changes are triggered by user input.
                tab.header.isActiveExternalChange.subscribe(() => this.onHeaderActiveChanged(tab));

                // Add the new instance to the list of tabs.
                this.tabs.push(tab);
            });

        // Assign each tab an index (which denotes the order they physically appear in).
        this._tabHeaders
            .forEach((tH, i) => {
                const tab = this.tabs.find(t => t.header === tH);
                if (tab) {
                    tab.index = i;
                }
            });

        // Sort the tabs by their index.
        this.tabs.sort((a, b) => a.index - b.index);


        if (!this.activeTab) { // Check if there are no current existing active tabs.
            // If so, we must activate the first available tab.
            this.activateFirstTab();
        } else if (!this.tabs.find(t => t === this.activeTab)) { // O'wise check if current active tab has been deleted.
            // If so, we must find the closest.
            // Use `setTimeout` as this causes a 'changed after checked' error o'wise.
            setTimeout(() => this.activateClosestTab(this.activeTab));
        }

        if (this.tabs.length === 0) {
            // Error if there aren't any tabs in the tabset.
            throw new Error("You cannot have no tabs!");
        }
    }

    // Fires whenever a tab header's active state is externally changed.
    private onHeaderActiveChanged(tab:Tab):void {
        // If the tab has become activated, but was not previously the active tab:
        if (tab.isActive && this.activeTab !== tab) {
            // Deactivate all of the tabs.
            this.tabs.filter(t => t !== tab).forEach(t => t.isActive = false);

            // Set the currently active tab to this one.
            this.activeTab = tab;
        }

        // If the tab has become deactivated, but was previously the active tab:
        if (!tab.isActive && this.activeTab === tab) {
            // Activate the closest tab to it.
            this.activateClosestTab(tab);
        }
    }

    // Activate the first tab in the set.
    public activateFirstTab():void {
        this.activeTab = this.tabs[0];
    }

    // Activates the closest available tab to a given one.
    public activateClosestTab(tab:Tab):void {
        let nextAvailable:Tab | undefined;

        // When the exited tab's index is higher than all available tabs,
        if (tab.index >= this.tabs.length) {
            // Activate the last tab.
            nextAvailable = this.tabs[this.tabs.length - 1];
        }

        // If that didn't work, try the following cases:
        if (!nextAvailable) {
            if (!this.tabs.find(t => t === tab)) { // When the exited tab no longer exists,
                // Replace it with a tab at the same index.
                nextAvailable = this.tabs[tab.index];
            } else { // Or if the exited tab still exists,
                // Go to the tab immediately to the left.
                nextAvailable = this.tabs[Math.max(tab.index - 1, 0)];
            }
        }

        // However, if the chosen tab is disabled,
        if (nextAvailable.isDisabled) {
            // Activate the closest available tab to it.
            return this.activateClosestTab(nextAvailable);
        }

        this.activeTab = nextAvailable;
    }
}
