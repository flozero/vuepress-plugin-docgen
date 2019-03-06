const path = require('path');

module.exports = (config) => {
  const loaderPath = path.resolve(__dirname, './loader.js');
  return config.module
    .rule('docs')
    .oneOf('docs')
    .resourceQuery(/blockType=docs/)
    .use('through-loader')
    .loader(require.resolve(loaderPath))
    .end();
};
