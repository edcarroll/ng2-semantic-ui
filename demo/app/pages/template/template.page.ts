import { Component } from '@angular/core';

@Component({
  selector: 'demo-page-template',
  templateUrl: 'template.page.html',
  styleUrls: ['template.page.css']
})
export class TemplatePage {
    public api = [
        {
            selector: "[suiCollapse]",
            properties: [
                {
                    name: "suiCollapse",
                    description: "Sets whether or not the element is collapsed."
                }
            ]
        }
    ]
}

@Component({
    selector: 'template-example-standard',
    template: `

`
})
export class TemplateExampleStandard {}

export const TEMPLATE_EXAMPLES:Array<any> = [TemplateExampleStandard];
