import { Component, OnInit } from '@angular/core';
import {ApiDefinition} from "../../components/api/api.component";

const exampleStandardTemplate = `
<div class="ui segments">
  <div class="ui segment">
    <sui-pagination [collectionSize]="100" [pageSize]="10" [showNavigation]="showNavigation" [showBoundary]="showBoundary"
      (pageChanged)="onPageChanged($event)"></sui-pagination>
    <p>Current page: {{ selectedPage }}</p>
  </div>
  <div class="ui segment">
    <button class="ui primary button" (click)="showNavigation = !showNavigation">
      Toggle Navigation
    </button>
    <button class="ui primary button" (click)="showBoundary = !showBoundary">
      Toggle Boundary
    </button>
  </div>
</div>
`;

const exampleMaxSizeTemplate = `
<div class="ui segments">
  <div class="ui segment">
    <sui-pagination [collectionSize]="100" [pageSize]="10" [maxSize]="5" [showBoundary]="showBoundary"
      (pageChanged)="onPageChanged($event)"></sui-pagination>
    <p>Current page: {{ selectedPage }}</p>
  </div>
  <div class="ui segment">
    <button class="ui primary button" (click)="showBoundary = !showBoundary">
      Toggle Boundary
    </button>
  </div>
</div>
`;

@Component({
  selector: 'demo-page-pagination',
  templateUrl: './pagination.page.html'
})
export class PaginationPage implements OnInit {
  public api:ApiDefinition = [
    {
      selector: "<sui-pagination>",
      properties: [
        {
          name: "collectionSize",
          type: "number",
          description: "The number of items in the collection",
          defaultValue: "100",
          required: true
        },
        {
          name: "maxSize",
          type: "number",
          description: "The maximum number of items shown",
          defaultValue: "0"
        },
        {
          name: "pageSize",
          type: "number",
          description: "The number of items in each page",
          defaultValue: "10",
          required: true
        },
        {
          name: "showNavigation",
          type: "boolean",
          description: "Show/Hide te prev/next items. Automatically set to true is maxSize < pageCount",
          defaultValue: "false"
        }
      ],
      events: [
        {
          name: "pageChanged",
          type: "number",
          description: "Event fired when the current page changes"
        }
      ]
    }
  ]

  public exampleStandardTemplate = exampleStandardTemplate;
  public exampleMaxSizeTemplate = exampleMaxSizeTemplate;

  constructor() { }

  ngOnInit() { }
}


@Component({
  selector: 'pagination-example-standard',
  template: exampleStandardTemplate
})
export class PaginationExampleStandard implements OnInit {

  public selectedPage:number;
  public showNavigation:boolean;
  public showBoundary:boolean;

  constructor() { }

  ngOnInit() { 
    this.showNavigation = false;
    this.showBoundary = false;
  }

  onPageChanged($event:number) {
    this.selectedPage = $event;
  }
}

@Component({
  selector: 'pagination-example-maxsize',
  template: exampleMaxSizeTemplate
})
export class PaginationExampleMaxSize implements OnInit {

  public selectedPage:number;
  public showBoundary:boolean;

  constructor() { }

  ngOnInit() { 
    this.showBoundary = false;
  }

  onPageChanged($event:number) {
    this.selectedPage = $event;
  }
}


export const PaginationPageComponents = [PaginationPage, PaginationExampleStandard, PaginationExampleMaxSize]