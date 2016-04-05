# ng2-semantic-ui

Semantic UI Angular 2 Integrations, written in pure AngularJS - **no JQuery required**. Some components have been adapted from [ng2-bootstrap](https://github.com/valor-software/ng2-bootstrap).

## Installation

To install this library, run:

```bash
$ npm install ng2-semantic-ui --save
```

Add a reference to your `index.html` file: (also ensure you have a reference to the Semantic UI CSS file)

```html
<script src="node_modules/ng2-semantic-ui/bundles/ng2-semantic-ui.min.js"></script>
```

Start using the directives:

```ts
import {DIRECTIVES} from `ng2-semantic-ui/ng2-semantic-ui';
```

## Quick start (from scratch)

Clone the [angular2-quickstart](https://github.com/valor-software/angular2-quickstart) repository, and set everything up.

Add the following lines to your `index.html`:
```html
<script src="node_modules/ng2-semantic-ui/bundles/ng2-semantic-ui.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/semantic.css">
```

Update your `app.component.ts` to be the following:

```ts
import {Component} from 'angular2/core';
import {DROPDOWN_DIRECTIVES} from 'ng2-semantic-ui/ng2-semantic-ui';

@Component({
  selector: 'my-app',
  directives: [DROPDOWN_DIRECTIVES],
  template: `
<div class="ui dropdown" dropdown>
    Dropdown
    <i class="dropdown icon"></i>
    <div class="menu" dropdownMenu>
        <div class="item">Choice 1</div>
        <div class="item">Choice 2</div>
    </div>
</div>
`
})
export class AppComponent {}
```

And you're good to go!

## Development

To generate all library `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To run the demo app:

```bash
$ npm run demo
```

To compile the demo app without running the app:

```bash
$ npm run tsc-demo
# use tsc-demo:w to watch for changes
```

## License

MIT © [Edward Carroll](https://github.com/edcarroll)
