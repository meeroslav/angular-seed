# angular seed

> Angular (2+) seed for future applications

## Included
- Angular
- Typescript
- TSLint
- Webpack
- Karma test runner with PhantomJS and Chrome
- Protractor E2E test runner on Chrome
- Test coverage with HTML and TeamCity reporter
- Translations
- Custom config files

![](.github/omg.gif)

## Installation

Make sure you have NodeJS installed (version 5+).
```shell
npm install
```

## Build
For development build. Config used is `dev`.
```shell
npm run build
```

### Variants

Production with minified/uglified files and `prod` config:
```shell
npm run build:prod
```
`staging` config and source maps:
```shell
npm run build:staging
```
Continuous integration `ci` config and source maps:
```shell
npm run build:ci
```

## Run

For development/debugging run with file watcher included:
```shell
npm run start
```

## Watch
```shell
npm run watch
```

## Unit test
```shell
npm run test
```

## Automation test
```shell
npm run e2e
```

## Docs
```shell
npm run docs
```
