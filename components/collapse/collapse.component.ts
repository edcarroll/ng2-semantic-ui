import {Directive, OnInit, ElementRef, Input, HostBinding, Renderer} from '@angular/core';
// import {AnimationBuilder} from '@angular/core/src/animate/animation_builder';

@Directive({
    selector: '[suiCollapse]'
})
export class Collapse implements OnInit {
    private animation:any;

    // @HostBinding('style.display')
    private display:string = "none";
    // shown
    @HostBinding('class.expanded')
    private isExpanded:boolean = true;
    // hidden
    @HostBinding('class.collapsed')
    private isCollapsed:boolean = false;
    // animation state
    @HostBinding('class.collapsing')
    private isCollapsing:boolean = false;

    @Input() private transitionDuration:number = 300;

    @Input()
    private set suiCollapse(value:boolean) {
        this.isExpanded = value;
        this.isCollapsed = !this.isExpanded;
        this.toggle();
    }

    private get suiCollapse():boolean {
        return this.isExpanded;
    }

    // private _ab:AnimationBuilder;
    private _el:ElementRef;
    private _renderer:Renderer;

    public constructor(/*_ab:AnimationBuilder,*/ _el:ElementRef, _renderer: Renderer) {
        // this._ab = _ab;
        this._el = _el;
        this._renderer = _renderer;
    }

    public ngOnInit():void {
        // this.animation = this._ab.css();
        // this.animation.setDuration(this.transitionDuration);
    }

    public toggle():void {
        if (this.isExpanded) {
            this.hide();
        } else {
            this.show();
        }
    }

    public hide():void {
        this.isCollapsing = true;

        this.isExpanded = false;

        this._renderer.setElementStyle(this._el.nativeElement, 'overflow', 'hidden');
        this._renderer.setElementStyle(this._el.nativeElement, 'height', '0');

        this.isCollapsing = false;
        this.isCollapsed = true;

        // setTimeout(() => {
        //     // this.height = '0';
        //     // this.isCollapse = true;
        //     // this.isCollapsing = false;
        //     this.animation
        //         .setFromStyles({
        //             height: this._el.nativeElement.scrollHeight + 'px',
        //             //This is to fix the border issue
        //             padding: "0 1px 0 1px",
        //             margin: "0 -1px 0 -1px"
        //         })
        //         .setToStyles({
        //             height: '0',
        //             overflow: 'hidden'
        //         });
        //
        //     this.animation.start(this._el.nativeElement)
        //         .onComplete(() => {
        //             if (this._el.nativeElement.offsetHeight === 0) {
        //                 this.display = 'none';
        //             }
        //
        //             this.isCollapsing = false;
        //             this.isCollapsed = true;
        //         });
        // }, 4);
    }

    public show():void {
        this.isCollapsing = true;

        this.isCollapsed = false;

        this.display = '';

        this._renderer.setElementStyle(this._el.nativeElement, 'overflow', 'visible');
        this._renderer.setElementStyle(this._el.nativeElement, 'height', 'auto');

        this.isCollapsing = false;
        this.isExpanded = true;

        // setTimeout(() => {
        //     // this.height = 'auto';
        //     // this.isCollapse = true;
        //     // this.isCollapsing = false;
        //     this.animation
        //         .setFromStyles({
        //             height: this._el.nativeElement.offsetHeight,
        //             overflow: 'hidden'
        //         })
        //         .setToStyles({
        //             height: this._el.nativeElement.scrollHeight + 'px',
        //             //This is to fix the border issue
        //             padding: "0 1px 0 1px",
        //             margin: "0 -1px 0 -1px"
        //         });
        //
        //     this.animation.start(this._el.nativeElement)
        //         .onComplete(() => {
        //             this.isCollapsing = false;
        //             this.isExpanded = true;
        //         });
        // }, 4);
    }
}
