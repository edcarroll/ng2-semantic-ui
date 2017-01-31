import {Component, Input} from '@angular/core';

@Component({
    selector: 'demo-api',
    templateUrl: './api.component.html'
})
export class ApiComponent {
    @Input()
    public api:any;
}
