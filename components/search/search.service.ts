import {EventEmitter} from "@angular/core";

export class SuiSearchService {
    public searchDelay:number = 200;
    public optionsField:string;
    public loading:boolean = false;

    public onSearchCompleted:EventEmitter<any[]> = new EventEmitter<any[]>();

    private _options:any[] = [];
    private _optionsLookup:((query:string) => Promise<any>);

    public allowEmptyQuery:boolean = false;
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

    public updateQuery(value:string, search:boolean = true) {
        this._query = value;

        if (search) {
            if (this.searchDelay > 0) {
                clearTimeout(this._queryTimer);
                if (value || this.allowEmptyQuery) {
                    this._queryTimer = setTimeout(() => this.search(), this.searchDelay);
                    return;
                }
            }
            if (value || this.allowEmptyQuery) {
                this.search();
            }
        }
    }

    public get results() {
        return this._results;
    }

    public search():void {
        if (this._optionsLookup) {
            this.loading = true;
            if (this._resultsCache[this._query]) {
                this.loading = false;

                this._results = this._resultsCache[this._query];
                this.onSearchCompleted.emit(this.results);
                return;
            }

            this._optionsLookup(this._query).then((results:Array<any>) => {
                this.loading = false;

                this._resultsCache[this._query] = results;
                this._results = results;
                this.onSearchCompleted.emit(this.results);
            });
            return;
        }
        this._results = this.options.filter((o:string) => this.readValue(o).toString().slice(0, this.query.length).toLowerCase() == this.query.toLowerCase());
        this.onSearchCompleted.emit(this.results);
    }

    //noinspection JSMethodCanBeStatic
    public deepValue(object:any, path:string) {
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
