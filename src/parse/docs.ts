import * as hbs from 'handlebars'
import componentTemplate from '../template/component'

hbs.registerHelper('greaterThan', function(v1, v2, options) {
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

  // why doing that here?
  // Object.keys(data.props).forEach(key => {
  //   if (data.props[key].description) {
  //     data.props[key].description = data.props[key].description.replace(
  //       /(\r\n|\n|\r)/gm,
  //       '<br />',
  //     )
  //   }
  // })

  // Object.keys(data.methods).forEach(key => {
  //   if (data.methods[key].description) {
  //     data.methods[key].description = data.methods[key].description.replace(
  //       /(\r\n|\n|\r)/gm,
  //       '<br />',
  //     )
  //   }
  // })

  return compiler(data)
}
