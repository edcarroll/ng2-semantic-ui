// Import all directives
import {ACCORDION_DIRECTIVES} from './components/accordion';
import {Collapse} from './components/collapse';
import {DROPDOWN_DIRECTIVES} from './components/dropdown';


// Export all directives
export * from './components/accordion';
export * from './components/collapse';
export * from './components/dropdown';

// Export convenience property
export const DIRECTIVES: any[] = [
    ACCORDION_DIRECTIVES,
    Collapse,
    DROPDOWN_DIRECTIVES
];
