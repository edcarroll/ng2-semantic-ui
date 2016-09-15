import { Component } from '@angular/core';
import {SuiTransition} from "../../../../components/transition/transition";

@Component({
  selector: 'demo-page-test',
  templateUrl: 'test.page.html',
  styleUrls: ['test.page.css']
})
export class TestPage {
    public test(transition:SuiTransition) {
        transition.animate({
            name: "scale",
            duration: 2000
        });
    }

    public test2(transition:SuiTransition) {
        transition.stop();
    }

    public test3(transition:SuiTransition) {
        transition.stopAll();
    }
}
