const path = require('path');
const dir = require('node-dir')

module.exports.buildComponentContext = (options) => {
    let ret = {
        children: []
    };

    let paths = []

    dir
    .files(options.rootDir, {
        sync: true,
        recursive: true
    })
    .filter(file => file.match(/\.(vue)$/))
    .map(file => {
        // TODO: fatigue ou je sais pas mais clair
        let splitPath = file.split('/');
        paths.push(splitPath.splice(0, splitPath.length - 1).join("/"))
        let relativePath = file.substring(options.rootDir.length + 1)
        let extractPath = relativePath.split("/");

        if (extractPath.length > 1) {
            ret[extractPath[0]] = {
                ...ret[extractPath[0]]
            }
            if (!ret[extractPath[0]].hasOwnProperty('children')) {
                ret[extractPath[0]]['children'] = []
            }
            ret[extractPath[0]]['children'].push(extractPath.splice(1).join('/'))
        } else {
            ret['children'].push(relativePath)
        }
    })
    return {
        ret,
        paths
    };
}