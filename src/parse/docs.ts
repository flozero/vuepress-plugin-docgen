import * as hbs from 'handlebars'
import { RuntimeOptions } from 'handlebars/runtime'
import componentTemplate from '../template/component'

hbs.registerHelper('greaterThan', function(
  this: RuntimeOptions,
  v1,
  v2,
  options,
) {
  'use strict'
  if (v1.length > v2) {
    return options.fn(this)
  }
  if (v1.length <= v2) {
    return options.inverse(this)
  }
  if (Object.keys(v1).length > v2) {
    return options.fn(this)
  }
  return options.inverse(this)
})

export default componentInfo => {
  const compiler = hbs.compile(componentTemplate)
  const data = componentInfo

  return compiler(data)
}
