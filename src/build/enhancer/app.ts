import { IComponentContext } from '../../types'

const buildSidebar = ({
  componentContextMap,
}: {
  componentContextMap: Map<string, IComponentContext[]>
}) => {
  const sidebar: string[] = ['/']
  for (const componentContexts of componentContextMap.values()) {
    componentContexts.forEach(context => {
      sidebar.push(context.link)
    })
  }
  return sidebar
}

export default ({
  componentContextMap,
}: {
  componentContextMap: Map<string, IComponentContext[]>
}) => {
  const sidebar = buildSidebar({ componentContextMap })

  return {
    name: 'docgen-enhancer',
    content: `
      export default ({ siteData }) => {
        const sidebar = ${JSON.stringify(sidebar)}
        siteData.themeConfig.sidebar = sidebar
      }
    `,
  }
}
