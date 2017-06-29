
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiLocalizationService } from "./services/localization.service";

@NgModule({
    imports: [CommonModule],
    providers: [SuiLocalizationService]
})
export class SuiLocalizationModule {}
