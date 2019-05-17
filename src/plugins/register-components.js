module.exports.registerPlugins = finalContext => [
    ['live'],
    [
        '@vuepress/register-components',
        {
            componentsDir: finalContext.componentsPath,
        },
    ],
]
