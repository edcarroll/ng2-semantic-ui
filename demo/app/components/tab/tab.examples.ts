import {Component} from '@angular/core';

import {CHECKBOX_DIRECTIVES} from '../../../../components/checkbox';
import {TAB_DIRECTIVES} from '../../../../components/tab';
// import {CHECKBOX_DIRECTIVES, TAB_DIRECTIVES} from 'ng2-semantic-ui/ng2-semantic-ui';

@Component({
    selector: 'tab-example-standard',
    directives: [TAB_DIRECTIVES],
    templateUrl: "app/components/tab/standard.example.html"
})
export class TabExampleStandard { }

@Component({
    selector: 'tab-example-properties',
    directives: [CHECKBOX_DIRECTIVES, TAB_DIRECTIVES],
    templateUrl: "app/components/tab/properties.example.html"
})
export class TabExampleProperties {
    public alert = function() {
        window.alert("You've chosen the alert tab!");
    }
}

@Component({
    selector: 'tab-example-dynamic',
    directives: [TAB_DIRECTIVES],
    templateUrl: "app/components/tab/dynamic.example.html"
})
export class TabExampleDynamic {
    public tabs = [
        { header: "1st", content: "Dynamic content" },
        { header: "2nd", content: "More content" },
        { header: "3rd", content: "Even more content" }
    ];
    public addTab() {
        this.tabs.push({
            header: "New",
            content: "Another dynamic tab"
        });
    };
    public removeTab() {
        this.tabs.pop();
    }
}

@Component({
    selector: 'tab-example-styled',
    directives: [CHECKBOX_DIRECTIVES, TAB_DIRECTIVES],
    templateUrl: "app/components/tab/styled.example.html"
})
export class TabExampleStyled {
    public pointing = true;
}

export const TAB_EXAMPLES:Array<any> = [TabExampleStandard, TabExampleProperties, TabExampleDynamic, TabExampleStyled];