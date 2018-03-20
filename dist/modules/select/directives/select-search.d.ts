import { EventEmitter, Renderer2, ElementRef } from "@angular/core";
export declare class SuiSelectSearch {
    private _renderer;
    private _element;
    private _searchClass;
    private _autoComplete;
    query: string;
    onQueryUpdated: EventEmitter<string>;
    onQueryKeyDown: EventEmitter<KeyboardEvent>;
    constructor(_renderer: Renderer2, _element: ElementRef);
    private updateQuery(query);
    private onKeyDown(e);
    focus(): void;
}
