const { NAME } = require('./utils/constants')

const { extractOptions } = require('./extractors/options')

const { buildGlobalContext } = require('./builders/context')

const { registerPlugins } = require('./plugins/register-components')

const buildComponentsPages = require('./builders/additionnalPages/buildComponentsPages')

const docsBlockConfig = require('./utils/webpack')

const buildSideBar = require('./builders/sidebar')

const logger = require('./utils/logger')

module.exports = (givenOpts = {}) => {
    if (!givenOpts.debug) logger.pause()

    const finalOpts = extractOptions(givenOpts)

    logger.log('finalOpts: ', finalOpts)

    const globalContext = buildGlobalContext(finalOpts)

    logger.log(globalContext)

    const content = `import Vue from 'vue';
  const { VueLive } from 'vue-live';

  Vue.component('vue-live', VueLive)`

    return {
        name: NAME,
        plugins: registerPlugins(globalContext),
        chainWebpack: docsBlockConfig,
        enhanceAppFiles: buildSideBar(globalContext),
        additionalPages: buildComponentsPages(globalContext),
        async enhanceAppFiles() {
            return [
                {
                    name: 'vuepress-vue-live-register.js',
                    content,
                },
            ]
        },
    }
}
