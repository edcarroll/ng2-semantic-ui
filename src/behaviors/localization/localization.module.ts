
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiLocalizationService } from "./services/localization.service";
import { ILocaleValues, IPartialLocaleValues } from "./interfaces/values";

@NgModule({
    imports: [CommonModule],
    providers: [SuiLocalizationService]
})
export class SuiLocalizationModule {}

export {SuiLocalizationService};
export * from "./interfaces/values";
