import {Component} from '@angular/core';

import {CHECKBOX_DIRECTIVES} from '../../../../components/checkbox';
// import {CHECKBOX_DIRECTIVES} from 'ng2-semantic-ui/ng2-semantic-ui';

@Component({
    selector: 'checkbox-example-standard',
    directives: [CHECKBOX_DIRECTIVES],
    templateUrl: "../../../../demo/app/pages/checkbox/examples/standard.example.html"
})
export class CheckboxExampleStandard {
    public eCheck:boolean = true;
}

@Component({
    selector: 'checkbox-example-radio-button',
    directives: [CHECKBOX_DIRECTIVES],
    templateUrl: "../../../../demo/app/pages/checkbox/examples/radio.example.html"
})
export class CheckboxExampleRadioButton {
    public eRadio:any = "world";
}

@Component({
    selector: 'checkbox-example-styled',
    directives: [CHECKBOX_DIRECTIVES],
    templateUrl: "../../../../demo/app/pages/checkbox/examples/styled.example.html"
})
export class CheckboxExampleStyled { }

export const CHECKBOX_EXAMPLES:Array<any> = [CheckboxExampleStandard, CheckboxExampleRadioButton, CheckboxExampleStyled];
