import { OnChanges, EventEmitter } from "@angular/core";
export declare class SuiPagination implements OnChanges {
    private _paginationClasses;
    pageCount: number;
    pageChange: EventEmitter<number>;
    private _maxSize?;
    private _collectionSize;
    private _page;
    private _pages;
    private _hasNavigationLinks;
    maxSize: number | undefined;
    pageSize: number;
    collectionSize: number;
    hasNavigationLinks: boolean;
    hasBoundaryLinks: boolean;
    canRotate: boolean;
    hasEllipses: boolean;
    page: number;
    readonly pages: number[];
    constructor();
    hasPrevious(): boolean;
    hasNext(): boolean;
    setPage(newPage: number): void;
    ngOnChanges(): void;
    private updatePages();
    private applyPagination();
}
