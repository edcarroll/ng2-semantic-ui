import { Component } from '@angular/core';
import {SuiTransition} from "../../../../../components/transition/transition";
import {TransitionController, Transition} from '../../../../../components/transition/transition';

@Component({
  selector: 'demo-page-test',
  templateUrl: './test.page.html'
})
export class TestPage {
    public transition:TransitionController;

    constructor() {
        this.transition = new TransitionController(false);
    }

    public animate() {
        this.transition.animate(new Transition("fade in", 1000));
    }

    public stop() {
        this.transition.stop();
    }

    public stopAll() {
        this.transition.stopAll();
    }    
}
