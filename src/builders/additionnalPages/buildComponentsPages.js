const logger = require('../../utils/logger');
const path = require('path');
const { parse } = require('vue-docgen-api');
const { getCompiledTemplateWithHbs } = require("../handlebars")
const fs = require('fs');
const VueParser = require("../../parser/vue");

// TODO: add the possibility to let people add a custom template for the index
const buildIndexPageComponent = (sideBarName) => {
    return {
        path: sideBarName,
        content: '# Components'
    }
}

// TODO: refacto a faire ici beaucoup trop de trucs
const buildComponentPage = (absolutePath, parentPath) => {
    let preview = '';
    
    let componentInfo = parse(absolutePath);

    let handleBarCompilation = getCompiledTemplateWithHbs(componentInfo);

    let componentStringify = fs.readFileSync(absolutePath, { encoding: 'utf-8' })

    let componentName = absolutePath.split('/');

    componentName = componentName[componentName.length - 1].split('.')[0]

    let vueParser = new VueParser({ source: componentStringify, fileName: componentName })

    let docsBlock = vueParser.getCustomBlock('docs')

    if (docsBlock) {
        preview = 
        `## Code\n\n\`\`\`html\n${docsBlock.content.replace(/(\r\n|\n|\r)/gm, '')}\n\`\`\`\n\n## Preview\n${
            docsBlock.content
        }`
    }

    return {
        path: parentPath + componentName,
        content: handleBarCompilation += preview
    }
}

module.exports = (finalContext) => {

    let ctx = finalContext.componentsPathContext;
    let {rootDir} = finalContext.options
    let componentsPages = []

    // TODO: '/components/' ne doit pas etre en dur
    Object.keys(ctx).forEach(k => {
        if (k === "children") {
            ctx[k].forEach(componentRelativePath => {
                componentsPages.push(
                    buildComponentPage(rootDir + '/' + componentRelativePath, '/components/')
                )
            })
        } else {
            ctx[k].children.forEach(componentRelativePath => {
                componentsPages.push(
                    buildComponentPage(rootDir + '/' + k + '/' + componentRelativePath, '/components/' + k + '/')
                )
            })
        }
    })

    return [
        buildIndexPageComponent(finalContext.options.sideBarName),
        ...componentsPages
    ]
}