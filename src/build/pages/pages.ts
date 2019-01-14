import { IDirContext, IComponentContext, IVuePressPage } from '../../types'
import { buildIndexPageMarkdown } from './index-page-builder'
import { default as buildDocsPage } from './docs'

export const buildIndexPage = ({
  dirContext,
  componentContextMap,
}: {
  dirContext: IDirContext
  componentContextMap: Map<string, IComponentContext[]>
}): IVuePressPage => {
  const content = buildIndexPageMarkdown({
    componentContextMap,
  })

  return {
    path: `/${dirContext.prefix}/`,
    content,
  }
}

const buildComponentPages = ({
  componentContextMap,
}: {
  componentContextMap: Map<string, IComponentContext[]>
}) => {
  let pages: IVuePressPage[] = []
  for (const componentContexts of componentContextMap.values()) {
    const componentPages = componentContexts.map(context => {
      return buildDocsPage({ context })
    })
    pages = pages.concat(componentPages)
  }
  return pages
}

export default ({
  dirContext,
  componentContextMap,
}: {
  dirContext: IDirContext
  componentContextMap: Map<string, IComponentContext[]>
}): IVuePressPage[] => {
  // receive an array of componentContextMap that have all informations about the component
  return [
    buildIndexPage({ dirContext, componentContextMap }),
    ...buildComponentPages({ componentContextMap }),
  ]
}
