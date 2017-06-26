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
`,
    styles: [`
:host .item {
    transition: none;
}
`
    ]
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
    private _pages:number[];
    private _hasBoundaryLinks:boolean;
    private _hasNavigation:boolean;
    private _hasRotation:boolean;

    @Input()
    public get maxSize():number|undefined {
        return this._maxSize;
    }

    public set maxSize(value:number | undefined) {
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
        const maxSize = this._maxSize || this.pageCount;
        return this._hasNavigation || maxSize < this.pageCount;
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
    public get hasRotation():boolean {
        return this._hasRotation;
    }

    public set hasRotation(value:boolean) {
        this._hasRotation = value;
    }

    @Input()
    public get page():number {
        return this._page;
    }

    public set page(value:number) {
        this.setPage(value);
    }

    public get pages():number[] {
        return this._pages;
    }

    constructor() {
        this._paginationClasses = true;
        this.pageChange = new EventEmitter<number>();

        this.pageSize = 10;
        this._page = 1;
        this._pages = [];
        this.pageCount = 1;
        this.hasNavigation = false;
        this.hasBoundaryLinks = false;
        this.hasRotation = false;
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
        this.updatePages();
    }

    // Private methods
    private updatePages():void {
        this.pageCount = Math.max(1, Math.ceil(this._collectionSize / this._pageSize));

        const [start, end] = this.applyPagination();

        this._pages.length = 0;
        this._pages = Array<number>(end - start)
            .fill(start + 1)
            .map((s, i) => s + i);
    }

    private applyPagination():[number, number] {

        const maxSize = (this.maxSize != undefined) ? Math.min(this.maxSize, this.pageCount) : this.pageCount;

        const page = Math.ceil(this.page / maxSize) - 1;
        let start = page * maxSize;
        let end = start + maxSize;

        if (this.hasRotation) {
            const leftOffset = Math.floor(maxSize / 2);
            const rightOffset = maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;

            if (this.page  <= leftOffset) {
                end = maxSize;
            } else if (this.pageCount - this.page < leftOffset) {
                start = this.pageCount - maxSize;
            } else {
                start = this.page - leftOffset - 1;
                end = this.page + rightOffset;
            }
        }

        return [start, end];
    }
}
