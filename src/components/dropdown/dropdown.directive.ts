import {
    Directive, OnInit, OnDestroy, Input, Output, HostBinding, EventEmitter,
    ElementRef, HostListener
} from 'angular2/core';
import {DropdownService, NONINPUT} from './dropdown.service';

@Directive({selector: '[dropdown]'})
export class Dropdown implements OnInit, OnDestroy {
    @HostBinding('class.visible')
    @Input()
    public get isOpen():boolean {
        return this._isOpen;
    }

    @Input() public autoClose:string;
    @Input() public keyboardNav:boolean;
    // enum string: ['always', 'outsideClick', 'disabled']
    @Input() public appendToBody:boolean;

    @Output() public onToggle:EventEmitter<boolean> = new EventEmitter(false);
    @Output() public isOpenChange:EventEmitter<boolean> = new EventEmitter(false);
    // @HostBinding('class.dropdown') public addClass:boolean = true;

    // index of selected element
    public selectedOption:number;
    // drop menu html
    public menuEl:ElementRef;
    public el:ElementRef;
    private _isOpen:boolean;

    private _dropdownService:DropdownService = new DropdownService();

    public constructor(el:ElementRef) {
        // @Query('dropdownMenu', {descendants: false})
        // dropdownMenuList:QueryList<ElementRef>) {
        this.el = el;
        // todo: bind to route change event
    }

    public set isOpen(value:boolean) {
        this._isOpen = !!value;

        // todo: implement after porting position
        if (this.appendToBody && this.menuEl) {

        }

        // todo: $animate open<->close transitions, as soon as ng2Animate will be
        // ready
        if (this.isOpen) {
            this.focusToggleElement();
            this._dropdownService.open(this);
        } else {
            this._dropdownService.close(this);
            this.selectedOption = void 0;
        }

        this.onToggle.emit(this.isOpen);
        this.isOpenChange.emit(this.isOpen);
        // todo: implement call to setIsOpen if set and function
    }

    public ngOnInit():void {
        this.autoClose = this.autoClose || NONINPUT;
        if (this.isOpen) {
            // todo: watch for event get-isOpen?
        }
    }

    public ngOnDestroy():void {
        if (this.appendToBody && this.menuEl) {
            this.menuEl.nativeElement.remove();
        }
    }

    public set dropDownMenu(dropdownMenu:{el:ElementRef}) {
        // init drop down menu
        this.menuEl = dropdownMenu.el;

        if (this.appendToBody) {
            window.document.body.appendChild(this.menuEl.nativeElement);
        }
    }

    public toggle(open?:boolean):boolean {
        return this.isOpen = arguments.length ? !!open : !this.isOpen;
    }

    public focusDropdownEntry(keyCode:number):void {
        // If append to body is used.
        let hostEl = this.menuEl ?
            this.menuEl.nativeElement :
            this.el.nativeElement.getElementsByTagName('ul')[0];

        if (!hostEl) {
            // todo: throw exception?
            return;
        }

        let elems = hostEl.getElementsByTagName('a');
        if (!elems || !elems.length) {
            // todo: throw exception?
            return;
        }

        // todo: use parseInt to detect isNumber?
        // todo: or implement selectedOption as a get\set pair with parseInt on set
        switch (keyCode) {
            case (40):
                if (typeof this.selectedOption !== 'number') {
                    this.selectedOption = 0;
                    break;
                }

                if (this.selectedOption === elems.length - 1) {
                    break;
                }

                this.selectedOption++;
                break;
            case (38):
                if (typeof this.selectedOption !== 'number') {
                    return;
                }

                if (this.selectedOption === 0) {
                    // todo: return?
                    break;
                }

                this.selectedOption--;
                break;
            default:
                break;
        }

        elems[this.selectedOption].focus();
    }

    public focusToggleElement():void {
        this.el.nativeElement.focus();
    }

    @HostListener('click', ['$event'])
    public toggleDropdown(event:MouseEvent):boolean {
        event.stopPropagation();

        if (!this.menuEl.nativeElement.contains(event.target)) {
            this.toggle();
        }
        return false;
    }
}
