# Notes from the author

Hi there 👋

**Some notes, assumptions and quirks**

- If you close the app tab or the browser, and fire it up again, it will re-query the endpoints. If this is an issue, please let me know - as I'll be more than happy to make any necessary changes to pass. I'm off on holiday tomorrow (Tuesday 26th), so I hope it would be ok to make those changes when I return in early April. I would backup the applications state in local storage and rehydrate the app when initialised.
- The refresh time is configurable in the UI in the demo section at the bottom on the main page. The minimum amount is 2000ms.
- Aside from watching the network tab to see requests, you can also check the console, as it logs when polling starts, stops and each time it polls.
- You can inspect the applications state using the Redux Chrome extension.
- Finally the app has been stood up on Github pages, if you have any problems accessing it, please let me know.

**Step 1**

- The locationService has largely become a local storage service, as the zipcodes are locally managed in the app using ngrx. This also allows us to utilise both services without them having any knowledge of each other.

**Step 2**

- I've created a tabs component which I've demoed in two ways: 1) using the weather cards, and 2) using a static array of objects in the demo section.
- The tabs component handles the navigation between tabs, and on removal, the tabs component emits the index of the tab removed to the parent to manipulate handle the data - the tabs component shouldn't have knowledge of, or manage the state.

**Step 3**

- I've illustrated a few ways of caching and refreshing data:
- On the main page, an interval timer is setup using an ngrx effect. These will continue to poll the API at the rate of the configurable refresh time.
- When navigating to a full 5 day forecast, the data is retrieved and stored with a time stamp. This data isn't refreshed until the user navigates back to that page, and only then if more time than the refresh time has passed.

Thank you so much, it was a great exercise. I'd be thrilled to talk you through the codebase, answer any questions you have and make any additions and improvements necessary.

All the best,

Adam

# NgWeather

An app that showcases how to build a simple app with Angular (running on 14.x)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Deploying

Run `ng deploy --base-href=/ng-weather/ --dir=dist`
