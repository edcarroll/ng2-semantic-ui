import {Component} from 'angular2/core';

import {CHECKBOX_DIRECTIVES} from '../../../../components/checkbox';
import {RATING_DIRECTIVES} from '../../../../components/rating';
// import {CHECKBOX_DIRECTIVES, RATING_DIRECTIVES} from 'ng2-semantic-ui/ng2-semantic-ui';

@Component({
    selector: 'rating-example-standard',
    directives: [CHECKBOX_DIRECTIVES, RATING_DIRECTIVES],
    templateUrl: "app/components/rating/standard.example.html"
})
export class RatingExampleStandard {
    public rating = 3;
}

@Component({
    selector: 'rating-example-styled',
    directives: [RATING_DIRECTIVES],
    templateUrl: "app/components/rating/styled.example.html"
})
export class RatingExampleStyled { }

export const RATING_EXAMPLES:Array<any> = [RatingExampleStandard, RatingExampleStyled];