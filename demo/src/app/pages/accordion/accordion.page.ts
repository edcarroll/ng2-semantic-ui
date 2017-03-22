import { Component } from '@angular/core';

@Component({
  selector: 'demo-page-accordion',
  templateUrl: './accordion.page.html'
})
export class AccordionPage {
    public api = [
        {
            selector: '<sui-accordion>',
            properties: [
                {
                    name: "closeOthers",
                    description: "Limits the number of open panels to 1 when <code>true</code>.",
                    defaultValue: "true"
                },
                {
                    name: "transitionDuration",
                    description: "Duration for the accordion animations.",
                    defaultValue: "350"
                }
            ]
        },
        {
            selector: '<sui-accordion-panel>',
            properties: [
                {
                    name: "isOpen",
                    description: "Sets whether or not the panel is open.",
                    defaultValue: "false"
                },
                {
                    name: "isDisabled",
                    description: "Sets whether or not the panel is disabled (locks current state).",
                    defaultValue: "false"
                }
            ],
            events: [
                {
                    name: "isOpenChange",
                    description: "Fires whenever the panel is toggled. <code>[(isOpen)]</code> syntax is supported."
                }
            ]
        }
    ];
    public exampleStandardTemplate:string = `
<sui-accordion [closeOthers]="false">
    <sui-accordion-panel [isOpen]="true">
        <div title>
            <i class="dropdown icon"></i>
            Intially Expanded Panel
        </div>
        <div content>
            <p>Using <code>[isOpen]</code> sets the panel to be expanded. Use <code>(isOpenChange)</code> to catch when the panel is toggled.</p>
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
    public exampleStyledTemplate:string = `
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
}

@Component({
    selector: 'accordion-example-standard',
    template: new AccordionPage().exampleStandardTemplate
})
export class AccordionExampleStandard { }

@Component({
    selector: 'accordion-example-styled',
    template: new AccordionPage().exampleStyledTemplate
})
export class AccordionExampleStyled { }

export const AccordionPageComponents = [AccordionPage, AccordionExampleStandard, AccordionExampleStyled];

