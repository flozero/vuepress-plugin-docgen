import * as hbs from 'handlebars'
import componentTemplate from '../template/component'

export default componentInfo => {
  const compiler = hbs.compile(componentTemplate)
  const data = componentInfo

  Object.keys(data.props).forEach(key => {
    if (data.props[key].description) {
      data.props[key].description = data.props[key].description.replace(
        /(\r\n|\n|\r)/gm,
        '<br />',
      )
    }
  })

  return compiler(data)
}
