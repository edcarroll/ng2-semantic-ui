import {Directive, Input, HostBinding} from '@angular/core';

@Directive({
    selector: '[suiTabContent]'
})
export class TabContent {
    public id:string;

    @Input()
    public set suiTabContent(value:string) {
        if (!this.id) {
            this.id = value;
        }
    }

    @HostBinding('class.tab') tabClass = true;
    
    @HostBinding('class.active')
    public isActive:boolean = false;
}
