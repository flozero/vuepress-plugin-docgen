const { NAME } = require('./utils/constants')

const { extractOptions } = require('./extractors/options')

const { buildGlobalContext } = require('./builders/context')

const { registerPlugins } = require('./plugins/register-components')

const buildComponentsPages = require('./builders/additionnalPages/buildComponentsPages')

const chainWebpack = require('./utils/webpack')

const buildSideBar = require('./builders/sidebar')

// TODO: use @vuepress/shared-utils logger
const logger = require('./utils/logger')

module.exports = (givenOpts = {}) => {
    if (!givenOpts.debug) logger.pause()

    const finalOpts = extractOptions(givenOpts)

    logger.log('finalOpts: ', finalOpts)

    const globalContext = buildGlobalContext(finalOpts)

    logger.log(globalContext)

    return {
        name: NAME,
        plugins: registerPlugins(globalContext),
        chainWebpack: chainWebpack,
        enhanceAppFiles: [buildSideBar(globalContext)],
        additionalPages: buildComponentsPages(globalContext),
    }
}
