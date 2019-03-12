/* eslint-disable */
const { dropVueExtension } = require("../../extractors/name")
const logger = require("../../utils/logger");

module.exports = (finalContext) => {
  let rootChildren = finalContext.componentsPathContext.children

  let rootSidebar = {
    title: finalContext.options.globalName,
    collapsable: false,
    children: []
  }
  rootChildren.forEach(c => {
    rootSidebar.children.push(dropVueExtension(c))
  })

  let subSideBar = []

  for (let k in finalContext.componentsPathContext) {
    if (k !== 'children') {
      let tmp = {
        title: k,
        collapsable: false,
        children: []
      }
      finalContext.componentsPathContext[k].children.forEach(c => {
        let lastName = c.split('/')
        lastName = lastName[lastName.length - 1]
        tmp.children.push(k + '/' + dropVueExtension(lastName))
      });
      subSideBar.push(tmp);
    }
  }

  logger.log("[RootSidebar]", rootSidebar)
  logger.log("[SubSideBar]", subSideBar)

  return {
    name: 'docgen-enhancer',
    content: `
      export default ({
        Vue, // the version of Vue being used in the VuePress app
        options, // the options for the root Vue instance
        router, // the router instance for the app
        siteData // site metadata
      }) => {
        let rootSidebar = ${JSON.stringify(rootSidebar)};
        let subSideBar = ${JSON.stringify(subSideBar)}

        let sidebarPageName = '/${finalContext.options.sideBarName}/'

        if (!siteData.themeConfig['sidebar']) siteData.themeConfig['sidebar'] = {}
        siteData.themeConfig.sidebar[sidebarPageName] = [
          {...rootSidebar},
          ...subSideBar
        ]
      }
    `,
  }
}
