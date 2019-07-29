# create-muguet-lib

This is a scaffold for react UI component library development. It has the functions of document website development and UI component development.

[中文](https://github.com/sewerganger/create-muguet-lib/blob/master/README-zh.md)

## 1. Usage

### Global commands

```shell
Usage: cli [options]
Options:
- v,--version output the version number

- a, - - author < name > add Author

- l, - - license < name > add License

- h,--help output usage information

```

### Commands in Templates

- npm start | _opens the document development environment to provide the development environment for component development and document website development_

- npm run lib | _Use Babel to compile the component library to the release/lib folder, and the main field points to release/lib/exports.jsr_

- npm run es | _tsc is compiled directly into module field under release/es folder to point to release/es/exports. js_

- npm run dist | _webpack package to release/dist folder_

- npm run app | _webpack packaged document website_

- _npm run release_ | _running lib, es, dist, app_

- npm run dts | _writes d.ts to release_

- npm run scss:watch | _listens and compiles (**support compass**)_

- npm run scss | _compiles scss_

### Examples

Create-muguet-lib app (cannot contain react)

npm install installation dependency

## 2. Customization

## 3. Development status

- [x] library packaging

- [x] Document Web Packing

- [ ] Test Unit

## 4. Other

If you want to use it only for app development, after all, I copy a lot of create-react-app code.
