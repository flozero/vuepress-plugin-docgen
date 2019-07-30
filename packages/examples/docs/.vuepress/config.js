const path = require('path');

module.exports = {
  title: 'VuePress Docgen',
  description: 'Preview your components',
  plugins: [
    [
      "live",
      {
        layout: path.resolve(__dirname, "./custom-layout"),
      }
    ],
    [
      [
        // you can use here 'docgen' instead of the require
        require("vuepress-plugin-docgen"),
        {
          componentsDir: path.join(__dirname, "../../src/components"),
          // debug: true,
        }
      ]
    ],
    themeConfig: {
      nav: [
        { text: 'Home', link: '/' },
        { text: "Components Examples", link: "/components/" },
        { text: 'Github', link: 'https://github.com/f3ltron/vuepress-plugin-docgen' }
      ],
      sidebar: {},
    },
    base: "/vuepress-plugin-docgen/"
}
