import {Component, AfterContentInit, ContentChildren, QueryList} from 'angular2/core';
import {Tab} from './tab.directive';
import {TabHeader} from "./tab-header.directive";

@Component({
    selector: 'sui-tabset',
    directives: [],
    template: `
<ng-content></ng-content>
<div class="ui tab">Placeholder</div>
`
})
export class Tabset implements AfterContentInit {
    @ContentChildren(TabHeader) private tabHeaders: QueryList<TabHeader>;
    @ContentChildren(Tab) private tabs: QueryList<Tab>;

    private loadedTabs:Array<TabHeader> = [];
    private activeTab:TabHeader;

    public ngAfterContentInit():void {
        //Once we have loaded and found all child suiTabs and suiTabHeaders, link them together
        this.loadTabs();

        this.tabHeaders.changes.subscribe(tabHeaders => this.loadTabs());
    }

    private loadTabs() {
        this.loadedTabs = this.tabHeaders.toArray();
        //For every tab header we have managed to find,
        this.loadedTabs.forEach((tH:TabHeader) => {
            //Assuming they have an associated tab
            if (!tH.tab) {
                //Link the tab header with the tab with the same ID excluding ones that are already linked
                tH.tab = this.tabs.toArray().find(t => !t.tabHeader && t.id == tH.id);
                //Link the tab with the tab header in case we do this again and the IDs change
                tH.tab.tabHeader = tH;
            }

            //Next observe the tab's state to catch any changes made anywhere
            tH.stateChanged$.subscribe((tH:TabHeader) => this.tabStateChanged(tH));
        });

        setTimeout(() => {
            //If there isn't an active tab that is currently a loaded tab already, activate the first available tab
            if ((this.activeTab && !this.loadedTabs.find(t => t == this.activeTab)) || !this.activeTab) {
                this.activateFirstTab();
            }
        });
    }

    //This runs when any tab changes state (e.g. isActive changed, isDisabled changed)
    private tabStateChanged(tabHeader:TabHeader) {
        //Check if the tab is now active
        if (tabHeader.isActive) {
            //If so, deactivate all other tabs that aren't this one
            this.loadedTabs
                .filter((tH:TabHeader) => tH != tabHeader)
                .forEach((tH:TabHeader) => tH.isActive = false);

            //Set this tab to be the current active tab
            this.activeTab = tabHeader;
        }
        //Check if the tab is now disabled, and if so if is currently active
        if (tabHeader.isDisabled && tabHeader.isActive) {
            //If so, unset the tab as it is now disabled
            tabHeader.isActive = false;
            //Find the first available tab to activate
            this.activateFirstTab();
        }
    }

    //This activates the first tab that isn't disabled
    private activateFirstTab() {
        //Filter out all disabled tabs from the currently loaded list and take the first one
        var firstAvailable = this.loadedTabs.filter((tH:TabHeader) => !tH.isDisabled)[0];
        if (firstAvailable) {
            //If there is one available, activate it and set it to the currently active tab
            firstAvailable.isActive = true;
            //Note, because we are observing each tab's state, this.activeTab will be updated by this setter
        }
    }
}
