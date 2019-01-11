import { IComponentContext } from '../../types'

const buildSidebar = ({
  componentContextMap,
}: {
  componentContextMap: Map<string, IComponentContext[]>
}) => {
  const sidebar: string[] = []
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
  const sidebar = [
    {
      title: 'Components',
      collapsable: false,
      children: buildSidebar({ componentContextMap }),
    },
  ]

  console.log(sidebar)

  return {
    name: 'docgen-enhancer',
    content: `
      export default ({ siteData }) => {
        let sidebar = ${JSON.stringify(sidebar)}
        console.log(sidebar);
        sidebar = [siteData.themeConfig.sidebar, ...sidebar]
        console.log(sidebar)
        
        siteData.themeConfig.sidebar =  sidebar
      }
    `,
  }
}
