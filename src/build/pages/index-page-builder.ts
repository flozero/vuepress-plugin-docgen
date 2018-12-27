import { IComponentContext } from '../../types'

const buildComponentsMarkdown = (componentContexts: IComponentContext[]) => {
  return componentContexts
    .map(context => {
      return context.existDocs
        ? `  - [${context.name}](${context.link})`
        : `  - ${context.name}`
    })
    .join('\n')
}

export const buildIndexPageMarkdown = ({
  componentContextMap,
}: {
  componentContextMap: Map<string, IComponentContext[]>
}) => {
  let markdown = '# Components\n'
  for (const [dirName, componentContexts] of componentContextMap.entries()) {
    const componentsListMarkdown = buildComponentsMarkdown(componentContexts)
    markdown += `- ${dirName}\n${componentsListMarkdown}\n`
  }
  return markdown
}
