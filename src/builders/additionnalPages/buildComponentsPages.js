const fs = require('fs')
const VueParser = require('../../parser/vue')

const { getFileNameFromAbsolutePath } = require('../../extractors/pathReader')
const { dropVueExtension } = require('../../extractors/name')
const { buildComponent, buildIndexPageComponents } = require('./compileTemplates')

const buildComponentPage = (absolutePath, parentPath, finalContext) => {
    const ComponentToStr = fs.readFileSync(absolutePath, { encoding: 'utf-8' })
    const componentName = dropVueExtension(getFileNameFromAbsolutePath(absolutePath))

    const ComponentInstance = new VueParser({
        source: ComponentToStr,
        fileName: componentName,
    })

    const preview = buildComponent(
        absolutePath,
        ComponentInstance.getCustomBlock('docs').content,
        finalContext,
    )

    return {
        title: preview.title,
        content: preview.content,
        path: `${parentPath + componentName}.html`,
    }
}

module.exports = finalContext => {
    const ctx = finalContext.componentsPathContext
    const { componentsDir } = finalContext.options
    const prefix = finalContext.options.sideBarName

    const componentsPages = Object.keys(ctx).reduce((acc, k) => {
        if (k === 'children') {
            ctx[k].forEach(componentRelativePath => {
                acc.push(
                    buildComponentPage(
                        `${componentsDir}/${componentRelativePath}`,
                        `/${prefix}/`,
                        finalContext,
                    ),
                )
            })
        } else {
            ctx[k].children.forEach(componentRelativePath => {
                acc.push(
                    buildComponentPage(
                        `${componentsDir}/${k}/${componentRelativePath}`,
                        `/${prefix}/${k}/`,
                        finalContext,
                    ),
                )
            })
        }
        return acc
    }, [])

    return [buildIndexPageComponents(finalContext), ...componentsPages]
}
