module.exports = {
  title: 'VuePress Docgen',
  description: 'Preview your components',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Release', link: '/CHANGELOG.md' },
      { text: 'Github', link: 'https://github.com/f3ltron/vuepress-component-docgen' },
    ],
    sidebar: {
      '/guide/':  [
        {
          title: 'Guide', // required
          collapsable: false, // optional, defaults to true
          children: [
            ['/guide/', 'installation'],
            '/guide/configuration'
          ]
        },
        {
          title: 'Contributing', // required
          collapsable: false, // optional, defaults to true
          children: [
            ['/guide/contributing/', 'Thank You'],
            ['/guide/contributing/development.md', ['local Developemt']],
            ['/guide/contributing/commit', ['How to commit']],
            ['/guide/contributing/pr', ['Send your work']]
          ]
        }
      ],
    },
  },
  base: "/vuepress-component-docgen/"
}
