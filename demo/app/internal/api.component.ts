import {Component, Input} from '@angular/core';

@Component({
    selector: 'api',
    directives: [],
    template: `
<div class="api-object" *ngFor="let object of api;">
    <h3 class="ui header">{{ object.selector }}</h3>
    <div class="ui segments">
        <div class="ui segment" *ngIf="object.properties">
            <h4 class="ui header">
                <i class="options icon"></i>
                <div class="content">Properties</div>
            </h4>
            <div class="ui list">
                <div class="item" *ngFor="let property of object.properties">
                    <div class="content">
                        <div class="header">
                            <code>{{ property.name }}</code>&nbsp;
                            <div class="ui teal tiny horizontal label" *ngIf="property.defaultValue" title="Default Value">{{ property.defaultValue }}</div>
                            <div class="ui red tiny horizontal label" *ngIf="property.required">required</div>
                        </div>
                        <div class="description" [innerHTML]="property.description"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui segment" *ngIf="object.events">
            <h4 class="ui header">
                <i class="lightning icon"></i>
                <div class="content">Events</div>
            </h4>
            <div class="ui list">
                <div class="item" *ngFor="let event of object.events">
                    <div class="content">
                        <div class="header">
                            <code>{{ event.name }}</code>
                        </div>
                        <div class="description" [innerHTML]="event.description"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui segment" *ngIf="!object.properties && !object.events">
            <h4 class="ui header">
                <i class="remove circle icon"></i>
                <div class="content">No Properties</div>
            </h4>
        </div>
    </div>    
</div>
`
})
export class Api {
    @Input() public api:any;
}