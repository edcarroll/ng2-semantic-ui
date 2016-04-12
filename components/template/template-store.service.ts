import {TemplateRef} from 'angular2/core';

export class TemplateStore {
    private templates:any = {};

    private caching:any = {};
    private cachingUpdates:any = {};


    public storeTemplate(id:string, template:TemplateRef) {
        this.templates[id] = template;
        if (this.caching[id]) {
            this.cachingUpdates[id].forEach((callback:(available:boolean) => any) => callback(true));
            delete this.caching[id];
            delete this.cachingUpdates[id];
        }
    }

    public retrieveTemplate(id:string):TemplateRef {
        return this.templates[id];
    }

    public checkTemplateCached(id:string, callback:(available:boolean) => any):void {
        var cached = !!this.templates[id];
        if (!cached) {
            if (!this.caching[id]) {
                this.caching[id] = true;
                callback(false);
            }
            else {
                this.cachingUpdates[id] = this.cachingUpdates[id] || [];
                this.cachingUpdates[id].push(callback);
            }
            return;
        }
        callback(true);
    }
}

export var templateStore = new TemplateStore();