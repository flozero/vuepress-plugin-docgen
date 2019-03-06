const hbs = require('handlebars');
const topTemplate = require('./template');

module.exports.getCompiledTemplateWithHbs = (componentInfos) => {
  if (componentInfos.displayName === 'Test')
    {console.log(componentInfos);}
  const compiler = hbs.compile(topTemplate);
  return compiler(componentInfos);
};
