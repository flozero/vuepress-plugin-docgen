const logger = require("./logger");
const path = require('path');

module.exports.options = {
    rootDir: {
        type: "string",
        required: true,
        found: false
    },
    debug: {
        type: "boolean",
        default: false,
    },
    sideBarName: {
        type: "string",
        default: "/components/"
    }
}

module.exports.founded = (key) => {
    if (module.exports.options[key]) {
        module.exports.options[key].found = true
        return true
    } else {
        logger.error("key " + key + " is useless you should delete it")
        return false
    }
}

module.exports.goodTyped = (key, obj) => {
    if (typeof obj[key] != module.exports.options[key].type) {
        logger.error("type of: " + key + " should be type of " + module.exports.options[key].type)
        return false
    }
    return true 
}


module.exports.isOptValid = (options) => {
    let valid = true;
    Object.keys(options).forEach(key => {
        let k = options[key];
        if (k.required && !k.found) {
            valid = false
            logger.error("error with the key: missing ", key)
        }
    });

    return valid
}

module.exports.getParsedOptions = (opts) => {
    let ret = {}

    Object.keys(module.exports.options).forEach(key => {
        if (module.exports.options[key].hasOwnProperty('default')) {
            ret[key] = module.exports.options[key].default
        }
    })

    return {
        ...ret,
        ...opts
    }
}

module.exports.extractOptions = (opts) => {

    let valid = true;

    Object.keys(opts).forEach(key => {
        let pass = true
        if (!module.exports.founded(key)) {
            valid = false
            pass = false
        }
        if (pass && !module.exports.goodTyped(key, opts)) {
            valid = false
        }
    })

    if (!module.exports.isOptValid(module.exports.options) || !valid) {
        process.exit(1);
    }

    if (!path.isAbsolute(opts.rootDir)) {
        logger.error("path must be absolute path")
        process.exit(1);
    }

    return module.exports.getParsedOptions(opts)
}