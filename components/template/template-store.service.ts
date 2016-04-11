import {TemplateRef} from 'angular2/core';

class TemplateStore {
    private templates = {};

    public storeTemplate(id:string, template:TemplateRef) {
        this.templates[id] = template;
    }

    public retrieveTemplate(id:string):TemplateRef {
        return this.templates[id];
    }
}

export var templateStore = new TemplateStore();