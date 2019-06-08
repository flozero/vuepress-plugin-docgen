const path = require('path');

module.exports = {
  title: 'VuePress Docgen',
  description: 'Preview your components',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Github', link: 'https://github.com/f3ltron/vuepress-plugin-docgen' }
    ],
    sidebar: {
      '/guide/':  [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            ['/guide/', 'installation'],
            '/guide/configuration',
            ['/guide/more', 'More in depth']
          ]
        },
        {
          title: 'Contributing',
          collapsable: false,
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
