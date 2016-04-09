import {Component} from 'angular2/core';

import {COLLAPSE_DIRECTIVES} from '../../../../components/collapse';
// import {COLLAPSE_DIRECTIVES} from 'ng2-semantic-ui/ng2-semantic-ui';

@Component({
    selector: 'collapse-example-standard',
    directives: [COLLAPSE_DIRECTIVES],
    templateUrl: "app/components/collapse/standard.example.html"
})
export class CollapseExampleStandard { }

export const COLLAPSE_EXAMPLES:Array<any> = [CollapseExampleStandard];