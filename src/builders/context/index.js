const dir = require('node-dir');
const { extractDirPathFromFile, extractRelativePath } = require('../../extractors/pathReader');

module.exports.hasKey = (obj, key) => Object.prototype.hasOwnProperty.call(
  obj,
  key,
);

// TODO: improvment can be done here
// using globs to find files
module.exports.buildGlobalContext = (finalOpts) => {
  const ret = {
    children: [],
  };

  const paths = [];

  dir
    .files(finalOpts.componentsDir, {
      sync: true,
      recursive: true,
    })
    .filter(file => file.match(/\.(vue)$/))
    .map((file) => {
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
      return file;
    });
  return {
    basePath: finalOpts.componentsDir,
    componentsPathContext: ret,
    componentsPath: paths,
    options: finalOpts,
  };
};
