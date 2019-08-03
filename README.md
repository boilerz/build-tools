# @boilerz/build-tools

[![GitHub package.json version](https://img.shields.io/github/package-json/v/boilerz/build-tools)](https://www.npmjs.com/package/@boilerz/build-tools)

> Common build tools for the JS/TS worlds.

### Install

```bash
yarn add -D @boilerz/build-tools
```

### Usage

`package.json` example:

```json
{
  "scripts": {
    "build": "buildTSPackage"
  }
}
```

### Release

```bash
yarn version
yarn build
yarn publish dist --access public
```
