# Configuration

If you don't know where to put your config

Check [Vuepress Documentation](https://v1.vuepress.vuejs.org/config/)

Examples: minimal configuration needed

```js
plugins: [
  // as we respect the naming convention vuepress-plugin-docgen you can juste docgen as name
  [ 'docgen',
    {
      componentsDir: path.join(__dirname, '../../components')
    }
  ]
]
```

All configurable options: 

```js
componentsDir: {
  type: 'string', 
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
regex: {
  type: 'string',
  default:  "/**/*.vue"
},
templates: { //default
  component: { 
    index: [Function],
    introduction: [Function],
    tags: [Function],
    props: [Function],
    slots: [Function],
    events: [Function],
    methods: [Function],
    preview: [Function] 
  }
}
```

## componentsDir

Typically the path of your components you want to document. It should be an absolute path

Examples: Use path.join and __dirname 

```js
  path.join(__dirname, '../../../components')
```

## debug

::: danger
  If you activate it you should know it will process.exit(0) before build is finish
:::

You will have informations about: 

- the final options parsed
- the globalContext used through the plugin
- If there is errors you will have detail informations

Really helpfull when you want to develop

## sideBarName

Usefull when you dont want to use /components/ for sidebar path

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
  inject it inside the enhanceAppFiles.
:::

## globalName

When you are going into you components folder all vue file at the root
are considered as globalComponents

GlobalName is the section name where all your components at rootDir will be displayed

[vue-docgen-api](https://www.npmjs.com/package/vue-docgen-api)


## regex

> default /**/*.vue

If you want to have some granularities of wich components you want and not you can use glob pattern check the package [HERE](https://www.npmjs.com/package/glob)

## templates

templates here are the full customisable rendering ! You can change every part of the docgen. 

It just has to be functions for all of them and return a string that will represent a markdown you will receive data that 
represent the part you will render.

Examples: 

introduction will receive 

```jsx
  {
    displayName,
    description
  }
```

If you want to see more just go in the templates folder and you will have example of what we do actually !
