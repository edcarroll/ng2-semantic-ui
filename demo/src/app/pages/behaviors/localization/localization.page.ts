import { Component, OnDestroy } from "@angular/core";
import { SuiLocalizationService } from "ng2-semantic-ui";
import locales from "ng2-semantic-ui/locales";

const exampleTemplate = `
<div class="ui segments">
    <div class="ui segment">
        <p>Language</p>
        <sui-select class="selection"
                    [(ngModel)]="language"
                    [options]="languages"
                    labelField="name"
                    valueField="code"
                    [isSearchable]="true"
                    #lang>

            <sui-select-option *ngFor="let l of lang.availableOptions"
                               [value]="l"></sui-select-option>
        </sui-select>
    </div>
    <div class="ui segment">
        <div class="ui left icon fluid input">
            <i class="calendar icon"></i>
            <input suiDatepicker pickerMode="date" [pickerUseNativeOnMobile]="false">
        </div>
    </div>
    <div class="ui segment">
        <sui-select class="fluid selection">
            <sui-select-option value="Option 1"></sui-select-option>
            <sui-select-option value="Option 2"></sui-select-option>
            <sui-select-option value="Option 3"></sui-select-option>
        </sui-select>
    </div>
</div>
`;

interface ISupportedLanguage {
    name:string;
    code?:string;
    children?:ISupportedLanguage[];
    default?:boolean;
}

const supportedLanguages:ISupportedLanguage[] = [
    {
        name: "English",
        children: [
            {
                name: "Australian",
                code: "en-AU"
            },
            {
                name: "UK",
                code: "en-GB",
                default: true
            },
            {
                name: "US",
                code: "en-US"
            }
        ]
    },
    {
        name: "Spanish",
        code: "es"
    },
    {
        name: "Italian",
        code: "it"
    },
    {
        name: "Portuguese",
        code: "pt"
    },
    {
        name: "French",
        code: "fr"
    },
    {
        name: "German",
        code: "de"
    },
    {
        name: "Russian",
        code: "ru"
    },
    {
        name: "Hebrew",
        code: "he"
    },
    {
        name: "Dutch",
        code: "nl"
    },
    {
        name: "Georgian",
        code: "ge"
    }
];

@Component({
    selector: "demo-page-localization",
    templateUrl: "./localization.page.html"
})
export class LocalizationPage {
    public localizationCode:string = `
import {SuiLocalizationService} from "ng2-semantic-ui";
// We'll use Spanish for this example.
import es from "ng2-semantic-ui/locales/es";

@Component({
    selector: "app-root",
    ...
})
export class AppComponent {
    constructor(public localizationService:SuiLocalizationService) {
        // Load the Spanish translations into the Localization Service.
        localizationService.load("es", es);
        // Set the current language to Spanish.
        localizationService.setLanguage("es");
    }
}
`;

    public customizationCode:string = `
import {SuiLocalizationService} from "ng2-semantic-ui";
// This example uses French.
import fr from "ng2-semantic-ui/locales/fr";

@Component({
    selector: "app-root",
    ...
})
export class AppComponent {
    constructor(public localizationService:SuiLocalizationService) {
        // Start by choosing a "fallback" language,
        // i.e. which language to use if you don't provide a certain value.
        localizationService.load("fr", fr);

        // Next, modify the "fallback" language with your custom values:
        localizationService.patch("fr", {
            search: {
                placeholder: "Custom!"
            }
        });

        // Finally, update the current language:
        localizationService.setLanguage("fr");
    }
}
`;

    public valuesInterface:string = `
interface ILocaleValues {
    datepicker: {
        months:string[], // Full month names
        monthsShort:string[], // Short month names (3 letters)
        weekdays:string[], // Full day names
        weekdaysShort:string[], // Short day names (3 letters)
        weekdaysNarrow:string[], // Narrow day names (1/2 letters)
        timesOfDay:string[]; // Full time of day names (2 values only)
        timesOfDayUppercase:string[]; // Short uppercase time of day names (2 values only)
        timesOfDayLowercase:string[]; // Short lowercase time of day names (2 values only)
        formats: {
            time:string, // Date display format for 'time' mode
            datetime:string, // Display format for 'datetime' mode
            date:string, // etc.
            month:string,
            year:string
        },
        firstDayOfWeek:number // First day of the week, [0..6], 0 is Sunday, 6 is Saturday
    },
    search: {
        placeholder:string, // Default placeholder for search input
        noResults: { // Message shown when there are no search results
            header:string,
            message:string
        }
    },
    select: {
        noResultsMessage:string, // Shown when there are no search results
        single: { // Specific options for single-select
            placeholder:string // Default placeholder
        },
        multi: { // Specific options for multi-select
            placeholder:string, // Default placeholder
            maxSelectedMessage:string // Shown when max options selected (use #{max} to display value)
        }
    }
}
`;

    public exampleTemplate:string = exampleTemplate;
    public supportedLanguages:ISupportedLanguage[] = supportedLanguages;
}

@Component({
    selector: "example-localization",
    template: exampleTemplate
})
export class LocalizationExample implements OnDestroy {
    public languages:ISupportedLanguage[];

    public get language():string {
        return this.localizationService.language;
    }

    public set language(language:string) {
        this.localizationService.setLanguage(language);
    }

    constructor(public localizationService:SuiLocalizationService) {
        this.languages = [];

        supportedLanguages.forEach(l => {
            if (l.children) {
                l.children.forEach(c => {
                    this.languages.push({
                        name: `${l.name} (${c.name})`,
                        code: `${c.code}`
                    });
                });
                return;
            }
            this.languages.push(l);
        });

        this.localizationService.setLanguage("en-GB");

        Object.keys(locales).forEach(k => this.localizationService.load(k, locales[k]));
    }

    public ngOnDestroy():void {
        this.localizationService.setLanguage("en-GB");
    }
}

export const LocalizationPageComponents = [LocalizationPage, LocalizationExample];
