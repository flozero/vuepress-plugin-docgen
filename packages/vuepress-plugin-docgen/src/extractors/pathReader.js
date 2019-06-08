module.exports.extractRelativePath = (basePath, path) => path.substring(basePath.length + 1);

module.exports.extractDirPathFromFile = (path) => {
  const splitPath = path.split('/');
  return splitPath.splice(0, splitPath.length - 1).join('/');
};

module.exports.getFileNameFromAbsolutePath = (absolutePath) => {
  let path = absolutePath.split('/');
  return path[path.length - 1]
}
