import {Component, Input} from '@angular/core';

@Component({
    selector: 'demo-example',
    templateUrl: './example.component.html'
})
export class ExampleComponent {
    private detail:boolean = false;

    @Input()
    public code:string;
}
