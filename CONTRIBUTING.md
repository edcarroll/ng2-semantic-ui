# Contributing to ng2-semantic-ui

Your contribution will be greatly appreciated, and will help ng2-semantic-ui get even better! As a contributor, here are the guidelines to follow:

* [Code of Conduct](#code-of-conduct)
* [Bug, Question or Problem?](#bug-question-or-problem)
* [Feature Requests](#missing-a-feature)
* [Submission Guidelines](#submission-guidelines)
* [Coding Rules](#coding-rules)
* [Commit Messages](#commit-messages)

## Code of Conduct

Please read and follow the [Code of Conduct](https://github.com/edcarroll/ng2-semantic-ui/blob/master/CODE_OF_CONDUCT.md).

## Bug, Question or Problem?

For any usage questions you have, you can join [Gitter](https://gitter.im/ng2-semantic-ui/Lobby) to ask for help.

If you've found a bug, please submit an issue. Even better would be submitting a Pull Request with a fix.

## Missing a Feature?

You can *request* a new feature by [submitting an issue](#submitting-an-issue) to the GitHub
Repository. If you would like to *implement* a new feature, please submit an issue with
a proposal for your work first, to be sure that it can be used.
Please consider what kind of change it is:

* For a **Major Feature**, first open an issue and outline your proposal so that it can be
discussed. This will also allow better coordination of efforts, prevent duplication of work,
and help you to craft the change so that it is successfully accepted into the project.
* **Small Features** can be crafted and directly [submitted as a Pull Request](#submitting-a-pull-request).

## Submission Guidelines

### Submitting an Issue

Before you submit an issue, please search the issue tracker, as an issue for your problem may already exist and the discussion might inform you of readily available workarounds.

Ideally all issues are fixed as soon as possible, but before that can be done the bug must be confirmed. This is done by providing a minimal reproduction scenario using [http://plunkr.co](http://plunkr.co). You can fork the [ng2-semantic-ui plunkr starter](http://plnkr.co/edit/SJMMMS8wQkwdX1HeMqiH?p=preview) and use it as a starting point. Having a live, reproducible scenario provides a wealth of important information without needing to go back & forth to you with additional queries such as:

* Angular version used
* ng2-semantic-ui version used
* 3rd-party libraries used, if any
* Most importantly - a use-case that fails

A minimal reproduce scenario using [http://plunkr.co](http://plunkr.co) allows quick confirmation of a bug (or coding problem) and also confirms that the right problem is being fixed. Issues filed that do not include this (or a standalone git repository demonstrating the problem) won't be looked at until they do.

You can file new issues by filling out the [issue form](https://github.com/edcarroll/ng2-semantic-ui/issues/new).

### Submitting a Pull Request

Before submitting a Pull Request (PR) consider the following guidelines:

* Search the Github [pull requests](https://github.com/edcarroll/ng2-semantic-ui/pulls) for an open or closed PR relating to your submission (to avoid duplicating effort).

* Fork a copy of the repository to your own Github account - [see Github guide](https://help.github.com/articles/working-with-forks/)

* Make your changes in a new git branch:

    ```shell
    $ git checkout -b my-fix-branch master
    ```

* Create your patch

* Follow the [Coding Rules](#coding-rules), running the linter (`npm run lint`) to catch any errors

* Commit your changes using a descriptive commit message that follows the [commit message conventions](#commit-messages)

* Push your branch to GitHub:

    ```shell
    $ git push origin my-fix-branch
    ```

* In GitHub, send a pull request to `ng2-semantic-ui:master`
  - Create a new pull request
  - Select **compare across forks**
  - Set your repo and fix branch as the head fork to compare.

* If changes are suggested:
  - Make the required updates
  - Ensure the changes follow the coding rules
  - Push your changes to GitHub.

## Coding Rules

This project uses [tslint](https://palantir.github.io/tslint/) to maintain a consistent code style. You can run `npm run lint` in the project directory to lint the code.

The primary rules followed by this library are:

* 4 space indentation
* Double quotes (`"`) rather than single quotes (`'`)
* No whitespace for type definitions (e.g. `example:string`)
* PascalCase for class names, interfaces & **exported** constants
  - Interfaces prefixed with I
* camelCase for local variables (`const`)
  - Private fields prefixed with `_`
* Label all class members with modifiers (including `public`)
* Class member ordering, first to last:
  - static fields, instance fields, constructor, static methods, instance methods

## Commit Messages

To maintain readability and easy understanding of commits, all messages (excluding body) should be of the format:

```
<type>(<scope>): <subject>
```

The **scope** is optional, if the commit addresses multiple things. Please try to keep messages under 100 characters.

### Type

Must be one of the following:

* chore: Changes to build scripts
* docs: Changes to the documentation
* demo: Changes to the demo app (that don't include updated documentation)
* feat: New feature
* fix: Bug fix
* refactor: Code change that neither fixes a bug nor adds a feature
* style: Changes that don't affect the code's meaning (formatting etc.)
* test: Adding / updating tests

### Scope

Scope is generally the name of the component that is being changed. If a commit affects multiple components, then omit the scope, and add it to the message body.
