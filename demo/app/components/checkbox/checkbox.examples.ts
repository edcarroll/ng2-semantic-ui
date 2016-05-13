import {Component} from '@angular/core';

import {CHECKBOX_DIRECTIVES} from '../../../../components/checkbox';
// import {CHECKBOX_DIRECTIVES} from 'ng2-semantic-ui/ng2-semantic-ui';

@Component({
    selector: 'checkbox-example-standard',
    directives: [CHECKBOX_DIRECTIVES],
    templateUrl: "app/components/checkbox/standard.example.html"
})
export class CheckboxExampleStandard {
    public eCheck:boolean = true;
}

@Component({
    selector: 'checkbox-example-radio-button',
    directives: [CHECKBOX_DIRECTIVES],
    templateUrl: "app/components/checkbox/radio.example.html"
})
export class CheckboxExampleRadioButton {
    public eRadio:any = "world";
}

@Component({
    selector: 'checkbox-example-styled',
    directives: [CHECKBOX_DIRECTIVES],
    templateUrl: "app/components/checkbox/styled.example.html"
})
export class CheckboxExampleStyled { }

export const CHECKBOX_EXAMPLES:Array<any> = [CheckboxExampleStandard, CheckboxExampleRadioButton, CheckboxExampleStyled];