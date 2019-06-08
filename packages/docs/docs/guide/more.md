# Depth dive into the plugin

## Introduction

Here we will speak about our choices and how we thought about the plugin

For having the road take the index.js

## Extracting options

As you can see we are calling **extractOptions** from options.js.

The goal of this function is to test and mask data you pass to the plugins.

As you can see we have an options variables that give us default value and simple types for checking.

::: warning
  If you add or making required key you should add **required** and the **found** key
:::

After that by reading the **extractOptions** you should understand easily what happen

## Building global context

::: warning
  the globalContext will be pass everywhere in the plugin
:::

Next take a look at **buildGlobalContext**.

It will create you an object with those:

``` jsx
{
  basePath: finalOpts.componentsDir,
  componentsPathContext: ret,
  componentsPath: paths,
  options: finalOpts,
};
```

- **basePath** will let me save the basePath of components
- **componentsPathContext** is the Tree representation of your components structure in you component folder. 
This tree has 2 levels:
  - root if there is no sub folders
  - subFolders. We will go 1 in depth if you have more all of those components will be passed in the depth 1 parent
- **componentsPath**. It is an array of all of you components path. It will help us to register them globally for you documentation with vuepress-plugin-register-component
- **options** is just the merge options from what you pass at the begining and defalt value the application will pass

At this time we should add the exlude folder/files logic

## Register the components globally

Now you should be in the export default from the index.js.

**registerPlugins(finalOpts)**

this will register globally your components with the core @vuepress/register-components. It will use the componentsPath

Automatically registering components on the client side.

## enhanceAppFiles

*enhanceAppFiles will be loaded and applied automatically when the application is initialized on the client side* [HERE MORE INFOS](https://v1.vuepress.vuejs.org/plugin/option-api.html#enhanceappfiles)

Here the goal of the enhanceAppFiles is to add when the client is ready the sidebar.

It will loop with you **componentsPathContext** and will build the root and the sub folders into an object that he will pass later when the front is ready into siteData.themeConfig['sidebar']

## additionalPages

The most important Here actually. It will use the basePath and loop from your componentsPathContext (the tree :winkle: ).

It will call **buildComponentPage**

First it will use the parse from [our fork of vue-docgen-api](https://github.com/vue-styleguidist/vue-styleguidist#readme) and extract componentInfo in **componentInfo**

from here we have splitted the rendering of the docs a lot !

You can actually personnalize everything.

Every parameters in components should be functions they will receive data for his part and return a string. You can check code for example

```jsx
  // you can use here 'docgen' instead of the require
  require("../../src/index"),
  {
    componentsDir: path.join(__dirname, "../../components"),
    // debug: true,
    sideBarName: 'Components',// this the default value
    globalName: 'Globals', // this is for naming the root path of your components
    regex: "/**/*.vue",
    templates: {
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
  }

```

You should consider using something [vuepress-plugin-live](https://vuepress-live.surge.sh/). 

Something really cool that will give you the power of real time editing you component ! :smile: