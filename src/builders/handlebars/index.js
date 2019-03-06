const hbs = require('handlebars');
const topTemplate = require("./template")
const { RuntimeOptions } = require('handlebars/runtime')

hbs.registerHelper('greaterThan', function(
    RuntimeOptions,
    v1,
    v2,
    options
  ) {
    'use strict'
    if (v1.length > v2) {
      return options.fn(RuntimeOptions)
    }
    if (v1.length <= v2) {
      return new hbs.SafeString('')
    }
    if (Object.keys(v1).length > v2) {
      return options.fn(RuntimeOptions)
    }
    return new hbs.SafeString('')
  })


module.exports.getCompiledTemplateWithHbs = (componentInfos) => {
    const compiler = hbs.compile(topTemplate)
    return compiler(componentInfos)
}