module.exports.registerPlugins = (finalContext) => {
    return [
        [
          '@vuepress/register-components',
          {
            componentsDir: finalContext.componentsPath,
          },
        ],
      ]
}