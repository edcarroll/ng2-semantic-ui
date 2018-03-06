import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuiLoader } from './components/loader';

@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [
        SuiLoader
    ],
    exports: [
        SuiLoader
    ]
})
export class SuiLoadingElement {}
