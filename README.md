# create-muguet-lib

![](https://travis-ci.com/sewerganger/create-muguet-lib.svg?branch=master)
![](https://img.shields.io/github/languages/top/sewerganger/create-muguet-lib)
![](https://img.shields.io/github/package-json/v/sewerganger/create-muguet-lib/master)
![](https://img.shields.io/github/license/sewerganger/create-muguet-lib)
[![codecov](https://codecov.io/gh/sewerganger/create-muguet-lib/branch/master/graph/badge.svg)](https://codecov.io/gh/sewerganger/create-muguet-lib)

这是一个用于 react ui 组件库开发的脚手架, 具有文档网站开发,ui 组件开发的功能

[English](./README-en.md)

## 1. 使用方法

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

- npm run scss:watch

  - _监听并编译 scss 支持 compass_

- npm run scss
  - _编译 scss_

### 例子

1. create-muguet-lib app (不能含有 react)
2. npm install 安装依赖

## 2. 注意

1.  预加载处理器使用 scss
2.  ci 使用 travis
3.  覆盖率使用 codecov
4.  测试单元用 jest + enzyme 默认开启 snaptshot
5.  在.script/config.json 更改一些默认设置

## 3. 开发状态

- [x] 库打包
- [x] 文档网站打包
- [x] 测试单元
- [ ] 自定义使用库

## 4. 其他

如果你想只用于 app 开发也行 毕竟我 copy 了很多 create-react-app 的代码 🤭🤭
