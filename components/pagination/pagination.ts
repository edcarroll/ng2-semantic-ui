import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter, HostBinding } from "@angular/core";

@Component({
    selector: "sui-pagination",
    template: `
<a *ngIf="hasBoundaryLinks" class="item"  (click)="setPage(1)" [class.disabled]="page===1">
    <span><i class="angle double left icon"></i></span>
</a>
<a *ngIf="hasNavigation" class="item" (click)="setPage(page-1)" [class.disabled]="!hasPrevious()">
    <span><i class="angle left icon"></i></span>
</a>
<a *ngFor="let p of pages" class="item" [class.active]="p===page" (click)="setPage(p)">
    {{ p }}
</a>
<a *ngIf="hasNavigation" class="item" (click)="setPage(page+1)" [class.disabled]="!hasNext()">
    <span><i class="angle right icon"></i></span>
</a>
<a *ngIf="hasBoundaryLinks" class="item"  (click)="setPage(pageCount)" [class.disabled]="page===pageCount">
    <span><i class="angle double right icon"></i></span>
</a>
`
})
export class SuiPagination implements OnChanges {

    @HostBinding("class.ui")
    @HostBinding("class.pagination")
    @HostBinding("class.menu")
    private _paginationClasses:boolean;

    // Public members
    public pageCount:number;

    @Output()
    public pageChange:EventEmitter<number>;

    // Private members
    private _maxSize?:number;
    private _collectionSize:number;
    private _pageSize:number;
    private _page:number;
    private _hasBoundaryLinks:boolean;
    private _hasNavigation:boolean;

    @Input()
    public get maxSize():number {
        return this._maxSize;
    }

    public set maxSize(value:number) {
        this._maxSize = (value !== undefined) ? Math.max(value, 1) : undefined;
    }

    @Input()
    public get collectionSize():number {
        return this._collectionSize;
    }

    public set collectionSize(value:number) {
        this._collectionSize = Math.max(value, 0);
    }

    @Input()
    public get pageSize():number {
        return this._pageSize;
    }

    public set pageSize(value:number) {
        this._pageSize = value;
    }

    @Input()
    public get hasNavigation():boolean {
        return this._hasNavigation || this._maxSize < this.pageCount;
    }

    public set hasNavigation(value:boolean) {
        this._hasNavigation = value;
    }

    @Input()
    public get hasBoundaryLinks():boolean {
        return this._hasBoundaryLinks;
    }

    public set hasBoundaryLinks(value:boolean) {
        this._hasBoundaryLinks = value;
    }

    @Input()
    public get page():number {
        return this._page;
    }

    public set page(value:number) {
        this.setPage(value);
    }

    public get pages():number[] {
        const [start, end] = this.applyPagination();

        return Array<number>(end - start)
            .fill(start + 1)
            .map((s, i) => s + i);
    }

    constructor() {
        this._paginationClasses = true;
        this.pageChange = new EventEmitter<number>();

        this.collectionSize = 100;
        this.pageSize = 10;
        this.page = 1;
        this.hasNavigation = false;
        this.hasBoundaryLinks = false;
    }

    // Public methods
    public hasPrevious():boolean {
        return this.page > 1;
    }

    public hasNext():boolean {
        return this.page < this.pageCount;
    }

    public setPage(newPage:number):void {
        const value:number = (Number.isInteger(newPage)) ? Math.min(Math.max(newPage, 1), this.pageCount) : 1;
        if (value !== this._page) {
            this._page = value;
            this.pageChange.emit(this._page);
        }
    }

    // Lifecycle hooks
    public ngOnChanges(changes:SimpleChanges):void {
        console.log(changes);
        this.updatePages(this.page);
    }

    // Private methods
    private updatePages(newPage:number):void {
        this.pageCount = Math.max(1, Math.ceil(this._collectionSize / this._pageSize));

        this.setPage(newPage);
    }

    private applyPagination():[number, number] {

        let start = 0;
        let end = this.pageCount;

        if (this.maxSize !== undefined && this.maxSize < this.pageCount) {

            const page = Math.ceil(this.page / this.maxSize) - 1;
            start = page * this.maxSize;
            end = start + this.maxSize;
        }
        return [start, end];
    }

}
