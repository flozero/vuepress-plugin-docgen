const hbs = require('handlebars');

module.exports.getCompiledTemplateWithHbs = (templateInfos, template = '') => {
  const compiler = hbs.compile(template);
  return compiler(templateInfos);
};
