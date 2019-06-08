const { extractDirPathFromFile, extractRelativePath } = require('../../extractors/pathReader');
const glob = require('glob');

module.exports.hasKey = (obj, key) => Object.prototype.hasOwnProperty.call(
  obj,
  key,
);

module.exports.buildGlobalContext = (finalOpts) => {
  const ret = {
    children: [],
  };

  const paths = [];

  const pattern = finalOpts.componentsDir + finalOpts.regex;
  const files = glob.sync(pattern, {})

  files.forEach(file => {

    const dirPathForGlobalRequire = extractDirPathFromFile(file);
    paths.push(dirPathForGlobalRequire);

    const relativePath = extractRelativePath(finalOpts.componentsDir, file);

    const splitRelativePath = relativePath.split('/');

    const isSubPath = splitRelativePath.length > 1;

      if (isSubPath) {
        const keyObj = splitRelativePath[0];

        ret[keyObj] = { ...ret[keyObj] };

        if (!module.exports.hasKey(ret[keyObj], 'children')) ret[keyObj].children = [];

        const subRelativePath = splitRelativePath.splice(1).join('/');
        ret[keyObj].children.push(subRelativePath);
      } else {
        ret.children.push(relativePath);
      }
  })

  return {
    basePath: finalOpts.componentsDir,
    componentsPathContext: ret,
    componentsPath: paths,
    options: finalOpts,
  };
};
