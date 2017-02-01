import {Directive, Input, HostBinding, EventEmitter, Output, AfterContentInit, ContentChild, Renderer, ElementRef, HostListener, QueryList, ContentChildren, forwardRef} from '@angular/core';
import {SuiTransition, TransitionController, Transition} from '../transition/transition';

export class NewDropdownService {
    public isOpen:boolean;
    public isOpenChange:EventEmitter<boolean>;

    constructor() {
        this.isOpen = false;
        this.isOpenChange = new EventEmitter<boolean>();
    }

    public setOpenState(isOpen:boolean) {
        this.isOpen = isOpen;
        this.isOpenChange.emit(isOpen);
    }

    public toggleOpenState() {
        this.setOpenState(!this.isOpen);
    }
}

@Directive({
    selector: '[newSuiDropdownMenu]'
})
export class NewSuiDropdownMenu extends SuiTransition {
    private _service:NewDropdownService;
    private _transitionController:TransitionController;

    public set service(value:NewDropdownService) {
        this._service = value;

        this._service.isOpenChange.subscribe(isOpen => {
            this._transitionController.stopAll();
            this._transitionController.animate(new Transition("slide down", 200));
        });
    }

    constructor(public renderer:Renderer, public element:ElementRef) {
        super(renderer, element);

        this._transitionController = new TransitionController(false);
        this.setTransitionController(this._transitionController);       
    }

    @HostListener("click", ['$event'])
    public onClick(e:MouseEvent) {
        e.stopPropagation();

        // We have selected a dropdown item
    }
}

@Directive({
    selector: '[newSuiDropdown]'
})
export class NewSuiDropdown implements AfterContentInit {
    private _service:NewDropdownService;

    @ContentChild(NewSuiDropdownMenu)
    private _menu:NewSuiDropdownMenu;


    @ContentChildren(forwardRef(() => NewSuiDropdown), { descendants: true })
    private _children:QueryList<NewSuiDropdown>;

    public get children() {
        if (!this._children) {
            return [];
        }

        return this._children.filter(c => c !== this);
    }

    public isNested:boolean;

    @Output()
    public get isOpenChange() {
        return this._service.isOpenChange;
    }

    @HostBinding('class.active')
    public get isActive() {
        return this._service.isOpen && !this.isNested;
    }

    @Input()
    public get isOpen() {
        return this._service.isOpen;
    }

    public set isOpen(value:boolean) {
        this._service.setOpenState(value);
    }

    constructor() {
        this._service = new NewDropdownService();

        this.isNested = false;
    }

    public ngAfterContentInit() {
        if (!this._menu) {
            throw new Error("You must set [suiDropdownMenu] on the menu element.");
        }
        this._menu.service = this._service;

        this.children.forEach(c => c.isNested = true);
    }

    @HostListener("click", ['$event'])
    public onClick(e:MouseEvent) {
        e.stopPropagation();

        this._service.toggleOpenState();
    }
}