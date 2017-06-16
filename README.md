<!-- Logo -->
<p align="center">
  <a href="https://react.semantic-ui.com">
    <img height="128" width="238" src="https://raw.githubusercontent.com/edcarroll/ng2-semantic-ui/master/demo/src/assets/logo.png">
  </a>
</p>

<!-- Name -->
<h1 align="center">
  <a href="https://edcarroll.github.io/ng2-semantic-ui">ng2-semantic-ui</a>
</h1>

<!-- Badges -->
<p align="center">
  <a href="https://gitter.im/ng2-semantic-ui/Lobby">
    <img alt="Gitter" src="https://img.shields.io/gitter/room/ng2-semantic-ui/Lobby.js.svg?style=flat-square" />
  </a>
  <a href="https://www.npmjs.com/package/ng2-semantic-ui">
    <img alt="npm" src="https://img.shields.io/npm/v/ng2-semantic-ui.svg?style=flat-square" />
  </a>
</p>

Semantic UI Angular Integrations, written in pure Angular - **no JQuery required**.

## Introduction

Angular and jQuery don't go together - this is the fundamental principal of this library. It provides Angular component versions of the Semantic UI modules, so that you don't need to add jQuery to your app.

Note that only Semantic UI elements that use jQuery are recreated here - those written purely in CSS aren't included as they can be used in Angular apps already.

## Installation & Usage

See the [Documentation](https://edcarroll.github.io/ng2-semantic-ui) for installation instructions and extensive examples.

## Dependencies

* [Angular](https://angular.io) (^4.1.0)
* [Semantic UI CSS](http://semantic-ui.com/) (jQuery is **not** required)

## Components

The current list of available components with links to their docs is below:

* [Accordion](https://edcarroll.github.io/ng2-semantic-ui/#/components/accordion)
* [Checkbox](https://edcarroll.github.io/ng2-semantic-ui/#/components/checkbox)
* [Collapse](https://edcarroll.github.io/ng2-semantic-ui/#/components/collapse)
* [Dimmer](https://edcarroll.github.io/ng2-semantic-ui/#/components/dimmer)
* [Dropdown](https://edcarroll.github.io/ng2-semantic-ui/#/components/dropdown)
* [Message](https://edcarroll.github.io/ng2-semantic-ui/#/components/message)
* [Modal](https://edcarroll.github.io/ng2-semantic-ui/#/components/modal)
* [Popup](https://edcarroll.github.io/ng2-semantic-ui/#/components/popup)
* [Progress](https://edcarroll.github.io/ng2-semantic-ui/#/components/progress)
* [Rating](https://edcarroll.github.io/ng2-semantic-ui/#/components/rating)
* [Search](https://edcarroll.github.io/ng2-semantic-ui/#/components/search)
* [Select](https://edcarroll.github.io/ng2-semantic-ui/#/components/select)
* [Sidebar](https://edcarroll.github.io/ng2-semantic-ui/#/components/sidebar)
* [Tabs](https://edcarroll.github.io/ng2-semantic-ui/#/components/tabs)
* [Transition](https://edcarroll.github.io/ng2-semantic-ui/#/components/transition)

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Great! Please read the [contributing guidelines](https://github.com/edcarroll/ng2-semantic-ui/blob/master/CONTRIBUTING.md) to get going.

## Development

To generate all library files:

```bash
$ npm run compile:lib
# use compile:lib:w to watch for changes
```

To run the demo app (you must have [Angular-CLI](https://github.com/angular/angular-cli) installed):
```bash
$ ng serve
```

## License

MIT © [Edward Carroll](https://github.com/edcarroll)
