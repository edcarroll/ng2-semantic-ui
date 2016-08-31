import {Component, Input} from '@angular/core';

@Component({
  selector: 'demo-api',
  templateUrl: 'api.component.html',
  styleUrls: ['api.component.css']
})
export class ApiComponent {
    @Input() public api:any;
}
