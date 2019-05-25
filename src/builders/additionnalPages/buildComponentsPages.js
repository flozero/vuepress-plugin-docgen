const { parse } = require('vue-docgen-api')
const fs = require('fs')

const { getCompiledTemplateWithHbs } = require('../handlebars')
const VueParser = require('../../parser/vue')

const { getFileNameFromAbsolutePath } = require('../../extractors/pathReader')
const { dropVueExtension } = require('../../extractors/name')

const buildIndexPageComponent = finalContext => {
    const contentTemplate = finalContext.options.globalIndexComponentTemplate
    return {
        path: `/${finalContext.options.sideBarName}/`,
        content: getCompiledTemplateWithHbs(finalContext, contentTemplate),
    }
}

function CompileTemplate(data = undefined, template) {
    if (typeof data === undefined) return '';
    return getCompiledTemplateWithHbs(data, template);
}


const buildTemplates = (absolutePath, docsTemplate) => {
    const { 
        props, 
        description, 
        displayName,
        tags,
        events,
        methods,
        slots
    } = parse(absolutePath)

    return `
${CompileTemplate({ description, displayName}, '## Bonjour')}
${CompileTemplate({tags}, '## Bonjour')}
${CompileTemplate({props}, '## Bonjour')}
${CompileTemplate({slots}, '## Bonjour')}
${CompileTemplate({events}, '## Bonjour')}
${CompileTemplate({methods}, '## Bonjour')}
${'## Preview \n'+ docsTemplate}
`
}

const buildComponentPage = (absolutePath, parentPath) => {

    const ComponentToStr = fs.readFileSync(absolutePath, { encoding: 'utf-8' })
    const componentName = dropVueExtension(getFileNameFromAbsolutePath(absolutePath))

    const ComponentInstance = new VueParser({
        source: ComponentToStr,
        fileName: componentName,
    })

    const preview = buildTemplates(absolutePath, ComponentInstance.getCustomBlock('docs').content)

    return {
        path: `${parentPath + componentName}.html`,
        content: preview
    }
}

module.exports = finalContext => {
    const ctx = finalContext.componentsPathContext
    const { componentsDir } = finalContext.options
    const componentsPages = []
    const prefix = finalContext.options.sideBarName

    Object.keys(ctx).forEach(k => {
        if (k === 'children') {
            ctx[k].forEach(componentRelativePath => {
                componentsPages.push(
                    buildComponentPage(
                        `${componentsDir}/${componentRelativePath}`,
                        `/${prefix}/`
                    ),
                )
            })
        } else {
            ctx[k].children.forEach(componentRelativePath => {
                componentsPages.push(
                    buildComponentPage(
                        `${componentsDir}/${k}/${componentRelativePath}`,
                        `/${prefix}/${k}/`
                    ),
                )
            })
        }
    })

    return [buildIndexPageComponent(finalContext), ...componentsPages]
}
