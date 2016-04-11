import {Component, HostBinding, ElementRef, AfterViewInit, ViewChild} from 'angular2/core';
import {Dropdown, DropdownMenu} from '../dropdown';

@Component({
    selector: 'sui-search',
    directives: [DropdownMenu],
    inputs: ['isOpen', 'isDisabled', 'autoClose'],
    outputs: ['isOpenChange', 'onToggle'],
    host: {
        '[class.visible]': 'isOpen',
        '[class.disabled]': 'isDisabled'
    },
    template: `
    <input class="prompt" type="text" placeholder="Hello, world!" autocomplete="off">
    <div class="results" suiDropdownMenu>
        <a class="result">
            <div class="content">
                <div class="title">dragon</div>
            </div>
        </a>
    </div>
`
})
export class Search extends Dropdown implements AfterViewInit {
    @ViewChild(DropdownMenu) protected _menu:DropdownMenu;

    @HostBinding('class.ui')
    @HostBinding('class.search') searchClasses = true;

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
