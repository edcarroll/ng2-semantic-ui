import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiPopupModule } from "../popup";
import { SuiLocalizationModule } from "../../behaviors/localization";
import { SuiUtilityModule } from "../../misc/util";
import { SuiCalendarYearView } from "./views/year-view";
import { SuiCalendarMonthView } from "./views/month-view";
import { SuiCalendarItem } from "./directives/calendar-item";
import { SuiCalendarDateView } from "./views/date-view";
import { SuiDatepicker } from "./components/datepicker";
import { SuiCalendarHourView } from "./views/hour-view";
import { SuiCalendarMinuteView } from "./views/minute-view";
import { SuiDatepickerInputDirective } from "./directives/input.directive";
import {
    SuiDatepickerDirective, SuiDatepickerDirectiveValueAccessor,
    SuiDatepickerDirectiveValidator
} from "./directives/datepicker.directive";

const imports = [
    CommonModule,
    FormsModule
];

const declarations = [
    SuiCalendarItem,

    SuiCalendarYearView,
    SuiCalendarMonthView,
    SuiCalendarDateView,
    SuiCalendarHourView,
    SuiCalendarMinuteView,

    SuiDatepicker,
    SuiDatepickerDirective,
    SuiDatepickerDirectiveValueAccessor,
    SuiDatepickerDirectiveValidator,
    SuiDatepickerInputDirective
];

const entryComponents = [
    SuiDatepicker
];

const exports = [
    SuiDatepickerDirective,
    SuiDatepickerDirectiveValueAccessor,
    SuiDatepickerDirectiveValidator,
    SuiDatepickerInputDirective
];

@NgModule({
    imports: [
        ...imports,
        SuiPopupModule.forRoot(),
        SuiLocalizationModule.forRoot(),
        SuiUtilityModule.forRoot()
    ],
    declarations,
    entryComponents,
    exports
})
export class SuiDatepickerRootModule {}

@NgModule({
    imports: [
        ...imports,
        SuiPopupModule,
        SuiLocalizationModule,
        SuiUtilityModule
    ],
    declarations,
    entryComponents,
    exports
})
export class SuiDatepickerModule {
    public static forRoot():ModuleWithProviders {
        return {
            ngModule: SuiDatepickerRootModule
        };
    }
}
