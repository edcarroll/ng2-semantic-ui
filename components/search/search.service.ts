import {SuiDropdownService} from "../dropdown/dropdown.service";
import {EventEmitter} from "@angular/core";

export class SuiSearchService {
    public dropdown:SuiDropdownService = new SuiDropdownService();

    public searchDelay:number = 200;
    public optionsField:string;
    public loading:boolean = false;

    public selectedOptionChange:EventEmitter<any> = new EventEmitter(false);
    public onItemSelected:EventEmitter<any> = new EventEmitter(false);

    public selectedOption:any;
    private _options:any[] = [];
    private _optionsLookup:((query:string) => Promise<any>);

    private _allowEmptyQuery:boolean = false;
    private _query:string = "";
    private _queryTimer:any;

    private _results:Array<any> = [];
    private _resultsCache:any = {};

    public get options():any {
        return this._options;
    }

    public set options(value:any) {
        if (typeof(value) == "function") {
            this._optionsLookup = <((query:string) => Promise<any>)>value;
            return;
        }
        this._options = <Array<any>> value;
    }

    public get query():string {
        return this._query;
    }

    public set query(value:string) {
        this._query = value;
        clearTimeout(this._queryTimer);
        if (value || this._allowEmptyQuery) {
            this._queryTimer = setTimeout(() => {
                this.search(() => {
                    this.dropdown.isOpen = true;
                });
            }, this.searchDelay);
            return;
        }
        if (!this._allowEmptyQuery) {
            this.dropdown.isOpen = false;
        }
    }

    public get results() {
        return this._results;
    }

    public search(callback?:Function):void {
        this.loading = true;
        if (this._optionsLookup) {
            if (this._resultsCache[this._query]) {
                this._results = this._resultsCache[this._query];
                this.loading = false;
                if (callback) {
                    callback();
                }
                return;
            }

            this._optionsLookup(this._query).then((results:Array<any>) => {
                this._resultsCache[this._query] = results;
                this.search(callback);
            });
            return;
        }
        this._results = this.options.filter((o:string) => this.readValue(o).toString().slice(0, this.query.length).toLowerCase() == this.query.toLowerCase());
        this.loading = false;
        if (callback) {
            callback();
        }
    }

    public select(result:any):void {
        this.selectedOption = result;
        this.selectedOptionChange.emit(result);
        this.onItemSelected.emit(result);
        this._query = this.readValue(result);
        this.dropdown.isOpen = false;
    }

    //noinspection JSMethodCanBeStatic
    protected deepValue(object:any, path:string) {
        if (!object) { return; }
        if (!path) { return object; }
        for (var i = 0, p = path.split('.'), len = p.length; i < len; i++){
            object = object[p[i]];
        }
        return object;
    }

    public readValue(object:any) {
        return this.deepValue(object, this.optionsField);
    }
}
