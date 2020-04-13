# @boilerz/build-tools

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/boilerz/build-tools/blob/master/LICENSE)
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
