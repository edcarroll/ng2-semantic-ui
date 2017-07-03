import { Component } from "@angular/core";
import { ApiDefinition } from "../../../components/api/api.component";

const exampleStandardTemplate = `
<sui-accordion [closeOthers]="false">
    <sui-accordion-panel [isOpen]="true">
        <div title>
            <i class="dropdown icon"></i>
            Intially Expanded Panel
        </div>
        <div content>
            <p>Using <code>[isOpen]</code> sets the panel to be expanded.</p>
            <p>Use <code>(isOpenChange)</code> to catch when the panel is toggled.</p>
            <p>Supports <code>[(isOpen)]</code> syntax.</p>
        </div>
    </sui-accordion-panel>
    <sui-accordion-panel [isDisabled]="true" [isOpen]="true">
        <div title>
            <i class="dropdown icon"></i>
            Disabled Panel
        </div>
        <div content>
            <p>Setting <code>[isDisabled]</code> to <code>true</code> stops the user from being able to toggle the panel.</p>
        </div>
    </sui-accordion-panel>
    <sui-accordion-panel>
        <div title>
            <i class="dropdown icon"></i>
            Final Panel
        </div>
        <div content>
            <p>This is the final panel.</p>
            <p>Opening this one doesn't affect the others as <code>[closeOthers]</code> is set to <code>false</code>.</p>
        </div>
    </sui-accordion-panel>
</sui-accordion>
`;

const exampleStyledTemplate = `
<sui-accordion class="styled fluid">
    <sui-accordion-panel [isOpen]="true">
        <div title>
            <i class="dropdown icon"></i>
            First Panel
        </div>
        <div content>
            <p>Add classes to the <code>sui-accordion</code> element to apply styles.</p>
        </div>
    </sui-accordion-panel>
    <sui-accordion-panel>
        <div title>
            <i class="dropdown icon"></i>
            Second Panel
        </div>
        <div content>
            <p>Second panel content.</p>
        </div>
    </sui-accordion-panel>
</sui-accordion>
`;

const exampleManualTemplate = `
<sui-accordion class="styled fluid">
    <sui-accordion-panel [(isOpen)]="panelOpen" [isDisabled]="true">
        <div title>
            <i class="dropdown icon" (click)="panelOpen = !panelOpen"></i>
            Manual Panel
        </div>
        <div content>
            <p>Content</p>
        </div>
    </sui-accordion-panel>
</sui-accordion>
`;

@Component({
    selector: "demo-page-accordion",
    templateUrl: "./accordion.page.html"
})
export class AccordionPage {
    public api:ApiDefinition = [
        {
            selector: "<sui-accordion>",
            properties: [
                {
                    name: "closeOthers",
                    type: "boolean",
                    description: "Limits the number of open panels to 1 when <code>true</code>.",
                    defaultValue: "true"
                },
                {
                    name: "transition",
                    type: "string",
                    description: "Sets the transition on the content of each panel. N.B. doesn't affect the collapse animation.",
                    defaultValue: "fade"
                },
                {
                    name: "transitionDuration",
                    type: "number",
                    description: "Duration for the accordion animations.",
                    defaultValue: "350"
                }
            ]
        },
        {
            selector: "<sui-accordion-panel>",
            properties: [
                {
                    name: "isOpen",
                    type: "boolean",
                    description: "Sets whether or not the panel is open.",
                    defaultValue: "false"
                },
                {
                    name: "isDisabled",
                    type: "boolean",
                    description: "Sets whether or not the panel is disabled (locks current state).",
                    defaultValue: "false"
                }
            ],
            events: [
                {
                    name: "isOpenChange",
                    type: "boolean",
                    description: "Fires whenever the panel is toggled. <code>[(isOpen)]</code> syntax is supported."
                }
            ]
        }
    ];
    public exampleStandardTemplate:string = exampleStandardTemplate;
    public exampleStyledTemplate:string = exampleStyledTemplate;
    public exampleManualTemplate:string = exampleManualTemplate;
}

@Component({
    selector: "example-accordion-standard",
    template: exampleStandardTemplate
})
export class AccordionExampleStandard {}

@Component({
    selector: "example-accordion-styled",
    template: exampleStyledTemplate
})
export class AccordionExampleStyled {}

@Component({
    selector: "example-accordion-manual",
    template: exampleManualTemplate
})
export class AccordionExampleManual {
    public panelOpen:boolean = false;
}

export const AccordionPageComponents = [AccordionPage, AccordionExampleStandard, AccordionExampleStyled, AccordionExampleManual];
