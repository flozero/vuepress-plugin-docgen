const path = require('path')

module.exports = config => {
    const loaderPath = path.resolve(__dirname, './loader.js')
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')
    config.module
        .rule('docs')
        .oneOf('docs')
        .resourceQuery(/blockType=docs/)
        .use('through-loader')
        .loader(require.resolve(loaderPath))
        .end()
}
