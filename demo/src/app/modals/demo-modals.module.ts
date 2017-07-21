import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiModalModule } from "ng2-semantic-ui";
import { AlertModalComponent } from "./alert.modal";
import { ConfirmModalComponent } from "./confirm.modal";

@NgModule({
    imports: [
        CommonModule,

        SuiModalModule
    ],
    declarations: [
        AlertModalComponent,
        ConfirmModalComponent
    ],
    exports: [
        AlertModalComponent,
        ConfirmModalComponent
    ],
    entryComponents: [
        AlertModalComponent,
        ConfirmModalComponent
    ]
})
export class DemoModalsModule {}
