import { Component, OnInit, DebugElement, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { SuiPagination } from "./pagination";
import { SuiPaginationModule } from "../pagination.module";

/**
 * TestHostComponent
 */
@Component({
    template: `
<sui-pagination 
    [collectionSize]="collectionSize" 
    [pageSize]="pageSize"
    [maxSize]="maxSize"
    [(page)]="currentPage"
    ></sui-pagination>
`
})
export class TestHostComponent {
    public collectionSize:number;
    public pageSize:number;
    public maxSize?:number;
    public currentPage:number;

    constructor() {
        this.collectionSize = 10;
        this.pageSize = 10;
        this.currentPage = 1;
    }
}

///////////////////////////////////////////////////////////

describe("Pagination", () => {

    let comp:TestHostComponent;
    let fixture:ComponentFixture<TestHostComponent>;
    let pagination:SuiPagination;
    let paginationElement:DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SuiPaginationModule],
            declarations: [TestHostComponent] // declare the test component
        });

        fixture = TestBed.createComponent(TestHostComponent);
        comp = fixture.componentInstance; // TestHostComponent test instance

        paginationElement = fixture.debugElement.query(By.css("sui-pagination"));
        pagination = paginationElement.componentInstance;
    });

    it("should be created with default values", () => {

        expect(pagination).toBeTruthy();

        expect(pagination.pageSize).toBe(10);
        expect(pagination.page).toBe(1);
        expect(pagination.pageCount).toBe(1);
        expect(pagination.hasNavigationLinks).toBe(true);
        expect(pagination.maxSize).toBeUndefined();

        expect(pagination.pages.length).toBe(0);
    });

    it("should emit pageChange", () => {

        comp.collectionSize = 50;

        fixture.detectChanges();
        expect(pagination.collectionSize).toEqual(comp.collectionSize);
        expect(pagination.page).toBe(1);
        expect(pagination.pageCount).toBe(5);
        expect(pagination.pages).toEqual([1, 2, 3, 4, 5]);

        pagination.page = 2;
        fixture.detectChanges();
        expect(comp.currentPage).toBe(2);
    });

    it("should automatically compute pages", () => {

        comp.collectionSize = 50;

        fixture.detectChanges();
        expect(pagination.page).toBe(1);
        expect(pagination.pageCount).toBe(5);
        expect(pagination.pages).toEqual([1, 2, 3, 4, 5]);

        comp.collectionSize = 100;
        comp.pageSize = 25;

        fixture.detectChanges();
        expect(pagination.page).toBe(1);
        expect(pagination.pageCount).toBe(4);
        expect(pagination.pages).toEqual([1, 2, 3, 4]);

        comp.collectionSize = 101;
        comp.pageSize = 25;

        fixture.detectChanges();
        expect(pagination.page).toBe(1);
        expect(pagination.pageCount).toBe(5);
        expect(pagination.pages).toEqual([1, 2, 3, 4, 5]);
    });

    it("should apply pagination (no ellipses)", () => {

        pagination.hasEllipses = false;

        comp.collectionSize = 100;
        comp.pageSize = 10;
        comp.maxSize = 5;

        fixture.detectChanges();
        expect(pagination.page).toBe(1);
        expect(pagination.pageCount).toBe(10);
        expect(pagination.pages).toEqual([1, 2, 3, 4, 5]);

        comp.maxSize = 6;

        fixture.detectChanges();
        expect(pagination.page).toBe(1);
        expect(pagination.pageCount).toBe(10);
        expect(pagination.pages).toEqual([1, 2, 3, 4, 5, 6]);

        pagination.page = 4;
        fixture.detectChanges();
        expect(pagination.page).toBe(4);
        expect(pagination.pageCount).toBe(10);
        expect(pagination.pages).toEqual([1, 2, 3, 4, 5, 6]);

        pagination.page = 7;
        fixture.detectChanges();
        expect(pagination.page).toBe(7);
        expect(pagination.pageCount).toBe(10);
        expect(pagination.pages).toEqual([7, 8, 9, 10]);
    });

    it("should apply rotation (no ellipses)", () => {
        pagination.hasEllipses = false;
        pagination.canRotate = true;

        comp.collectionSize = 100;
        comp.pageSize = 10;
        comp.maxSize = 5;

        fixture.detectChanges();
        expect(pagination.page).toBe(1);
        expect(pagination.pageCount).toBe(10);
        expect(pagination.pages).toEqual([1, 2, 3, 4, 5]);

        pagination.page = 4;
        fixture.detectChanges();
        expect(pagination.pageCount).toBe(10);
        expect(pagination.pages).toEqual([2, 3, 4, 5, 6]);

        pagination.page = 10;
        fixture.detectChanges();
        expect(pagination.pageCount).toBe(10);
        expect(pagination.pages).toEqual([6, 7, 8, 9, 10]);

        comp.maxSize = 4;
        pagination.page = 4;
        fixture.detectChanges();
        expect(pagination.page).toBe(4);
        expect(pagination.pageCount).toBe(10);
        expect(pagination.pages).toEqual([2, 3, 4, 5]);
    });

    it("should force navigation links if needed", () => {
        comp.collectionSize = 100;
        comp.pageSize = 10;
        comp.maxSize = 5;

        // Links visible
        fixture.detectChanges();
        expect(pagination.pages.length).toBe(5);
        expect(pagination.hasNavigationLinks).toBe(true);

        comp.maxSize = 10;
        pagination.hasNavigationLinks = false;

        // Links not visible
        fixture.detectChanges();
        expect(pagination.pages.length).toBe(10);
        expect(pagination.hasNavigationLinks).toBe(false);

        comp.maxSize = 5;

        // Links are forced to be visible
        fixture.detectChanges();
        expect(pagination.pages.length).toBe(5);
        expect(pagination.hasNavigationLinks).toBe(true);
    });
    it("should keep the start page number", () => {
        comp.collectionSize = 100;
        comp.pageSize = 10;
        comp.maxSize = 5;
        comp.currentPage = 5;

        fixture.detectChanges();
        expect(comp.currentPage).toBe(5);
        expect(pagination.page).toBe(5);
    });
});
