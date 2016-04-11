// Import all directives
import {ACCORDION_DIRECTIVES} from './components/accordion';
import {CHECKBOX_DIRECTIVES} from './components/checkbox';
import {COLLAPSE_DIRECTIVES} from './components/collapse';
import {DIMMER_DIRECTIVES} from './components/dimmer';
import {DROPDOWN_DIRECTIVES} from './components/dropdown';
import {PROGRESS_DIRECTIVES} from './components/progress';
import {MESSAGE_DIRECTIVES} from './components/message';
import {RATING_DIRECTIVES} from './components/rating';
import {TAB_DIRECTIVES} from './components/tab';

// Export all directives
export * from './components/accordion';
export * from './components/checkbox';
export * from './components/collapse';
export * from './components/dimmer';
export * from './components/dropdown';
export * from './components/progress';
export * from './components/message';
export * from './components/rating';
export * from './components/tab';

// Export convenience property
export const DIRECTIVES: any[] = [
    ACCORDION_DIRECTIVES,
    CHECKBOX_DIRECTIVES,
    COLLAPSE_DIRECTIVES,
    DIMMER_DIRECTIVES,
    DROPDOWN_DIRECTIVES,
    PROGRESS_DIRECTIVES,
    MESSAGE_DIRECTIVES,
    RATING_DIRECTIVES,
    TAB_DIRECTIVES
];