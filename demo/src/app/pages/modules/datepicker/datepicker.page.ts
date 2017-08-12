import { Component } from "@angular/core";
import { ApiDefinition } from "../../../components/api/api.component";
import { DatepickerMode } from "ng2-semantic-ui";

const exampleStandardTemplate = `
<div class="ui form">
    <div class="field">
        <label>Date</label>
        <div class="ui left icon input">
            <i class="calendar icon"></i>
            <input suiDatepicker
                   [(ngModel)]="date"
                   [pickerMode]="mode"
                   [pickerFirstDayOfWeek]="firstDayOfWeek"
                   [pickerUseNativeOnMobile]="false">
        </div>
    </div>
    <div class="field">
        <label>Datepicker Mode</label>
        <sui-select class="selection" [(ngModel)]="mode" [options]="datepickerModes" #modes>
            <sui-select-option *ngFor="let m of modes.availableOptions" [value]="m"></sui-select-option>
        </sui-select>
    </div>
    <div class="field">
        <label>First Day of the Week</label>
        <input type="number" [(ngModel)]="firstDayOfWeek" min="0" max="6">
    </div>
    <p>Selected Date: {{ date }}</p>
</div>
`;

const exampleButtonTemplate = `
<button class="ui button" suiDatepicker>Select Date</button>
`;

const exampleMinMaxTemplate = `
<div class="ui form">
    <div class="field">
        <label>Min Date</label>
        <div class="ui left icon input">
            <i class="calendar icon"></i>
            <input suiDatepicker [(ngModel)]="min" [pickerUseNativeOnMobile]="false">
        </div>
    </div>
    <div class="field">
        <label>Max Date</label>
        <div class="ui left icon input">
            <i class="calendar icon"></i>
            <input suiDatepicker [(ngModel)]="max" [pickerUseNativeOnMobile]="false">
        </div>
    </div>
    <div class="field">
        <label>Constrained Date</label>
        <div class="ui left icon input">
            <i class="calendar icon"></i>
            <input suiDatepicker
                   [pickerMinDate]="min"
                   [pickerMaxDate]="max"
                   [pickerUseNativeOnMobile]="false">
        </div>
    </div>
</div>
`;

const exampleMobileFallbackTemplate = `
<div class="ui fluid action input">
    <input placeholder="Select date..."
           suiDatepicker
           [(ngModel)]="date"
           [pickerUseNativeOnMobile]="true">

    <button class="ui primary icon button" (click)="today()">
      <i class="checked calendar icon"></i>
    </button>
    <button class="ui secondary icon button" (click)="unset()">
      <i class="remove icon"></i>
    </button>
</div>
`;

@Component({
    selector: "demo-page-datepicker",
    templateUrl: "./datepicker.page.html"
})
export class DatepickerPage {
    public api:ApiDefinition = [
        {
            selector: "[suiDatepicker]",
            properties: [
                {
                    name: "pickerMode",
                    type: "DatepickerMode",
                    description: "Specifies the mode for the datepicker. Options are: <code>datetime</code>, " +
                                 "<code>date</code>, <code>time</code>, <code>month</code> & <code>year</code>.",
                    defaultValue: "datetime"
                },
                {
                    name: "pickerInitialDate",
                    type: "Date",
                    description: "Sets the intial date to display when no date is selected.",
                    defaultValue: "new Date()"
                },
                {
                    name: "pickerMaxDate",
                    type: "Date",
                    description: "Sets the maximum date that can be selected by the datepicker."
                },
                {
                    name: "pickerMinDate",
                    type: "Date",
                    description: "Sets the minimum date that can be selected by the datepicker."
                },
                {
                    name: "pickerFirstDayOfWeek",
                    type: "number",
                    description: "Sets the first day of the week when displaying dates in a month. " +
                                 "Can be from <code>0</code> (Sunday) to <code>6</code> (Saturday).",
                    defaultValue: "0"
                },
                {
                    name: "pickerPlacement",
                    type: "PopupPlacement",
                    description: "Sets the placement of the datepicker.",
                    defaultValue: "bottom left"
                },
                {
                    name: "pickerTransition",
                    type: "string",
                    description: "Sets the transition used when displaying the datepicker.",
                    defaultValue: "scale"
                },
                {
                    name: "pickerTransitionDuration",
                    type: "number",
                    description: "Sets the duration for the datepicker transition.",
                    defaultValue: "200"
                },
                {
                    name: "pickerLocaleOverrides",
                    type: "Partial<IDatepickerLocaleValues>",
                    description: "Overrides the values from the localization service."
                },
                {
                    name: "ngModel",
                    type: "Date",
                    description: "Bind the selected date to the value of the provided variable."
                }
            ],
            events: [
                {
                    name: "pickerSelectedDateChange",
                    type: "Date",
                    description: "Fires whenever the selected date is changed. The selected date is passed as <code>$event</code>."
                },
                {
                    name: "ngModelChange",
                    type: "Date",
                    description: "Fires whenever the selected date is changed. <code>[(ngModel)]</code> syntax is supported."
                }
            ]
        },
        {
            selector: "input[suiDatepicker]",
            properties: [
                {
                    name: "pickerUseNativeOnMobile",
                    type: "boolean",
                    description: "Whether the datepicker should use the native HTML5 pickers when on a mobile device.",
                    defaultValue: "true"
                }
            ]
        }
    ];
    public exampleStandardTemplate:string = exampleStandardTemplate;
    public exampleButtonTemplate:string = exampleButtonTemplate;
    public exampleMinMaxTemplate:string = exampleMinMaxTemplate;
    public exampleMobileFallbackTemplate:string = exampleMobileFallbackTemplate;

    public cssInclude:string =
`<link rel="stylesheet" href="https://unpkg.com/semantic-ui-calendar/dist/calendar.min.css">`;
}

@Component({
    selector: "example-datepicker-standard",
    template: exampleStandardTemplate
})
export class DatepickerExampleStandard {
    public firstDayOfWeek:number = 1;

    public datepickerModes:string[] = ["datetime", "date", "time", "month", "year"];
    public mode:DatepickerMode = DatepickerMode.Datetime;
    public date:Date;
}

@Component({
    selector: "example-datepicker-button",
    template: exampleButtonTemplate
})
export class DatepickerExampleButton {}

@Component({
    selector: "example-datepicker-min-max",
    template: exampleMinMaxTemplate
})
export class DatepickerExampleMinMax {
    public min:Date;
    public max:Date;

    constructor() {
        const today = new Date();

        this.min = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() - 4);
        this.max = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate() + 4);
    }
}

@Component({
    selector: "example-datepicker-mobile-fallback",
    template: exampleMobileFallbackTemplate
})
export class DatepickerExampleMobileFallback {
    public date:Date = new Date();

    public unset():void {
        this.date = undefined;
    }

    public today():void {
        this.date = new Date();
    }
}

export const DatepickerPageComponents = [
    DatepickerPage,

    DatepickerExampleStandard,
    DatepickerExampleButton,
    DatepickerExampleMinMax,
    DatepickerExampleMobileFallback
];
