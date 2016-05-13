// Import all directives
import {ACCORDION_DIRECTIVES} from './components/accordion';
import {CHECKBOX_DIRECTIVES} from './components/checkbox';
import {COLLAPSE_DIRECTIVES} from './components/collapse';
import {DIMMER_DIRECTIVES} from './components/dimmer';
import {DROPDOWN_DIRECTIVES} from './components/dropdown';
import {PROGRESS_DIRECTIVES} from './components/progress';
import {MESSAGE_DIRECTIVES} from './components/message';
import {RATING_DIRECTIVES} from './components/rating';
import {SEARCH_DIRECTIVES} from './components/search';
import {SELECT_DIRECTIVES} from './components/select';
import {TAB_DIRECTIVES} from './components/tab';
// import {TEMPLATE_DIRECTIVES} from './components/template';

// Export all directives
export * from './components/accordion';
export * from './components/checkbox';
export * from './components/collapse';
export * from './components/dimmer';
export * from './components/dropdown';
export * from './components/progress';
export * from './components/message';
export * from './components/rating';
export * from './components/search';
export * from './components/select';
export * from './components/tab';
// export * from './components/template';

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
    SEARCH_DIRECTIVES,
    SELECT_DIRECTIVES,
    TAB_DIRECTIVES,
    // TEMPLATE_DIRECTIVES
];