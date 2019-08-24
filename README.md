# create-muguet-lib

![](https://travis-ci.com/sewerganger/create-muguet-lib.svg?branch=master)
![](https://img.shields.io/github/languages/top/sewerganger/create-muguet-lib)
![](https://img.shields.io/github/package-json/v/sewerganger/create-muguet-lib/master)
![](https://img.shields.io/github/license/sewerganger/create-muguet-lib)
[![codecov](https://codecov.io/gh/sewerganger/create-muguet-lib/branch/master/graph/badge.svg)](https://codecov.io/gh/sewerganger/create-muguet-lib)

<img src="https://raw.githubusercontent.com/sewerganger/create-muguet-lib/master/doc/logo.jpg" width="100px"/>

这是一个用于 react ui 组件库开发的脚手架, 具有文档网站开发,ui 组件开发的功能

[English](https://github.com/sewerganger/create-muguet-lib/blob/master/README-en.md)

## ❤ 推荐使用 vscode

## 1. 安装

`npm i create-muguet-lib -g`

## 2. 使用方法

### 全局命令

```shell
Usage: cli [options]
Options:
  -v, --version          output the version number
  -a,  --author <name>   add Author
  -l,  --license <name>  add License
  -h, --help             output usage information
```

### 模板中的命令

- npm start

  - _打开文档开发环境，提供组件开发和文档网站开发的 development 环境_

- npm run lib

  - _使用 babel 编译组件库 到 release/lib 文件夹下 并生成 d.ts, main 字段指向 release/lib/exports.js_

- npm run es

  - _tsc 直接编译到 release/es 文件夹下 并生成 d.ts module 字段指向 release/es/exports.js_

- npm run dist

  - _webpack 打包 到 release/dist 文件夹下_

- npm run app

  - _webpack 打包文档网站_

- **npm run release**

  - _发布同时进行 lib es dist app_

- npm run dts:es

  - _向 release 的 es 中写入 d.ts_

- npm run dts:lib

  - _向 release 的 lib 中写入 d.ts_

- npm run dts

  - _向 release 的 es 和 lib 中写入 d.ts_

- npm run scss
  - _编译 scss_

- npm run test
  - _使用 `jest + enzyme`,  在项目中随意建立一个`__tests__` 否则运行此命令报错, `Snapshot` 默认使用_

- npm run cz:init
  - _初始化[commitizen](https://www.npmjs.com/package/commitizen), 它会格式化你的`commit message`, **使用`git cz` 代替 `git commit -m`**,在commit 完后会自动运行eslint [husky](https://www.npmjs.com/package/husky) and [lint-staged](https://www.npmjs.com/package/lint-staged)_

- npm run eslint
  - _auto fix tsx, ts, js, jsx, but some problems can't be fixed [eslint](https://cn.eslint.org/docs/user-guide/command-line-interface)_

- npm run changelog
  - _生成 `CHANGELOG.md` [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)_


### 例子

1. create-muguet-lib app (不能含有 react)
2. npm install 安装依赖

## 3. 注意

1. 预加载处理器使用 scss
2. ci 使用 travis
3. 覆盖率使用 codecov
4. 测试单元用 jest + enzyme 默认开启 snaptshot
5. 在`.script/config.json` 更改一些默认设置

## 4.历史
----
### v0.02-alpha1
1. 去除scss:watch 字段
2. 添加 `babel-plugin-transform-rename-import` 在生产环境 import 的.scss 转化为.css
3. 更改.babelrc 为 .babelrc.js
----
### v0.01-alpha6
1. 添加Husky、Lint Staged、ChangeLog和Commitien
2. 移除prettier 开启vscode自动保存格式化, 会和eslint冲突
3. 更新.eslintrc
----
### v0.01-alpha4
1. 删除tslint, 使用 [eslint](https://eslint.org/blog/2019/01/future-typescript-eslint#linting)
2. add `.vscode` and set `"prettier.eslintIntegration": false` because prettier error, details [#672](https://github.com/prettier/prettier-vscode/issues/672)
----


## 5. 其他

如果你想只用于 app 开发也行 毕竟我 copy 了很多 create-react-app 的代码 🤭🤭
