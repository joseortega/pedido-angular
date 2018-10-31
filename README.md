# Pedido

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

Update to angular 7.x

ERROR in node_modules/@ng-bootstrap/ng-bootstrap/datepicker/datepicker-navigation.d.ts.NgbDatepickerNavigation.html(3,67): : An expression of type 'void' cannot be tested for truthiness
node_modules/@ng-bootstrap/ng-bootstrap/datepicker/datepicker-navigation.d.ts.NgbDatepickerNavigation.html(25,67): : An expression of type 'void' cannot be tested for truthiness

ng-bootstrap: 3.x doesn't support Angular 7.x - you should have gotten warning from your package manager as the peer dependency doesn't much. We will be releasing Angular 7.x / Typescript 3.1.1 version in the coming days but this will require us to bump up ng-bootstrap version to 4.0.0 (or higher).

Temporal Solution:

https://github.com/ng-bootstrap/ng-bootstrap/issues/2755

Cloned a copy to include as a separate project, angular-cli@7.0.0-rc.0 does not like !! appearing in a few templates. Example: This: (click)="!!selectPage(page-1)" binding in pagination.ts. Not sure what the double exclamation even does?

-edit-
Here's a temporary fix: In ng-bootstrap.metadata.json of the npm package, replace all occurrences of (click)=\"!! with (click)=\". No idea if it breaks things, but at least gets around the build error.



