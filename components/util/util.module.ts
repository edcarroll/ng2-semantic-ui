import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiLocalizationService } from "./localization.service";
import { SuiComponentFactory } from "./component-factory.service";


@NgModule({
    imports: [CommonModule],
    providers: [
        SuiLocalizationService,
        SuiComponentFactory
    ]
})
export class SuiUtilityModule {}

export { SuiLocalizationService };
