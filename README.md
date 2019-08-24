# create-muguet-lib
![](https://travis-ci.com/sewerganger/create-muguet-lib.svg?branch=master)
![](https://img.shields.io/github/languages/top/sewerganger/create-muguet-lib)
![](https://img.shields.io/github/package-json/v/sewerganger/create-muguet-lib/master)
![](https://img.shields.io/github/license/sewerganger/create-muguet-lib)
[![codecov](https://codecov.io/gh/sewerganger/create-muguet-lib/branch/master/graph/badge.svg)](https://codecov.io/gh/sewerganger/create-muguet-lib)

<img src="https://raw.githubusercontent.com/sewerganger/create-muguet-lib/master/doc/logo.jpg" width="100px"/>

This is a scaffold for react UI component library development. It has the functions of document website development and UI component development.

[中文](https://github.com/sewerganger/create-muguet-lib/blob/master/README-zh.md)

## ❤ recommend using vscode

## 1.Installation

`npm i create-muguet-lib -g`

## 2. Usage

### Global commands

```shell
Usage: cli [options]
Options:
  - v, --version output the version number
  - a, --author <name> add Author
  - l, --license <name> add License
  - h, --help output usage information
```

### Commands in Templates

- npm start

  - _Open Document Development Environment to Provide Development Environment for Component Development and Document Website Development_

- npm run lib
  - _Use Babel to compile component libraries into release/lib folder and generate d.ts. The main field points to release/lib/exports.js_

- npm run es
  - _tsc is compiled directly into the release/es folder and the d.ts module field is generated to point to release/es/exports.js_

- npm run dist
  - _webpack package to release/dist folder_

- npm run app
  - _webpack packaged document website_

- **npm run release**
  - _running lib, es, dist, app_

- npm run dts:es
  - _Write d.ts to releases_

- npm run dts:lib
  - _Write d.ts to release Lib_

- npm run dts
  - _writes d.ts to release_

- npm run scss:watch
  - _listens and compiles (**support compass**)_

- npm run scss
  - _compiles scss_

- npm run test
  - _test unit, using  `jest + enzyme`,  and you have to build a folder under your project or run an error report, `Snapshot` is opened by default_

- npm run cz:init
  - _init [commitizen](https://www.npmjs.com/package/commitizen), it will format your `commit message`, **using `git cz` instead `git commit -m`**, and after you commit it will running eslint automatically by [husky](https://www.npmjs.com/package/husky) and [lint-staged](https://www.npmjs.com/package/lint-staged)_

- npm run eslint
  - _auto fix tsx, ts, js, jsx, but some problems can't be fixed [eslint](https://cn.eslint.org/docs/user-guide/command-line-interface)_

- npm run changelog
  - _generate `CHANGELOG.md` [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)_

### Examples

Create-muguet-lib app (cannot contain react)

npm install installation dependency

## 3. Attention

1. Preload processors use scss
2. CI uses Travis
3. Coverage using codecov
4. The test unit opens snaptshot by default with jest + enzyme
5. Change some default settings in `.script/config.json`

## 4. History


----
1. 去除scss:watch 字段
2. 添加 `babel-plugin-transform-rename-import` 在生产环境 import 的.scss 转化为.css
3. 更改.babelrc 为 .babelrc.js
----
### v0.01-alpha6
1. add husky, lint-staged, changelog, commitizen
2. remove prettier because of conflict
3. update .eslintrc
----
### v0.01-alpha4
1. remove tslint, using eslint
2. add `.vscode` and set `"prettier.eslintIntegration": false` because prettier error, details [#672](https://github.com/prettier/prettier-vscode/issues/672)
----

## 5. Development status

- [x] library packaging
- [x] Document Web Packing
- [x] Test Unit
- [ ] Custom Use Library

## 6. Other

If you want to use it only for app development, I copy a lot of create-react-app code.
