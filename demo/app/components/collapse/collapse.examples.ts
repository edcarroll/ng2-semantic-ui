import {Component} from 'angular2/core';

import {Collapse} from '../../../../components/collapse';
// import {Collapse} from 'ng2-semantic-ui/ng2-semantic-ui';

@Component({
    selector: 'collapse-example-standard',
    directives: [Collapse],
    templateUrl: "app/components/collapse/standard.example.html"
})
export class CollapseExampleStandard { }

export const COLLAPSE_EXAMPLES:Array<any> = [CollapseExampleStandard];