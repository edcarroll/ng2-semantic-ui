import {Component} from 'angular2/core';

import {CHECKBOX_DIRECTIVES} from '../../../../components/checkbox';
import {PROGRESS_DIRECTIVES} from '../../../../components/progress';
// import {CHECKBOX_DIRECTIVES, PROGRESS_DIRECTIVES} from 'ng2-semantic-ui/ng2-semantic-ui';

@Component({
    selector: 'progress-example-standard',
    directives: [CHECKBOX_DIRECTIVES, PROGRESS_DIRECTIVES],
    templateUrl: "app/components/progress/standard.example.html"
})
export class ProgressExampleStandard {
    public value:number = 55;
    public progress:boolean = true;
    public maximum:number = 100;
    public precision:number = 0;
}

@Component({
    selector: 'progress-example-variations',
    directives: [PROGRESS_DIRECTIVES],
    templateUrl: "app/components/progress/variations.example.html"
})
export class ProgressExampleVariations {
    public value:number = 55;

    constructor() {
        this.updateChangingValue();
        this.randomValue = Math.floor(Math.random() * 100) + 1;
    }

    private updateChangingValue() {
        setTimeout(() => {
            if (this.changingValue > 120) {
                this.changingValue = -20;
            }
            else {
                this.changingValue += 2;
            }
            this.updateChangingValue();
        }, 75);
    }

    public changingValue = -20;
    public randomValue = 0;
}

export const PROGRESS_EXAMPLES:Array<any> = [ProgressExampleStandard, ProgressExampleVariations];