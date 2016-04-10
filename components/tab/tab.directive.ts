import {Directive, Input, HostBinding} from 'angular2/core';
import {TabHeader} from './tab-header.directive';

@Directive({
    selector: '[suiTab]'
})
export class Tab {
    public id:string;
    public tabHeader:TabHeader;

    @Input()
    public set suiTab(value:string) {
        if (!this.id) {
            this.id = value;
        }
    }

    @HostBinding('class.tab') tabClass = true;
    
    @HostBinding('class.active')
    public isActive:boolean = false;
}
