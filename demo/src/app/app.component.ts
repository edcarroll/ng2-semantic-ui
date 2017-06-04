import {Component, HostBinding} from '@angular/core';
import {SuiPopupConfig} from '../../../components/popup/popup.service';

@Component({
    selector: 'demo-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(popupConfig:SuiPopupConfig) {
        popupConfig.isInverted = true;
        popupConfig.delay = 300;
    }
}
