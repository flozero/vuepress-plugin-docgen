const path = require('path')

module.exports = {
  title: 'Vue Kawaii',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/guide/getting-started' },
      { text: 'Github', link: 'https://github.com/youngtailors/vue-kawaii' },
    ],
    // sidebar: [
    //   // add this if you want to position the library here
    //   // {
    //   //   title: "Components"
    //   // },
    //   {
    //     title: "Guide",
    //     collapsable: false,
    //     children: ["/guide/", "/guide/getting-started"]
    //   }
    // ]
    sidebar: {
        '/guide/': [
            "",
            "getting-started"
        ]
    }
  },
  plugins: [
    [
      require("../.../../../../../dist/index.js"),
      {
        rootDir: path.join(__dirname, '../../src/components'),
      },
    ],
  ],
}
