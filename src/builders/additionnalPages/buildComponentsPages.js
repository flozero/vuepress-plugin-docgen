const { parse } = require('vue-docgen-api');
const fs = require('fs');

const { getCompiledTemplateWithHbs } = require('../handlebars');
const VueParser = require('../../parser/vue');

// TODO: add the possibility to let people add a custom template for the index
const buildIndexPageComponent = sideBarName => ({
  path: sideBarName,
  content: '# Components',
});

// TODO: refacto a faire ici beaucoup trop de trucs
const buildComponentPage = (absolutePath, parentPath) => {
  let preview = '';

  const componentInfo = parse(absolutePath);

  const handleBarCompilation = getCompiledTemplateWithHbs(componentInfo);

  const componentStringify = fs.readFileSync(absolutePath, {
    encoding: 'utf-8',
  });

  let componentName = absolutePath.split('/');

  componentName = componentName[componentName.length - 1];

  componentName = componentName.split('.');

  const vueParser = new VueParser({
    source: componentStringify,
    fileName: componentName[0],
  });

  const docsBlock = vueParser.getCustomBlock('docs');

  if (docsBlock) {
    preview = `## Code\n\n\`\`\`html\n${docsBlock.content.replace(
      /(\r\n|\n|\r)/gm,
      '',
    )}\n\`\`\`\n\n## Preview\n${docsBlock.content}`;
  }

  let content = handleBarCompilation;
  content += preview;

  return {
    path: `${parentPath + componentName[0]}.html`,
    content,
  };
};

module.exports = (finalContext) => {
  const ctx = finalContext.componentsPathContext;
  const { rootDir } = finalContext.options;
  const componentsPages = [];

  // TODO: '/components/' ne doit pas etre en dur
  Object.keys(ctx).forEach((k) => {
    if (k === 'children') {
      ctx[k].forEach((componentRelativePath) => {
        componentsPages.push(
          buildComponentPage(
            `${rootDir}/${componentRelativePath}`,
            '/components/',
          ),
        );
      });
    } else {
      ctx[k].children.forEach((componentRelativePath) => {
        componentsPages.push(
          buildComponentPage(
            `${rootDir}/${k}/${componentRelativePath}`,
            `/components/${k}/`,
          ),
        );
      });
    }
  });

  return [
    buildIndexPageComponent(finalContext.options.sideBarName),
    ...componentsPages,
  ];
};
