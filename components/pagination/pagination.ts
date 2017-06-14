import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from "@angular/core";

@Component({
  selector: "sui-pagination",
  template: `
<div class="ui pagination menu">
  <a *ngIf="showBoundary" class="item"  (click)="selectPage(1)" 
  [ngClass]="{'disabled': page===1}"><i class="fast backward icon"></i></a>
  <a *ngIf="showNavigation" class="item" (click)="selectPage(page-1)" 
  [ngClass]="{'disabled': !hasPrevious()}"><i class="step backward icon"></i></a>
  <a *ngFor="let p of pages" class="item" [ngClass]="{'active':p==page}" (click)="page=p">
  {{ p }}
  </a>
  <a *ngIf="showNavigation" class="item" (click)="selectPage(page+1)" 
  [ngClass]="{'disabled': !hasNext()}"><i class="step forward icon"></i></a>
  <a *ngIf="showBoundary" class="item"  (click)="selectPage(pageCount)" 
  [ngClass]="{'disabled': page===pageCount}"><i class="fast forward icon"></i></a>
</div>
`
})
export class SuiPagination implements OnChanges {

  // Public members
  public pages:number[] = [];
  public pageCount:number;

  @Output()
  public pageChanged:EventEmitter<number> = new EventEmitter<number>();

  // Private members
  private _maxSize:number;
  private _collectionSize:number;
  private _pageSize:number;
  private _page:number;
  private _showBoundary:boolean;
  private _showNavigation:boolean;

  constructor() {
    this.maxSize = 0;
    this.collectionSize = 100;
    this.pageSize = 10;
    this.page = 0;
    this.showNavigation = false;
  }

  // Public methods
  @Input()
  public get maxSize():number {
    return this._maxSize;
  }

  public set maxSize(value:number) {
    this._maxSize = value;
  }

  @Input()
  public get collectionSize():number {
    return this._collectionSize;
  }

  public set collectionSize(value:number) {
    this._collectionSize = value;
  }

  @Input()
  public get pageSize():number {
    return this._pageSize;
  }

  public set pageSize(value:number) {
    this._pageSize = value;
  }

  @Input()
  public get showNavigation():boolean {
    return this._showNavigation;
  }

  public set showNavigation(value:boolean) {
    this._showNavigation = value;
  }

  @Input()
  public get showBoundary():boolean {
    return this._showBoundary;
  }

  public set showBoundary(value:boolean) {
    this._showBoundary = value;
  }

  public get page():number {
    return this._page;
  }

  public set page(value:number) {
    if (value !== this._page) {
    this._page = value;
    this.pageChanged.emit(this._page);
    }
  }

  public hasPrevious():boolean {
    return this.page > 1;
  }

  public hasNext():boolean {
    return this.page < this.pageCount;
  }

  public selectPage(newPage:number):void {
    this.updatePages(newPage);
  }

  public ngOnChanges(chages:SimpleChanges):void {
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

    if (this._maxSize > 0 && this._maxSize < this.pageCount) {
    let start = 0;
    let end = this.pageCount;

    [start, end] = this.applyPagination();

    this.pages = this.pages.slice(start, end);

    this.showNavigation = true;
    }
  }

  private setPageInRange(newPage:number):number {
    if (newPage < 1) {
      return 1;
    } else if (newPage > this.pageCount) {
      return this.pageCount;
    }
    return newPage;
  }

  private applyPagination():number[] {
    const page = Math.ceil(this.page / this.maxSize) - 1;
    const start = page * this.maxSize;
    const end = start + this.maxSize;

    return [start, end];
  }

}
