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
  const multiple = {
    title: 'Components',
    collapsable: false,
    children: buildSidebar({ componentContextMap }),
  }

  const groups = {
    title: '/components/',
    collapsable: false,
    children: [],
  }

  componentContextMap.forEach((_, ind) =>
    groups.children.push(ind.substring(1)),
  )

  return {
    name: 'docgen-enhancer',
    content: `
      export default ({ siteData }) => {
        let groups = ${JSON.stringify(groups)};
        let multiple = ${JSON.stringify(multiple)};
        if (!siteData.themeConfig.sidebar) return;
        if (!siteData.themeConfig.sidebar.map) {
          siteData.themeConfig.sidebar[groups.title] = groups.children        
        } else {
          let found = false;
          let sidebar = siteData.themeConfig.sidebar.map((e, i) => {
            if (e.title && e.title == multiple.title) {
              found = true;
              return multiple
            } 
            else return e
          })
          sidebar.push(multiple);
          siteData.themeConfig.sidebar =  sidebar
        }

        console.log(siteData.themeConfig.sidebar);
      }
    `,
  }
}
