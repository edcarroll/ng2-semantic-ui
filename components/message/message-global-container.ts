
import { Component, HostListener } from "@angular/core";
import { MessageController } from "./message-controller";
import { SuiMessageService } from "./message-service";
import { IDynamicClasslist } from "../util/interfaces";
import { getDocumentFontSize } from "../util/util";

export type MessagePosition = "top" | "top-left" | "top-right" |
                              "bottom" | "bottom-left" | "bottom-right";

export const MessagePosition = {
    Top: "top" as MessagePosition,
    TopLeft: "top-left" as MessagePosition,
    TopRight: "top-right" as MessagePosition,
    Bottom: "bottom" as MessagePosition,
    BottomLeft: "bottom-left" as MessagePosition,
    BottomRight: "bottom-right" as MessagePosition
};

@Component({
    selector: "sui-message-global-container",
    template: `
<div class="global container" [ngClass]="dynamicClasses" [style.width.px]="dynamicWidth">
    <sui-message-container [controller]="controller"></sui-message-container>
</div>
`,
    styles: [`
.global.container {
    display: block;
    position: fixed;
}

.global.container.top {
    top: 1rem;
}

.global.container.bottom {
    bottom: 1rem;
}

.global.container.left {
    left: 1rem;
}

.global.container.right {
    right: 1rem;
}

.global.container:not(.left):not(.right) {
    left: 1rem;
}
`]
})
export class SuiMessageGlobalContainer {
    public controller:MessageController;

    public position:MessagePosition;
    public width:number;

    public get dynamicClasses():IDynamicClasslist {
        const classes:IDynamicClasslist = {};

        this.position
            .split("-")
            .forEach(p => classes[p] = true);

        return classes;
    }

    public get dynamicWidth():number {
        const margin = getDocumentFontSize();
        let width = this.width;

        if (this.position === MessagePosition.Top ||
            this.position === MessagePosition.Bottom ||
            window.innerWidth < width + margin * 2) {

            width = window.innerWidth - margin * 2;
        }

        return width;
    }

    @HostListener("window:resize")
    public onDocumentResize():void {}
}
