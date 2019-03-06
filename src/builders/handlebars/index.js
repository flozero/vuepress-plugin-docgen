const hbs = require('handlebars');
const topTemplate = require('./template');

module.exports.getCompiledTemplateWithHbs = (componentInfos) => {
  const compiler = hbs.compile(topTemplate);
  return compiler(componentInfos);
};
