export interface ISearchTailoredLocaleValues {
    placeholder:string;
}

export interface ISelectLocaleValues {
    noResultsMessage:string;
    single:ISearchTailoredLocaleValues;
    multi:ISearchTailoredLocaleValues & {
        maxSelectedMessage:string; // `max` variable passed
        selectedMessage:string; // `count` variable passed
    };
}
