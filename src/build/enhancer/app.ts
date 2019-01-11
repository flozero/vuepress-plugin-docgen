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

  const extractKey = []
  componentContextMap.forEach((_, ind) => {
    extractKey.push(ind.substring(1))
  })

  // console.log('===================> extractKey =================', extractKey)
  // console.log(
  // '===================> componentContextMap =================',
  // componentContextMap,
  // )

  return {
    name: 'docgen-enhancer',
    content: `
      export default ({ siteData }) => {
        let Components = ${JSON.stringify(Components)}
        let contextComponent = ${JSON.stringify(extractKey)}

        // console.log("context==========================", contextComponent);

        if (!siteData.themeConfig.sidebar.map) {
          for (let key in siteData.themeConfig.sidebar) {
            if (key == Components.title) siteData.themeConfig.sidebar[Components.title] = contextComponent
          }        
        } else {
          let sidebar = siteData.themeConfig.sidebar.map((e, i) => {
            if (e.title && e.title == Components.title) return Components
            else return e
          })
          siteData.themeConfig.sidebar =  sidebar
        }
        // console.log(siteData.themeConfig.sidebar);
          
      }
    `,
  }
}
