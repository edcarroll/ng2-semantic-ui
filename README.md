# ng2-semantic-ui
[![npm version](https://img.shields.io/npm/v/ng2-semantic-ui.svg "NPM Version")](https://www.npmjs.com/package/ng2-semantic-ui)
[![gitter](https://img.shields.io/gitter/room/ng2-semantic-ui/Lobby.js.svg "Join discussion on Gitter")](https://gitter.im/ng2-semantic-ui/Lobby)

Semantic UI Angular 2 Integrations, written in pure Angular - **no JQuery required**.

## Demo & Usage

[ng2-semantic-ui](https://edcarroll.github.io/ng2-semantic-ui/)

## Installation

To install this library, run:
```bash
$ npm install ng2-semantic-ui --save
```

Next include the Semantic UI CSS file in your `index.html` (you can include a manually compiled one if you use themes):
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.4/semantic.min.css">
```

Once installed you need to import the main module:
```ts
import {SuiModule} from 'ng2-semantic-ui';
```

Finally import the main module into your application module:
```ts
import {SuiModule} from 'ng2-semantic-ui';

@NgModule({
    declarations: [AppComponent, ...],
    imports: [SuiModule, ...],  
    bootstrap: [AppComponent]
})
export class AppModule {}
```

N.B. you can import individual component modules:
```ts
import {SuiCheckboxModule, SuiRatingModule} from 'ng2-semantic-ui';
```

### SystemJS

If you're using SystemJS, add the following to your `systemjs.config.js` file:

```js
var config = {
    ...
    map: {
        ...
        'ng2-semantic-ui': 'npm:ng2-semantic-ui/bundles/ng2-semantic-ui.umd.min.js'
    }
}
```

Now you're good to go!

## Dependencies

* [Angular](https://angular.io) (^4.0.0)
* [Semantic UI CSS](http://semantic-ui.com/) (jQuery is **not** required)

## Components

The current list of available components with links to their docs is below:

* [Accordion](https://edcarroll.github.io/ng2-semantic-ui/#/components/accordion)
* [Checkbox](https://edcarroll.github.io/ng2-semantic-ui/#/components/checkbox)
* [Collapse](https://edcarroll.github.io/ng2-semantic-ui/#/components/collapse)
* [Dimmer](https://edcarroll.github.io/ng2-semantic-ui/#/components/dimmer)
* [Dropdown](https://edcarroll.github.io/ng2-semantic-ui/#/components/dropdown)
* [Message](https://edcarroll.github.io/ng2-semantic-ui/#/components/message)
* [Popup](https://edcarroll.github.io/ng2-semantic-ui/#/components/popup)
* [Progress](https://edcarroll.github.io/ng2-semantic-ui/#/components/progress)
* [Rating](https://edcarroll.github.io/ng2-semantic-ui/#/components/rating)
* [Search](https://edcarroll.github.io/ng2-semantic-ui/#/components/search)
* [Select](https://edcarroll.github.io/ng2-semantic-ui/#/components/select)
* [Sidebar](https://edcarroll.github.io/ng2-semantic-ui/#/components/sidebar)
* [Tabs](https://edcarroll.github.io/ng2-semantic-ui/#/components/tabs)
* [Transition](https://edcarroll.github.io/ng2-semantic-ui/#/components/transition)

## Development

To generate all library `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run compile
# use compile:w to watch for changes
```

To run the demo app (you must have [Angular-CLI](https://github.com/angular/angular-cli) installed):
```bash
$ ng serve
```

## License

MIT © [Edward Carroll](https://github.com/edcarroll)
