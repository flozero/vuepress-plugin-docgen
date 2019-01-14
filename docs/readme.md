# Thank you for using us

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

## How to use

Update your `.vuepress/config.js`

```js
const path = require("path");

module.exports = {
    plugins: [
        [
            'component-docgen',
            {
                rootDir: <string>, // path.join(__dirname, '../../src/components')
                include: <string | string[]>, // need an example
                exclude: <string | string[]>, // need an example
                prefix: <string>, // need more explanation
            },
        ],
    ],
}
```

## What you should care

::: warning
It is adapted for sidebar navigation.

Vuepress using 2 types of sidebar: `Groups and Multiple` [see more](https://vuepress.vuejs.org/theme/default-theme-config.html#sidebar)

- Groups: Example

  ```js
  const path = require('path')

  /**
   *  this will add a /components/ routes
   *  and all you components are add like /Comp/ etc
   */
  module.exports = {
    themeConfig: {
      sidebar: {
        '/guide/': ['', 'getting-started'],
      },
    },
  }
  ```

- Mutliple: Example

  ```js
  const path = require('path')

  /**
   * this will add by default at the end of your array
   * if you want to add at a specific place you can see the example
   * with a
   * {
   *   title: "Components"
   * }
   * It will replace this object
   */
  module.exports = {
    themeConfig: {
      sidebar: [
        // add this if you want to position the library here
        // {
        //   title: "Components"
        // },
        {
          title: 'Guide',
          collapsable: false,
          children: ['/guide/', '/guide/getting-started'],
        },
      ],
    },
  }
  ```

:::

## Who use us

- [vue-kawaii](https://github.com/youngtailors/vue-kawaii)
- [vue-w3css](https://github.com/f3ltron/vuew3css)

## Contributors

- [Evan N](https://github.com/dacsang97)
- [F3ltron](https://github.com/f3ltron/)

## License

MIT &copy; dacsang97
