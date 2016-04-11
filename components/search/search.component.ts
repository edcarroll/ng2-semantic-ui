import {Component, HostBinding, ElementRef, AfterViewInit, ViewChild} from 'angular2/core';
import {Dropdown, DropdownMenu} from '../dropdown';
import {TemplateComponent} from '../template/template.component';

@Component({
    selector: 'sui-search',
    directives: [DropdownMenu, TemplateComponent],
    inputs: ['placeholder', 'options', 'templateId', 'templateUrl'],
    host: {
        '[class.visible]': 'isOpen',
        '[class.disabled]': 'isDisabled'
    },
    template: `
<input class="prompt" type="text" [attr.placeholder]="placeholder" autocomplete="off">
<div class="results" suiDropdownMenu>
    <a class="result" *ngFor="#result of options; #i = index">
        <sui-template [id]="templateId" [url]="templateUrl" [context]="{ result: result }"></sui-template>
    </a>
</div>
`
})
export class Search extends Dropdown implements AfterViewInit {
    @ViewChild(DropdownMenu) protected _menu:DropdownMenu;

    @HostBinding('class.ui')
    @HostBinding('class.search') searchClasses = true;

    public placeholder:string = "Search...";
    public options:Array<any> = [];
    public templateId:string;
    public templateUrl:string;

    constructor(el:ElementRef) {
        super(el);
        this._service.itemClass = "result";
        this._service.itemSelectedClass = "active";
    }

    public ngAfterContentInit():void {
        //Override this
        return;
    }

    public ngAfterViewInit():void {
        this._menu.service = this._service;
    }
}