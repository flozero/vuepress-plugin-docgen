const { NAME } = require('./utils/constants');

const { extractOptions } = require('./extractors/options');

const { buildGlobalContext } = require('./builders/context');

const { registerPlugins } = require('./plugins/register-components');

const buildComponentsPages = require('./builders/additionnalPages/buildComponentsPages');

const docsBlockConfig = require('./utils/webpack');

const buildEnhanceApp = require('./builders/enhanceAppFile');

const logger = require('./utils/logger');

module.exports = (givenOpts = {}) => {
  if (!givenOpts.debug) logger.pause();

  const finalOpts = extractOptions(givenOpts);

  logger.log('finalOpts: ', finalOpts);

  const builds = buildGlobalContext(finalOpts);

  const finalContext = {
    basePath: finalOpts.rootDir,
    componentsPathContext: builds.ret,
    componentsPath: builds.paths,
    options: finalOpts,
  };

  logger.log(finalContext);

  return {
    name: NAME,
    plugins: registerPlugins(finalContext),
    chainWebpack: docsBlockConfig,
    enhanceAppFiles: buildEnhanceApp(finalContext),
    additionalPages: buildComponentsPages(finalContext),
  };
};
