const path = require('path');
const logger = require('../utils/logger');
const { index, component } = require('../templates')
const merge = require('deepmerge')

const { 
  introduction,
  tags, 
  props, 
  methods, 
  events, 
  slots,
  preview  
} = component;

module.exports.options = {
  debug: false,
  sideBarName: 'components',
  globalName: 'Globals',
  regex: "/**/*.vue",
  templates: {
    components: {
      index,
      introduction,
      tags,
      props,
      slots,
      events,
      methods,
      preview
    }
  }
};

module.exports.checkTemplates = ({components}) => {
  let valid = true;
  if (typeof components !== 'object') return false;
  Object.keys(components).forEach((key) => {
    const k = components[key];
    if (typeof k !== 'function') valid = false
  });
  return valid;
};

module.exports.extractOptions = (givenOpts) => {
  const finalOpts = merge(module.exports.options, givenOpts)

  if (!finalOpts.componentsDir) {
    logger.error('[keys options]: you must pass a componentsDir property')
    return process.exit(1);
  }

  if (!path.isAbsolute(finalOpts.componentsDir)) {
    logger.error('path must be absolute path');
    process.exit(1);
  }

  if (!module.exports.checkTemplates(finalOpts.templates)) {
    logger.error('[templates errors]: all templates should be functions')
    return process.exit(1);
  }
  return finalOpts;
};
