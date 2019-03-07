const path = require('path');
const logger = require('../utils/logger');

module.exports.options = {
  rootDir: {
    type: 'string',
    required: true,
    found: false,
  },
  debug: {
    type: 'boolean',
    default: false,
  },
  sideBarName: {
    type: 'string',
    default: '/components/',
  },
};

module.exports.isFound = (key) => {
  if (module.exports.options[key]) {
    module.exports.options[key].found = true;
    return true;
  }
  logger.error(`key ${key} is useless you should delete it`);
  return false;
};

module.exports.isGoodTyped = (key, obj) => {
  if (typeof obj[key] !== module.exports.options[key].type) { /* eslint-disable-line */
    logger.error(
      `type of: ${key} should be of type ${module.exports.options[key].type}, received ${typeof obj[key]}`,
    );
    return false;
  }
  return true;
};

module.exports.isOptionsAlltrue = (options) => {
  let valid = true;
  Object.keys(options).forEach((key) => {
    const k = options[key];
    if (k.required && !k.found) {
      valid = false;
      logger.error('error with the key: missing ', key);
    }
  });

  return valid;
};

module.exports.regroupOptions = (givenOpts, options) => {
  const defaultOpts = {};

  Object.keys(options).forEach((key) => {
    const defaultPresent = Object.prototype.hasOwnProperty.call(
      options[key],
      'default',
    );
    if (defaultPresent) defaultOpts[key] = options[key].default;
  });

  return {
    ...defaultOpts,
    ...givenOpts,
  };
};

module.exports.isAllKeyFounded = (opts) => {
  let finalValidation = true;

  Object.keys(opts).forEach((key) => {
    const founded = module.exports.isFound(key);
    if (!founded) finalValidation = false;
  });

  return finalValidation;
};

module.exports.isAllKeyGoodTyped = (opts) => {
  let finalValidation = true;

  Object.keys(opts).forEach((key) => {
    const goodTyped = module.exports.isGoodTyped(key, opts);
    if (!goodTyped) finalValidation = false;
  });

  return finalValidation;
};

module.exports.extractOptions = (givenOpts) => {
  let keysValid = false;
  let goodTyped = false;

  keysValid = module.exports.isAllKeyFounded(givenOpts);

  if (keysValid) {
    goodTyped = module.exports.isAllKeyGoodTyped(givenOpts);
  }

  const optionsAllTrue = module.exports.isOptionsAlltrue(module.exports.options);

  if (!optionsAllTrue || !keysValid || !goodTyped) return process.exit(1);

  if (!path.isAbsolute(givenOpts.rootDir)) {
    logger.error('path must be absolute path');
    process.exit(1);
  }

  return module.exports.regroupOptions(givenOpts, module.exports.options);
};
