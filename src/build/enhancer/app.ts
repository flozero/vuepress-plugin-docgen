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
  title,
}: {
  componentContextMap: Map<string, IComponentContext[]>
  title: string
}) => {
  const Components = {
    title,
    collapsable: false,
    children: buildSidebar({ componentContextMap }),
  }

  return {
    name: 'docgen-enhancer',
    content: `
      export default ({ siteData }) => {
        let Components = ${JSON.stringify(Components)}

        if (!siteData.themeConfig.sidebar.map) return;

        let sidebar = siteData.themeConfig.sidebar.map((e, i) => {
          if (e.title && e.title == Components.title) return Components
          else return e
        })

        siteData.themeConfig.sidebar =  sidebar
      }
    `,
  }
}
