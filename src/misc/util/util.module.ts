import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiComponentFactory } from "./services/component-factory.service";

@NgModule({
    imports: [CommonModule],
    providers: [
        SuiComponentFactory
    ]
})
export class SuiUtilityModule {}
