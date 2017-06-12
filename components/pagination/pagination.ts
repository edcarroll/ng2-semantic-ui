import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
    selector: 'sui-pagination',
    template: `
<div class="ui pagination menu">
  <a *ngIf="showBoundary" class="item"  (click)="selectPage(1)" [ngClass]="{'disabled': page===1}"><i class="fast backward icon"></i></a>
  <a *ngIf="showNavigation" class="item" (click)="selectPage(page-1)" [ngClass]="{'disabled': !hasPrevious()}"><i class="step backward icon"></i></a>
  <a *ngFor="let p of pages" class="item" [ngClass]="{'active':p==page}" (click)="page=p">
    {{ p }}
  </a>
  <a *ngIf="showNavigation" class="item" (click)="selectPage(page+1)" [ngClass]="{'disabled': !hasNext()}"><i class="step forward icon"></i></a>
  <a *ngIf="showBoundary" class="item"  (click)="selectPage(pageCount)" [ngClass]="{'disabled': page===pageCount}"><i class="fast forward icon"></i></a>
</div>
`
})
export class SuiPagination {
    private _maxSize: number;
    private _collectionSize: number;
    private _pageSize: number;
    private _page: number;
    private _showBoundary: boolean;
    private _showNavigation: boolean;

    public pages:number[] = [];
    public pageCount: number;

    @Input()
    public get maxSize() {
      return this._maxSize;
    }

    public set maxSize(value:number) {
      this._maxSize = value;
    }

    @Input()
    public get collectionSize() {
      return this._collectionSize;
    }

    public set collectionSize(value:number) {
      this._collectionSize = value;
    }

    @Input()
    public get pageSize() {
      return this._pageSize;
    }

    public set pageSize(value:number) {
      this._pageSize = value;
    }

    @Input()
    public get showNavigation() {
      return this._showNavigation;
    }

    public set showNavigation(value:boolean) {
      this._showNavigation = value;
    }

    @Input()
    public get showBoundary() {
      return this._showBoundary;
    }

    public set showBoundary(value:boolean) {
      this._showBoundary = value;
    }

    public get page() {
      return this._page;
    }

    public set page(value:number) {
      if (value !== this._page) {
        this._page = value;
        this.pageChanged.emit(this._page);
      }
    }
    
    @Output()
    public pageChanged = new EventEmitter<number>()

    constructor() { 
      this.maxSize = 0;
      this.collectionSize = 100;
      this.pageSize = 10;
      this.page = 0;
      this.showNavigation = false;
    }

    ngOnChanges(chages: SimpleChanges): void {
      this._updatePages(this.page);
    }

    private _updatePages(newPage:number): void {
      this.pageCount = Math.ceil(this._collectionSize / this._pageSize);

      this.pages.length = 0;
      for (let i = 0; i < this.pageCount; ++i) {
        this.pages.push(i + 1);
      }

      this.page = this._setPageInRange(newPage);

      if (this._maxSize > 0 && this._maxSize < this.pageCount) {
        let start = 0;
        let end = this.pageCount;

        [start, end] = this._applyPagination();

        this.pages = this.pages.slice(start, end);

        this.showNavigation = true;
      }
    }

    private _setPageInRange(newPage:number): number {
      if (newPage < 1) {
        return 1
      } else if (newPage > this.pageCount) {
        return this.pageCount;
      }
      return newPage;
    }

    private _applyPagination() {
      let page = Math.ceil(this.page / this.maxSize) - 1;
      let start = page * this.maxSize;
      let end = start + this.maxSize;

      return [start, end];
    }

    hasPrevious(): boolean {
      return this.page > 1;
    }

    hasNext(): boolean {
      return this.page < this.pageCount;
    }

    selectPage(newPage: number) {
      this._updatePages(newPage);
    }

}