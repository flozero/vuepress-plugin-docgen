const path = require('path')

module.exports = {
  title: 'Vue Kawaii',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/guide/getting-started' },
      { text: 'Github', link: 'https://github.com/youngtailors/vue-kawaii' },
    ],
    sidebar: [
        {
            title: "Guide",
            collapsable: false,
            children: ["/guide/", "/guide/getting-started"]
        },
        {
            title: "Components"
        }
    ]
    // sidebar: {
    //     '/guide/': [
    //         "",
    //         "getting-started"
    //     ],
    //     '/components/': []
    // }
  },
  plugins: [
    [
      require("../.../../../../../dist/index.js"),
      {
        rootDir: path.join(__dirname, '../../src/components'),
        // title: '/components/'
        title: 'Components'
      },
    ],
  ],
}
