import {Component, AfterContentInit, ContentChildren, QueryList} from '@angular/core';
import {SuiTabContent} from './tab-content';
import {SuiTab} from "./tab";

@Component({
    selector: 'sui-tabset',
    exportAs: 'suiTabset',
    template: `
<ng-content></ng-content>
`,
    styles: [`
:host .ui.segment {
    margin-bottom: 0;
}
`]
})
export class SuiTabset implements AfterContentInit {
    @ContentChildren(SuiTab)
    private _tabs: QueryList<SuiTab>;
    @ContentChildren(SuiTabContent)
    private _tabContents: QueryList<SuiTabContent>;

    private _loadedTabs:Array<SuiTab> = [];
    private _activeTab:SuiTab;

    public ngAfterContentInit():void {
        //Once we have loaded and found all child suiTabs and suiTabHeaders, link them together
        this.loadTabs();

        this._tabs.changes.subscribe(tabHeaders => {
            setTimeout(() => {
                this.loadTabs()
            });
        });
    }

    //This runs every time the contents of the component change
    private loadTabs() {
        this._loadedTabs = this._tabs.toArray();
        if (!this._loadedTabs.length) {
            throw new Error("You cannot have no tabs!");
        }
        //For every content header we have managed to find,
        this._loadedTabs.forEach((t:SuiTab) => {
            //Assuming they have an associated content
            if (!t.content) {
                //Link the content header with the content with the same ID excluding ones that are already linked
                var possibleContents = this._tabContents.filter((tC:SuiTabContent) => tC.id == t.id);
                if (possibleContents.length == 0) {
                    throw new Error("A [suiTabHeader] must have a related [suiTabContent].");
                }
                if (possibleContents.length > 1) {
                    throw new Error("A [suiTabHeader] must not have more than 1 related [suiTabContent].")
                }

                t.content = possibleContents.pop();
            }

            //Next observe the content's state to catch any changes made anywhere
            t.stateChanged$.subscribe((t:SuiTab) => this.tabStateChanged(t));
        });

        setTimeout(() => {
            //If there isn't an active content that is currently a loaded content already, activate the first available content
            if ((this._activeTab && !this._loadedTabs.find(t => t == this._activeTab)) || !this._activeTab) {
                this.activateFirstTab();
            }
        });
    }

    //This runs when any content changes state (e.g. isActive changed, isDisabled changed)
    private tabStateChanged(tab:SuiTab) {
        //Check if the content is now active
        if (tab.isActive && this._activeTab != tab) {
            //If so, deactivate all other tabs that aren't this one
            this._loadedTabs
                .filter((tH:SuiTab) => tH != tab)
                .forEach((tH:SuiTab) => tH.isActive = false);

            //Set this content to be the current active content
            this._activeTab = tab;
        }
        //Otherwise check there are no active tabs
        else if (this._activeTab && !this._loadedTabs.filter((tH:SuiTab) => tH.isActive).length) {
            this.activateClosestTab(tab);
        }

        //Check if the content is now disabled, and if so if is currently active
        if (tab.isDisabled && tab.isActive) {
            //If so, unset the content as it is now disabled
            tab.isActive = false;
            //Find the first available content to activate
            this.activateClosestTab(tab);
        }

        //Check if all of the tabs are disabled
        if (tab.isDisabled && !this._loadedTabs.filter((tH:SuiTab) => !tH.isDisabled).length) {
            throw new Error("You cannot disable all of your tabs!");
        }
    }

    //This activates the first content that isn't disabled
    private activateFirstTab() {
        //Filter out all disabled tabs from the currently loaded list and take the first one
        var firstAvailable = this._loadedTabs.filter((tH:SuiTab) => !tH.isDisabled)[0];
        if (firstAvailable) {
            //If there is one available, activate it and set it to the currently active content
            firstAvailable.isActive = true;
            //Note, because we are observing each content's state, this.activeTab will be updated by this setter
        }
    }

    //This activates the closest available content to the one provided
    private activateClosestTab(tab:SuiTab) {
        //Grab a list of all of the loaded tabs that aren't disabled (excluding the one we are leaving)
        var availableTabs = this._loadedTabs
            .filter((tH:SuiTab) => !tH.isDisabled || tH == tab);

        var tabIndex = availableTabs
            .findIndex((tH:SuiTab) => tH == tab);

        //Go to the previous content, unless it is the 1st content.
        tabIndex += (tabIndex ? -1 : 1);

        availableTabs[tabIndex].isActive = true;
        //This if we just activated a disabled content, not to worry as it will bubble through
    }
}

export const SUI_TABS_DIRECTIVES = [SuiTabset, SuiTab, SuiTabContent];
