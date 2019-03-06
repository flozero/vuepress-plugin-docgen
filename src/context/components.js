const dir = require('node-dir');

module.exports.buildComponentContext = (options) => {
  const ret = {
    children: [],
  };

  const paths = [];

  dir
    .files(options.rootDir, {
      sync: true,
      recursive: true,
    })
    .filter(file => file.match(/\.(vue)$/))
    .map((file) => {
      // TODO: fatigue ou je sais pas mais clair
      const splitPath = file.split('/');
      paths.push(splitPath.splice(0, splitPath.length - 1).join('/'));
      const relativePath = file.substring(options.rootDir.length + 1);
      const extractPath = relativePath.split('/');

      if (extractPath.length > 1) {
        ret[extractPath[0]] = {
          ...ret[extractPath[0]],
        };

        const childrenKey = Object.prototype.hasOwnProperty.call(
          ret[extractPath[0]],
          'children',
        );
        if (!childrenKey) ret[extractPath[0]].children = [];
        ret[extractPath[0]].children.push(extractPath.splice(1).join('/'));
      } else {
        ret.children.push(relativePath);
      }
      return file;
    });
  return {
    ret,
    paths,
  };
};
