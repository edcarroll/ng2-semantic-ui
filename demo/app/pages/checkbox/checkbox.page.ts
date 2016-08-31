import { Component } from '@angular/core';

@Component({
  selector: 'demo-page-checkbox',
  templateUrl: 'checkbox.page.html',
  styleUrls: ['checkbox.page.css']
})
export class CheckboxPage {
    public api = [
        {
            selector: "<sui-checkbox>",
            properties: [
                {
                    name: "name",
                    description: "Sets the name on the internal <code>&lt;input&gt;</code> element."
                },
                {
                    name: "ngModel",
                    description: "Bind the checkbox value to the value of the provided variable."
                },
                {
                    name: "isDisabled",
                    description: " Sets whether or not the checkbox is disabled. (This only affects the UI, state can still be changed programatically)",
                    defaultValue: "false"
                },
                {
                    name: "isReadonly",
                    description: "Sets whether or not the checkbox is read-only. (UI only, as above)",
                    defaultValue: "false"
                }
            ],
            events: [
                {
                    name: "ngModelChange",
                    description: "Fires whenever the checkbox check is changed. <code>[(ngModel)]</code> syntax is supported."
                },
                {
                    name: "checkChange",
                    description: "Fires whenever the checkbox check is changed."
                }
            ]
        },
        {
            selector: "<sui-radio-button>",
            properties: [
                {
                    name: "name",
                    description: "Sets the name on the internal <code>&lt;input&gt;</code> component."
                },
                {
                    name: "value",
                    description: "Sets the value that selecting this radio button returns. Supports binding any object."
                },
                {
                    name: "ngModel",
                    description: "Bind the radio button value to the value of the provided variable.",
                    required: true
                },
                {
                    name: "isDisabled",
                    description: " Sets whether or not the radio button is disabled. (This only affects the UI, state can still be changed programatically)",
                    defaultValue: "false"
                },
                {
                    name: "isReadonly",
                    description: "Sets whether or not the radio button is read-only. (UI only, as above)",
                    defaultValue: "false"
                }
            ],
            events: [
                {
                    name: "ngModelChange",
                    description: "Fires whenever the radio button check is changed. <code>[(ngModel)]</code> syntax is supported."
                },
                {
                    name: "currentValueChange",
                    description: "Fires whenever the radio button check is changed."
                }
            ]
        }
    ];
    public exampleStandardTemplate:string = `
<div class="ui form">
    <div class="grouped fields">
        <label>Checkbox Example</label>
        <div class="field">
            <sui-checkbox [(ngModel)]="eCheck" [isDisabled]="eCheckDisabled" [isReadonly]="eCheckReadonly">
                An example checkbox
            </sui-checkbox>
        </div>
        <div class="field">
            <sui-checkbox [(ngModel)]="eCheckDisabled">1st checkbox disabled?</sui-checkbox>
        </div>
        <div class="field">
            <sui-checkbox [(ngModel)]="eCheckReadonly">1st checkbox read-only?</sui-checkbox>
        </div>
        <div class="field">
            <sui-checkbox [(ngModel)]="eCheck">Mirrors value of 1st checkbox</sui-checkbox>
        </div>
    </div>
</div>`;
    public exampleRadioButtonTemplate:string = `
<div class="ui form">
    <div class="grouped fields">
        <label>Radio Button Example</label>
        <div class="field">
            <sui-radio-button value="hello" [(ngModel)]="eRadio">Value: "hello"</sui-radio-button>
        </div>
        <div class="field">
            <sui-radio-button value="world" [(ngModel)]="eRadio">Value: "world"</sui-radio-button>
        </div>
        <div class="field">
            <sui-radio-button value="example" [(ngModel)]="eRadio">Value: "example"</sui-radio-button>
        </div>
        <div class="field">
            <sui-radio-button [value]="{ example: 'object' }" [(ngModel)]="eRadio">
                Value: {{ '{' }} example: "object" }
            </sui-radio-button>
        </div>
    </div>
</div>
<p>The currently selected value is {{ eRadio | json }}</p>
`;
    public exampleStyledTemplate:string = `
<div class="ui form">
    <div class="grouped fields">
        <label>Checkbox Style Examples</label>
        <div class="field">
            <sui-checkbox class="slider">Slider checkbox</sui-checkbox>
        </div>
        <div class="field">
            <sui-checkbox class="toggle">Toggle checkbox</sui-checkbox>
        </div>
    </div>
</div>
<div class="ui form">
    <div class="grouped fields">
        <label>Radio Button Style Examples</label>
        <div class="field">
            <sui-radio-button class="slider" value="a" [(ngModel)]="eStyledRadio">
                Slider radio button
            </sui-radio-button>
        </div>
        <div class="field">
            <sui-radio-button class="toggle" value="b" [(ngModel)]="eStyledRadio">
                Toggle radio button
            </sui-radio-button>
        </div>
    </div>
</div>`;
}

@Component({
    selector: 'checkbox-example-standard',
    template: new CheckboxPage().exampleStandardTemplate
})
export class CheckboxExampleStandard {
    public eCheck:boolean = true;
}

@Component({
    selector: 'checkbox-example-radio-button',
    template: new CheckboxPage().exampleRadioButtonTemplate
})
export class CheckboxExampleRadioButton {
    public eRadio:any = "world";
}

@Component({
    selector: 'checkbox-example-styled',
    template: new CheckboxPage().exampleStyledTemplate
})
export class CheckboxExampleStyled { }

export const CheckboxPageComponents:Array<any> = [CheckboxPage, CheckboxExampleStandard, CheckboxExampleRadioButton, CheckboxExampleStyled];
