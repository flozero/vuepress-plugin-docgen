module.exports.registerPlugins = finalContext => [
  [
    '@vuepress/register-components',
    {
      componentsDir: finalContext.componentsPath,
    },
  ],
];
