import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { SuiPagination } from "./pagination";

describe("Pagination", () => {

    let comp:SuiPagination;
    let fixture:ComponentFixture<SuiPagination>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SuiPagination] // declare the test component
        });

        fixture = TestBed.createComponent(SuiPagination);

        comp = fixture.componentInstance; // SuiPagination test instance
    });

    it("should be created", () => {

        expect(comp).toBeTruthy();
    });
});
