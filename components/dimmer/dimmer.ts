import {Component, Input, Output, HostBinding, HostListener, EventEmitter} from '@angular/core';

@Component({
    selector: 'sui-dimmer',
    exportAs: 'suiDimmer',
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
export class SuiDimmer {
    @HostBinding('class.ui')
    @HostBinding('class.dimmer') classes = true;

    @Input() public isClickable:boolean = true;

    @HostBinding('class.active')
    @Input() public isDimmed:boolean = false;

    @Output() public isDimmedChange:EventEmitter<boolean> = new EventEmitter<boolean>(false);

    @HostListener('click')
    private click() {
        if (this.isClickable) {
            this.isDimmed = false;
            this.isDimmedChange.emit(this.isDimmed);
        }
    }
}

export const SUI_DIMMER_DIRECTIVES = [SuiDimmer];
