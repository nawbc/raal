# create-muguet-lib



这是一个用于 react ui 组件库开发的脚手架, 具有文档网站开发,ui 组件开发的功能

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

- npm start _打开文档开发环境，提供组件开发和文档网站开发的 development 环境_

- npm run lib _使用 babel 编译组件库 到 release/lib 文件夹下 ,main 字段指向 release/lib/exports.js_

- npm run es _tsc 直接编译到 release/es 文件夹下 module 字段指向 release/es/exports.js_

- npm run dist _webpack 打包 到 release/dist 文件夹下_

- npm run app _webpack 打包文档网站_

- **npm run release** _发布同时进行 lib es dist app_

- npm run dts _向 release 中写入 d.ts_

- npm run scss:watch _监听并编译 scss 支持 compass_

- npm run scss _编译 scss_

### 例子

create-muguet-lib app (不能含有 react)
npm install 安装依赖

## 2. 自定义

## 3. 开发状态

- [x] 库打包
- [x] 文档网站打包
- [ ] 测试单元

## 4. 其他

如果你想只用于 app 开发也行 毕竟我 copy 了很多 create-react-app 的代码 🤭🤭
