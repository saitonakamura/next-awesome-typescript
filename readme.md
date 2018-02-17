# Next.js + Typescript + Awesome typescript loader

Use [Typescript](https://www.typescriptlang.org/) with [Next.js](https://github.com/zeit/next.js) with [Awesome typescipt loader](https://github.com/s-panferov/awesome-typescript-loader)

## Installation

```
npm install --save-dev next-awesome-typescript typescript
```

or

```
yarn add --dev next-awesome-typescript typescript
```

## Usage

Create a `next.config.js` in your project

```js
// next.config.js
const withAwesomeTypescript = require("next-awesome-typescript");
module.exports = withAwesomeTypescript();
```

Minimal `tsconfig.json` is necessary. The reason for it is that babel will be applied after typescript, and will take care of modules, jsx and stuff.

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "jsx": "preserve",
    "moduleResolution": "node",
    "sourceMap": true
  }
}
```

You can pass options to `awesome-typescript-loader` as a first argument

```js
// next.config.js
const withAwesomeTypescript = require('next-awesome-typescript');

const options = {
  useCheckerPlugin: true,
  loaderOptions: {
    transpileOnly: false,
    errorsAsWarnings: true
  }
};

module.exports = withAwesomeTypescript(options);
```

Optionally you can add your custom Next.js configuration as second parameter

```js
// next.config.js
const withAwesomeTypescript = require("next-awesome-typescript");
const options = {};
const nextConfiguration = {
  webpack: () => ({})
};
module.exports = withAwesomeTypescript(options, nextConfiguration);
```
