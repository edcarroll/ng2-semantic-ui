import {Component, Input, Output, HostBinding, HostListener, EventEmitter} from 'angular2/core';

@Component({
    selector: 'sui-dimmer',
    template: `
<div class="content">
    <div class="center">
        <ng-content></ng-content>
    </div>
</div>
`,
    styles: [`
:host.dimmer {
    transition: visibility 0.3s, opacity 0.3s ease;
    display: block;
    visibility: hidden;
}

:host.active {
    visibility: visible;
}
`]
})
export class Dimmer {
    @HostBinding('class.ui')
    @HostBinding('class.dimmer') classes = true;

    @Input() public isClickable:boolean = true;

    @HostBinding('class.active')
    @Input() public isDimmed:boolean = false;

    @Output() public isDimmedChange:EventEmitter<boolean> = new EventEmitter(false);

    @HostListener('click')
    private click() {
        if (this.isClickable) {
            this.isDimmed = false;
            this.isDimmedChange.emit(this.isDimmed);
        }
    }
}
