const path = require('path');

module.exports = {
  title: 'VuePress Docgen',
  description: 'Preview your components',
  plugins: [
    ["live"],
    [
      // you can use here 'docgen' instead of the require
      require("../../src/index"),
      {
        componentsDir: path.join(__dirname, "../../components"),
        // debug: true,
        sideBarName: 'Components',// this the default value
        globalName: 'Globals' // this is for naming the root path of your components
      }
    ]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: "Components Examples", link: "/components/" },
      { text: 'Release', link: '/CHANGELOG.md' },
      { text: 'Github', link: 'https://github.com/f3ltron/vuepress-plugin-docgen' }
    ],
    sidebar: {
      '/guide/':  [
        {
          title: 'Guide', // required
          collapsable: false, // optional, defaults to true
          children: [
            ['/guide/', 'installation'],
            '/guide/configuration',
            ['/guide/more', 'More in depth']
          ]
        },
        {
          title: 'Contributing', // required
          collapsable: false, // optional, defaults to true
          children: [
            ['/guide/contributing/', 'Thank You'],
            ['/guide/contributing/development.md', 'local Developemt'],
            ['/guide/contributing/commit', 'How to commit'],
            ['/guide/contributing/pr', 'Send your work'],
          ]
        }
      ],
    },
  },
  base: "/vuepress-plugin-docgen/"
}
