import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiLocalizationService } from "./localization.service";


@NgModule({
    imports: [CommonModule],
    providers: [
        SuiLocalizationService
    ]
})
export class SuiUtilityModule {}

export { SuiLocalizationService };
