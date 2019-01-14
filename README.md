# vuepress-plugin-component-docgen

> Vuepress plugin for creating a documentation site of your Vue component

![npm](https://img.shields.io/npm/v/vuepress-plugin-component-docgen.svg?style=flat-square)

## Install from NPM

```bash
npm install --save-dev vuepress-plugin-component-docgen
```

## Install from Yarn

```bash
yarn add vuepress-plugin-component-docgen
```

## Config for your site

Update your `.vuepress/config.js`

```js
module.exports = {
    ...
    plugins: [
      [
        'component-docgen',
        {
          rootDir: <string>,
          include: <string | string[]>,
          exclude: <string | string[]>,
          prefix: <string>,
        }
      ]
    ]
}
```

## See Who Is Using `component-docgen`

- [vue-kawaii](https://github.com/youngtailors/vue-kawaii)
- [vue-w3css](https://github.com/f3ltron/vuew3css)

## Contributors

- [Evan N](https://github.com/dacsang97)
- [F3ltron](https://github.com/f3ltron/)

## License

MIT &copy; dacsang97
