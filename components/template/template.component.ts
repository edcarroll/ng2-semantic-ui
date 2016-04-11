import {Component, HostBinding, Input, ViewContainerRef, EmbeddedViewRef, DynamicComponentLoader, ViewContainerRef, ElementRef} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {TemplateDirective} from './template.directive';
import {templateStore} from './template-store.service'

@Component({
    selector: 'sui-template',
    template: '',
    styles: [`:host.local { display: none; }`]
})
export class TemplateComponent {
    private _elementRef:ElementRef;
    private _viewContainer:ViewContainerRef;
    private _dynamicComponentLoader:DynamicComponentLoader;
    private _http:Http;

    @HostBinding('class.local')
    private _local:boolean = true;

    private _view:EmbeddedViewRef;
    private _context:any;

    constructor(el:ElementRef, vc:ViewContainerRef, dcl:DynamicComponentLoader, http: Http) {
        this._elementRef = el;
        this._viewContainer = vc;
        this._dynamicComponentLoader = dcl;
        this._http = http;
    }

    @Input()
    public set context(bindable:Object) {
        this._context = bindable;
    }

    @Input()
    public set id(id:string) {
        if (id) {
            this._local = true;
            this._view = this._viewContainer.createEmbeddedView(templateStore.retrieveTemplate(id));

            for (var key in this._context) {
                //noinspection JSUnfilteredForInLoop
                this._view.setLocal(key, this._context[key]);
            }
        }
    }

    @Input()
    public set url(url:string) {
        if (url) {
            this._local = false;
            this._http.get(url)
                .map((res:Response) => res.text())
                .subscribe(
                    template => {
                        this._dynamicComponentLoader.loadNextToLocation(TemplateComponent.generateComponent(template, url, this._context), this._elementRef);
                        setTimeout(() => {
                            this.id = url;
                        });
                    },
                    err => {
                        throw err
                    }
                );
        }
    }

    private static generateComponent(template:string, url:string, context:any) {
        var contextString = "";
        for (var key in context) {
            //noinspection JSUnfilteredForInLoop
            contextString += `#${key}="${key}" `;
        }

        @Component({
            selector: 'sui-template-generated',
            template: `<template suiTemplate="${url}" ${contextString}>${template}</template>`,
            directives: [TemplateDirective],
            styles: [':host { display: none }']
        })
        class GeneratedTemplateComponent { }
        return GeneratedTemplateComponent;
    }

}