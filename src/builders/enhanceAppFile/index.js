/* eslint-disable */
const logger = require("../../utils/logger");

module.exports = (finalContext) => {
  let rootChildren = finalContext.componentsPathContext.children || []
  let sidebar = []

  let rootSidebar = {
    title: 'Globals',
    collapsable: false,
    children: []
  }
  rootChildren.forEach(c => {
    rootSidebar.children.push(c.split('.')[0])
  })

  let subDir = []

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
        tmp.children.push(k + '/' + lastName.split('.')[0])
      });
      subDir.push(tmp);
    }
  }

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
        let sidebarPageName = '${finalContext.options.sideBarName}'
        let subDir = ${JSON.stringify(subDir)}

        siteData.themeConfig.sidebar[sidebarPageName] = [
          {...rootSidebar},
          ...subDir
        ]
      }
    `,
  }
}
