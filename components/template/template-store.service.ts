import {TemplateRef} from 'angular2/core';

export class TemplateStore {
    private templates:any = {};

    public storeTemplate(id:string, template:TemplateRef) {
        this.templates[id] = template;
    }

    public retrieveTemplate(id:string):TemplateRef {
        return this.templates[id];
    }
}

export var templateStore = new TemplateStore();