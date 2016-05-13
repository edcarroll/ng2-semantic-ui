import {Component} from '@angular/core';

import {ACCORDION_DIRECTIVES} from '../../../../components/accordion';
// import {ACCORDION_DIRECTIVES} from 'ng2-semantic-ui/ng2-semantic-ui';

@Component({
    selector: 'accordion-example-standard',
    directives: [ACCORDION_DIRECTIVES],
    templateUrl: "app/components/accordion/standard.example.html"
})
export class AccordionExampleStandard { }

@Component({
    selector: 'accordion-example-styled',
    directives: [ACCORDION_DIRECTIVES],
    templateUrl: "app/components/accordion/styled.example.html"
})
export class AccordionExampleStyled { }

export const ACCORDION_EXAMPLES:Array<any> = [AccordionExampleStandard, AccordionExampleStyled];