import {Component} from '@angular/core';

import {CHECKBOX_DIRECTIVES} from '../../../../components/checkbox';
import {DIMMER_DIRECTIVES} from '../../../../components/dimmer';
// import {CHECKBOX_DIRECTIVES, DIMMER_DIRECTIVES} from 'ng2-semantic-ui/ng2-semantic-ui';

@Component({
    selector: 'dimmer-example-standard',
    directives: [CHECKBOX_DIRECTIVES, DIMMER_DIRECTIVES],
    templateUrl: "app/components/dimmer/standard.example.html"
})
export class DimmerExampleStandard {
    public isClickable:boolean = true;
}

@Component({
    selector: 'dimmer-example-variations',
    directives: [DIMMER_DIRECTIVES],
    templateUrl: "app/components/dimmer/variations.example.html"
})
export class DimmerExampleVariations {
    public isClickable:boolean = true;
}

export const DIMMER_EXAMPLES:Array<any> = [DimmerExampleStandard, DimmerExampleVariations];