module.exports = () => {
    // let groups = ${JSON.stringify(groups)};
    //         let multiple = ${JSON.stringify(multiple)};
    //         if (!siteData.themeConfig.sidebar) return;
    //         if (!siteData.themeConfig.sidebar.map) {
    //           siteData.themeConfig.sidebar[groups.title] = groups.children        
    //         } else {
    //           let found = false;
    //           let sidebar = siteData.themeConfig.sidebar.map((e, i) => {
    //             if (e.title && e.title == multiple.title) {
    //               found = true;
    //               return multiple
    //             } 
    //             else return e
    //           })
    //           sidebar.push(multiple);
    //           siteData.themeConfig.sidebar =  sidebar
    //         }

    // [
    //     {
    //         title: '',
    //         collapsable: false,
    //         children: [
    //             '',
    //             'started'
    //         ]
    //     },
    //     {
    //         title: 'one',
    //         collapsable: false,
    //         children: [
    //             // ['/bar/', 'one'],
    //             'bar/',
    //             // '/bar/two.md'
    //         ]
    //     },
    //     {
    //         title: 'bar title',
    //         collapsable: false,
    //         children: [
    //             ['foo/', 'three'],
    //             // '/foo/three',
    //             // '/foo/four'
    //         ]
    //     }
    // ]
    // siteData.themeConfig.sidebar['/guide/'] = []

    return {
        name: 'docgen-enhancer',
        content: `
          export default ({
            Vue, // the version of Vue being used in the VuePress app
            options, // the options for the root Vue instance
            router, // the router instance for the app
            siteData // site metadata
          }) => {
          }
        `,
      }
}