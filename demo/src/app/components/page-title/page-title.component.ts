import {Component, HostBinding} from '@angular/core';

@Component({
    selector: 'demo-page-title',
    templateUrl: './page-title.component.html',
    styles: [`
:host {
    display: block;
}
`]
})
export class PageTitleComponent {
    @HostBinding('class.ui')
    @HostBinding('class.masthead')
    @HostBinding('class.vertical')
    @HostBinding('class.segment') classes = true;
}
