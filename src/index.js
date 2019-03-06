const { NAME } = require('./constants')
const { extractOptions } = require('./utils/options');
const { buildComponentContext } = require("./context/components")
const { registerPlugins } = require("./plugins/register-components");
const buildComponentsPages = require("./builders/additionnalPages/buildComponentsPages");

const docsBlockConfig = require("./utils/webpack");

const buildEnhanceApp = require("./builders/enhanceAppFile")

const logger = require("./utils/logger");

module.exports = (opts = {}, context) => {

    if (!opts.debug) logger.pause() 
    
    logger.log("beforeParser options: ", opts)

    const options = extractOptions(opts)

    logger.log("afterParser options: ", options)

    let builds = buildComponentContext(options)

    const finalContext = {
        basePath: options.rootDir,
        componentsPathContext: builds.ret,
        componentsPath: builds.paths,
        options
    }

    logger.log(finalContext)
    console.log(finalContext);
    return {
        name: NAME,
        plugins: registerPlugins(finalContext),
        chainWebpack: docsBlockConfig,
        enhanceAppFiles: buildEnhanceApp(finalContext),
        additionalPages: buildComponentsPages(finalContext),
    }
}