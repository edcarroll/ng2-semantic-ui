# ng2-semantic-ui

Semantic UI Angular 2 Integrations, written in pure AngularJS - **no JQuery required**.

## Demo & Usage

[ng2-semantic-ui](http://edcarroll.github.io/ng2-semantic-ui/)

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
import {SuiModule} from 'ng2-semantic-ui/ng2-semantic-ui';
```

Finally import the main module into your application module:
```ts
import {SuiModule} from 'ng2-semantic-ui/ng2-semantic-ui';

@NgModule({
    declarations: [AppComponent, ...],
    imports: [SuiModule, ...],  
    bootstrap: [AppComponent]
})
export class AppModule {}
```

N.B. you can import individual component modules:
```ts
import {SuiCheckboxModule, SuiRatingModule} from 'ng2-semantic-ui/ng2-semantic-ui';
```

Now you're good to go!

## Dependencies

* [Angular 2](https://angular.io) (2.0.0-rc.5 **or higher**)
* [Semantic UI CSS](http://semantic-ui.com/) (jQuery is **not** required)

## Components

The current list of available components with links to their docs is below:

* [Accordion](http://edcarroll.github.io/ng2-semantic-ui/#/components/accordion)
* [Checkbox](http://edcarroll.github.io/ng2-semantic-ui/#/components/checkbox)
* [Collapse](http://edcarroll.github.io/ng2-semantic-ui/#/components/collapse)
* [Dimmer](http://edcarroll.github.io/ng2-semantic-ui/#/components/dimmer)
* [Dropdown](http://edcarroll.github.io/ng2-semantic-ui/#/components/dropdown)
* [Message](http://edcarroll.github.io/ng2-semantic-ui/#/components/message)
* [Progress](http://edcarroll.github.io/ng2-semantic-ui/#/components/progress)
* [Rating](http://edcarroll.github.io/ng2-semantic-ui/#/components/rating)
* [Search](http://edcarroll.github.io/ng2-semantic-ui/#/components/search)
* [Select](http://edcarroll.github.io/ng2-semantic-ui/#/components/select)
* [Tabs](http://edcarroll.github.io/ng2-semantic-ui/#/components/tabs)

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
