import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SuiPagination } from "./components/pagination";

@NgModule({
    imports: [CommonModule],
    exports: [SuiPagination],
    declarations: [SuiPagination],
    providers: []
})
export class SuiPaginationModule { }
