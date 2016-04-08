// Import all directives
import {ACCORDION_DIRECTIVES} from './components/accordion';
import {CHECKBOX_DIRECTIVES} from './components/checkbox';
import {COLLAPSE_DIRECTIVES} from './components/collapse';
import {DIMMER_DIRECTIVES} from './components/dimmer';
import {DROPDOWN_DIRECTIVES} from './components/dropdown';


// Export all directives
export * from './components/accordion';
export * from './components/checkbox';
export * from './components/collapse';
export * from './components/dimmer';
export * from './components/dropdown';

// Export convenience property
export const DIRECTIVES: any[] = [
    ACCORDION_DIRECTIVES,
    CHECKBOX_DIRECTIVES,
    COLLAPSE_DIRECTIVES,
    DIMMER_DIRECTIVES,
    DROPDOWN_DIRECTIVES
];
