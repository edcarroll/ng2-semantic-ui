import {Component} from '@angular/core';

import {CHECKBOX_DIRECTIVES} from '../../../../components/checkbox';
import {DROPDOWN_DIRECTIVES} from '../../../../components/dropdown';
// import {CHECKBOX_DIRECTIVES, DROPDOWN_DIRECTIVES} from 'ng2-semantic-ui/ng2-semantic-ui';

@Component({
    selector: 'dropdown-example-standard',
    directives: [CHECKBOX_DIRECTIVES, DROPDOWN_DIRECTIVES],
    templateUrl: "app/components/dropdown/standard.example.html"
})
export class DropdownExampleStandard { }

@Component({
    selector: 'dropdown-example-styled',
    directives: [DROPDOWN_DIRECTIVES],
    templateUrl: "app/components/dropdown/styled.example.html"
})
export class DropdownExampleStyled { }

export const DROPDOWN_EXAMPLES:Array<any> = [DropdownExampleStandard, DropdownExampleStyled];