import {Component, HostBinding} from '@angular/core';

@Component({
    selector: 'demo-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @HostBinding('class.pushable')
    private _pushableClass:boolean = true;

    public menuOpen:boolean = false;

    public openMenu(event:MouseEvent) {
        event.stopPropagation();
        this.menuOpen = true;
    }

    public closeMenu() {
        this.menuOpen = false;
    }
}
