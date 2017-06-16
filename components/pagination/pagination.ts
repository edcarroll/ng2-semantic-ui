import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter, HostBinding } from "@angular/core";

@Component({
    selector: "sui-pagination",
    template: `
<a *ngIf="hasBoundaryLinks" class="item"  (click)="selectPage(1)" [class.disabled]="page===1">
    <span><i class="angle double left icon"></i></span>
</a>
<a *ngIf="hasNavigation" class="item" (click)="selectPage(page-1)" [class.disabled]="!hasPrevious()">
    <span><i class="angle left icon"></i></span>
</a>
<a *ngFor="let p of pages" class="item" [class.active]="p===page" (click)="selectPage(p)">
    {{ p }}
</a>
<a *ngIf="hasNavigation" class="item" (click)="selectPage(page+1)" [class.disabled]="!hasNext()">
    <span><i class="angle right icon"></i></span>
</a>
<a *ngIf="hasBoundaryLinks" class="item"  (click)="selectPage(pageCount)" [class.disabled]="page===pageCount">
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
    public pages:number[];
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
        return this._hasNavigation;
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
        if (value !== this._page) {
            this._page = value;
            this.pageChange.emit(this._page);
        }
    }

    constructor() {
        this._paginationClasses = true;
        this.pages = [];
        this.pageChange = new EventEmitter<number>();

        // this._maxSize = undefined;
        this.collectionSize = 100;
        this.pageSize = 10;
        this.page = 1;
        this.hasNavigation = false;
    }

    // Public methods
    public hasPrevious():boolean {
        return this.page > 1;
    }

    public hasNext():boolean {
        return this.page < this.pageCount;
    }

    public selectPage(newPage:number):void {
        this.updatePages(newPage);
    }

    public ngOnChanges():void {
        this.updatePages(this.page);
    }

    // Private methods
    private updatePages(newPage:number):void {
        this.pageCount = Math.ceil(this._collectionSize / this._pageSize);

        this.pages.length = 0;
        for (let i = 0; i < this.pageCount; ++i) {
            this.pages.push(i + 1);
        }

        this.page = this.setPageInRange(newPage);

        if (this._maxSize && this._maxSize < this.pageCount) {
            let start = 0;
            let end = this.pageCount;

            [start, end] = this.applyPagination();

            this.pages = this.pages.slice(start, end);

            this.hasNavigation = true;
        }
    }

    private setPageInRange(newPage:number):number {
        return Math.min(Math.max(newPage, 1), this.pageCount);
    }

    private applyPagination():[number, number] {
        const page = Math.ceil(this.page / this.maxSize) - 1;
        const start = page * this.maxSize;
        const end = start + this.maxSize;

        return [start, end];
    }

}
