const { parse } = require('vue-docgen-api')

module.exports.buildComponent = (absolutePath, docsTemplate, finalContext) => {
    const { props, description, displayName, tags, events, methods, slots } = parse(absolutePath)

    const tmpl = finalContext.options.templates.components

    return {
        title: displayName,
        content: `
  ${description || displayName ? tmpl.introduction({ description, displayName }) : ''}
  ${tags ? tmpl.tags(tags) : ''}
  ${props ? tmpl.props(props) : ''}
  ${slots ? tmpl.slots(slots) : ''}
  ${methods ? tmpl.methods(methods) : ''}
  ${events ? tmpl.events(events) : ''}
  ${docsTemplate ? tmpl.preview(docsTemplate) : ''}
  `,
    }
}

module.exports.buildIndexPageComponents = finalContext => {
    const fn = finalContext.options.templates.components.index
    return {
        path: `/${finalContext.options.sideBarName}/`,
        content: fn(),
    }
}
