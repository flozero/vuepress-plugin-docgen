const path = require("path");

module.exports = {
  title: "Hello VuePress",
  description: "Just playing around",
  extend: "@vuepress/theme-default",
  plugins: [
    [
      require("vuepress-component-docgen"),
      {
        componentsDir: path.join(__dirname, "../../../components"),
        debug: true
      }
    ]
  ],
  themeConfig: {
    sidebar: {
      "/guide/": [
        {
          title: "",
          collapsable: false,
          children: ["", "started"]
        },
        {
          title: "one",
          collapsable: false,
          children: [
            // ['/bar/', 'one'],
            "bar/"
            // '/bar/two.md'
          ]
        },
        {
          title: "bar title",
          collapsable: false,
          children: [
            ["foo/", "three"]
            // '/foo/three',
            // '/foo/four'
          ]
        }
      ]
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Components", link: "/components/" }
    ]
  }
};
