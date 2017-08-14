import { Component, Input, EventEmitter, Output } from "@angular/core";
import { CalendarRangeService } from "../services/calendar-range.service";

@Component({
    selector: "sui-calendar-view-title",
    template: `
<span class="title link" (click)="onZoomOut.emit()">
    <ng-content></ng-content>
</span>
<span class="prev link" [class.disabled]="!ranges?.canMovePrevious" (click)="ranges?.movePrevious()">
    <i class="chevron left icon"></i>
</span>
<span class="next link" [class.disabled]="!ranges?.canMoveNext" (click)="ranges?.moveNext()">
    <i class="chevron right icon"></i>
</span>
`,
    styles: [`
.title.link {
    display: inline-block;
    margin-left: 2rem;
    margin-right: 2rem;
}
`]
})
export class SuiCalendarViewTitle {

    @Input()
    public ranges:CalendarRangeService;

    @Output("zoomOut")
    public onZoomOut:EventEmitter<void>;

    constructor() {
        this.onZoomOut = new EventEmitter<void>();
    }
}
