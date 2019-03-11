# Configuration

If you don't know where to put your config

Check [Vuepress Documentation](https://v1.vuepress.vuejs.org/config/)

Examples: minimal configuration needed

```js
plugins: [
  [ require('vuepress-component-docgen'),
    {
      componentsDir: path.join(__dirname, '../../../components')
    }
  ]
]
```

All configurable options: 

```js
componentsDir: {
  type: 'string', // absolute path
  required: true,
},
debug: {
  type: 'boolean',
  default: false,
},
sideBarName: {
  type: 'string',
  default: 'components',
},
globalName: {
  type: 'string',
  default: 'Globals'
},
globalIndexComponentTemplate: {
  type: 'string',
  default: globalIndexComponentTemplate
},
docsBlockTemplate: {
  type: 'function',
  default: docsBlockTemplate
},
componentsDocsTemplate: {
  type: 'string',
  default: topTemplate
}
```

## componentsDir

Typically the path of your components you want to document. It should be an absolute path

Examples: Use path.joi and __dirname 

```js
  path.join(__dirname, '../../../components')
```

## debug

::: danger
  If you activate it you should know it will process.exit(0) before build is finish
  Because of windows terminal and linux clear buffer
:::

You will have informations about: 

- the final options parsed
- the globalContext used through the plugin
- More incoming... 

With that you are ok to debug

## sideBarName

To understand this I will show what your sidebar config should look like
after the plugins build

```js
sidebar: {
  '/guide/': [
    {
      title: '',
      collapsable: false,
      children: [
        '',
        'started'
      ]
    },
    {
      title: 'one',
      collapsable: false,
      children: [
        'bar/',
      ]
    },
    {
      title: 'bar title',
      collapsable: false,
      children: [
        ['foo/', 'three'],
      ]
    }
  ],
  '/components/' : [ // the sidebarname with the / added
    // your Components Files Structure
  ]
}
```

If it's not showing like this. It will send you a warning in console.

::: tip
  What's going on behind? 

  The plugin will create an object representing your components sidebar and will
  inject it inside the enhanceAppFiles with the buildSideBar method.
:::

## globalName

When you are going into you components folder all vue file at the root
are considered as globalComponents

GlobalName is the section name where all your components at rootDir will be displayed

## globalIndexComponentTemplate

this template is the global index page you will have when someone navigate into it.

## docsBlockTemplate

docsBlockTemplate is the preview of the <docs></docs>

If you want to override it you pass a function like this

```js
module.exports = (docsBlock) => `
## Code\n\n\`\`\`html\n${docsBlock.content.replace(
/(\r\n|\n|\r)/gm,
'',
)}\n\`\`\`\n\n## Preview\n${docsBlock.content}
`
```

Your function will receive the docsBlock data extracted by the VueParser.

For more informations about it [Check here](https://www.npmjs.com/package/@vue/component-compiler-utils)

## componentsDocsTemplate

::: warning
  For the templating we are using handlebar [Check the doc](https://handlebarsjs.com/)
:::

You will have all informations about your component available with [vue-docgen-api](https://www.npmjs.com/package/vue-docgen-api). Refer to it or check the examples folders.


